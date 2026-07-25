import DynamicIcon, { type LucideIconName } from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import TerminalWindow from '@/components/TerminalWindow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useConfigData } from '@/contexts/ConfigContext';
import type { SocialLink } from '@/lib/types';
import emailjs from '@emailjs/browser';
import * as m from 'framer-motion/m';
import { Loader2, SendHorizonal } from 'lucide-react';
import { useActionState, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ActionState {
  status: 'success' | 'error' | null;
  message?: string;
}

const Contact = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
  const isLocalHost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const shouldUseRecaptcha = Boolean(recaptchaSiteKey) && !isLocalHost;

  const {
    textContent: { contact },
  } = useConfigData();

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isContactInView, setIsContactInView] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsContactInView(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: '-18% 0px -18% 0px',
      }
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, []);

  const contactAction = async (
    _prevState: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are not fully configured.');
      return { status: 'error' };
    }

    try {
      let recaptchaToken: string | undefined;

      if (shouldUseRecaptcha) {
        const token = await recaptchaRef.current?.executeAsync();
        recaptchaRef.current?.reset();

        if (!token) {
          return { status: 'error' };
        }

        recaptchaToken = token;
      }

      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;

      await emailjs.send(
        serviceId,
        templateId,
        {
          name,
          email,
          message,
          ...(recaptchaToken ? { 'g-recaptcha-response': recaptchaToken } : {}),
        },
        { publicKey }
      );

      formRef.current?.reset();
      return { status: 'success' };
    } catch (error) {
      console.error('Unable to submit contact form:', error);
      return { status: 'error' };
    }
  };

  const [state, formAction, isPending] = useActionState(contactAction, { status: null });

  const fieldLabelClass = 'font-mono text-xs font-bold text-foreground';
  const flagClass = 'text-term-amber';

  return (
    <>
      <section ref={sectionRef} id="contact" className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="./send-message --to=nasim"
            heading={contact.heading}
            subheading={contact.subheading}
          />

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <TerminalWindow title="mail — compose" contentClassName="space-y-1">
                <div className="mb-4 space-y-1">
                  <p className="font-mono text-sm font-bold text-foreground">
                    {contact.formCardTitle}
                  </p>
                  <p className="code-comment text-xs">{contact.formCardDescription}</p>
                </div>

                <form ref={formRef} action={formAction} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className={fieldLabelClass}>
                      <span className={flagClass}>--name</span> {contact.labels.name}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder={contact.placeholders.name}
                      required
                      className="rounded-md font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className={fieldLabelClass}>
                      <span className={flagClass}>--email</span> {contact.labels.email}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder={contact.placeholders.email}
                      required
                      className="rounded-md font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className={fieldLabelClass}>
                      <span className={flagClass}>--message</span> {contact.labels.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={contact.placeholders.message}
                      rows={6}
                      required
                      className="rounded-md font-mono text-sm"
                    />
                  </div>

                  <Button type="submit" className="w-full font-mono font-bold" disabled={isPending}>
                    {isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <SendHorizonal className="size-4" />
                    )}
                    {isPending ? contact.labels.submitting : `$ ${contact.labels.submit}`}
                  </Button>

                  {state.status === 'success' && (
                    <p className="rounded-md border border-term-green/40 bg-term-green/10 px-3 py-2 font-mono text-sm text-term-green">
                      ✓ exit 0 — {contact.successMessage}
                    </p>
                  )}
                  {state.status === 'error' && (
                    <p className="rounded-md border border-term-red/40 bg-term-red/10 px-3 py-2 font-mono text-sm text-term-red">
                      ✗ exit 1 — {contact.errorMessage}
                    </p>
                  )}
                </form>
              </TerminalWindow>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
              className="space-y-5"
            >
              <TerminalWindow title="ssh — known hosts" contentClassName="space-y-4">
                <div className="space-y-1">
                  <p className="font-mono text-sm font-bold text-foreground">
                    {contact.socialPrompt}
                  </p>
                  <p className="code-comment text-xs">{contact.hostName}</p>
                </div>

                <div className="space-y-2.5">
                  {contact.socialLinks.map((link: SocialLink) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center justify-between rounded-md border bg-background/60 px-4 py-3 transition-all hover:border-primary hover:bg-accent/50"
                      aria-label={link.label}
                    >
                      <span className="flex items-center gap-2.5 font-mono text-sm font-medium text-foreground">
                        <DynamicIcon
                          name={link.iconName as LucideIconName}
                          className="size-4 text-primary"
                        />
                        ssh {link.label.toLowerCase()}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                  ))}
                </div>

                <p className="cursor-block border-t border-dashed pt-4 font-mono text-xs text-muted-foreground">
                  connection ready
                </p>
              </TerminalWindow>
            </m.div>
          </div>
        </div>
      </section>

      {shouldUseRecaptcha && recaptchaSiteKey && isContactInView && (
        <div className="fixed right-4 bottom-4 z-70">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recaptchaSiteKey}
            size="invisible"
            badge="inline"
          />
        </div>
      )}
    </>
  );
};

export default Contact;
