import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Loader2, SendHorizonal } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import DynamicIcon, { type LucideIconName } from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getConfigData } from '@/lib/fetchConfig';
import type { SocialLink } from '@/lib/types';

interface FormData {
  name: string;
  email: string;
  message: string;
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
  } = getConfigData();

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
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

  const handleFieldUpdate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are not fully configured.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      let recaptchaToken: string | undefined;

      if (shouldUseRecaptcha) {
        const token = await recaptchaRef.current?.executeAsync();
        recaptchaRef.current?.reset();

        if (!token) {
          setSubmitStatus('error');
          setIsSubmitting(false);
          return;
        }

        recaptchaToken = token;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          ...formData,
          ...(recaptchaToken ? { 'g-recaptcha-response': recaptchaToken } : {}),
        },
        { publicKey }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Unable to submit contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Card className="glass-panel border-border/70 py-0">
                <CardHeader className="space-y-2 border-b border-border/65 pb-5 pt-6">
                  <CardTitle className="font-display text-2xl tracking-tight">
                    {contact.formCardTitle}
                  </CardTitle>
                  <CardDescription>{contact.formCardDescription}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        {contact.labels.name}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleFieldUpdate}
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
                        value={formData.email}
                        onChange={handleFieldUpdate}
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
                        value={formData.message}
                        onChange={handleFieldUpdate}
                        placeholder={contact.placeholders.message}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <SendHorizonal className="h-4 w-4" />
                      )}
                      {isSubmitting ? contact.labels.submitting : contact.labels.submit}
                    </Button>

                    {submitStatus === 'success' && (
                      <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
                        {contact.successMessage}
                      </p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-700 dark:text-rose-300">
                        {contact.errorMessage}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.07, ease: 'easeOut' }}
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
            </motion.div>
          </div>
        </div>
      </section>

      {shouldUseRecaptcha && recaptchaSiteKey && isContactInView && (
        <div className="fixed right-4 bottom-4 z-[70]">
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
