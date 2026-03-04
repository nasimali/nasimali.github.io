import DynamicIcon, { type LucideIconName } from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  return (
    <>
      <section ref={sectionRef} id="contact" className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Connect"
            heading={contact.heading}
            subheading={contact.subheading}
            align="center"
          />

          <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Card className="glass-panel border-border/70 py-0">
                <CardHeader className="space-y-2 border-b border-border/65 pb-5 pt-6">
                  <CardTitle className="font-display text-2xl tracking-tight">
                    {contact.formCardTitle}
                  </CardTitle>
                  <CardDescription>{contact.formCardDescription}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-6">
                  <form ref={formRef} action={formAction} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        {contact.labels.name}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder={contact.placeholders.name}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        {contact.labels.email}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder={contact.placeholders.email}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        {contact.labels.message}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={contact.placeholders.message}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full rounded-full" disabled={isPending}>
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <SendHorizonal className="h-4 w-4" />
                      )}
                      {isPending ? contact.labels.submitting : contact.labels.submit}
                    </Button>

                    {state.status === 'success' && (
                      <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
                        {contact.successMessage}
                      </p>
                    )}
                    {state.status === 'error' && (
                      <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
                        {contact.errorMessage}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
              className="space-y-5"
            >
              <Card className="glass-panel border-border/70 py-0">
                <CardHeader className="border-b border-border/65 pb-4 pt-6">
                  <CardTitle className="font-display text-2xl tracking-tight">
                    {contact.socialPrompt}
                  </CardTitle>
                  <CardDescription>{contact.hostName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-5 pb-6">
                  {contact.socialLinks.map((link: SocialLink) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-border/60 bg-background/65 px-4 py-3 transition-all hover:border-primary/40 hover:bg-background"
                      aria-label={link.label}
                    >
                      <span className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                        <DynamicIcon
                          name={link.iconName as LucideIconName}
                          className="h-4 w-4 text-primary"
                        />
                        {link.label}
                      </span>
                      <span className="text-xs text-muted-foreground">Open</span>
                    </a>
                  ))}
                </CardContent>
              </Card>
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
