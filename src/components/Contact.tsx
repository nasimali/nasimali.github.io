import React, { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card.tsx';
import DynamicIcon, { type LucideIconName } from './DynamicIcon';
import { motion } from 'framer-motion';
import { getConfigData } from '../lib/fetchConfig.ts';
import type { SocialLink } from '../lib/types.ts';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const { contact } = getConfigData().textContent;
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const token = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();
      if (!token) {
        console.error('reCAPTCHA failed');
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }
      await emailjs.send(
        serviceID,
        templateID,
        { ...formData, 'g-recaptcha-response': token }, // optional
        { publicKey }
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-foreground">
            {contact.heading}
          </h2>
          <p className="text-lg text-muted-foreground">{contact.subheading}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <Card className="max-w-xl mx-auto shadow-xl border-border hover:border-primary/20 transition-colors">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{contact.formCardTitle}</CardTitle>
              <CardDescription>{contact.formCardDescription}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields using contact.labels and contact.placeholders */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    {contact.labels.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="block w-full px-3 py-2.5 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-background placeholder:text-muted-foreground/70"
                    placeholder={contact.placeholders.name}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    {contact.labels.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="block w-full px-3 py-2.5 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-background placeholder:text-muted-foreground/70"
                    placeholder={contact.placeholders.email}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    {contact.labels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="block w-full px-3 py-2.5 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-background placeholder:text-muted-foreground/70"
                    placeholder={contact.placeholders.message}
                    required
                  ></textarea>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    size="invisible"
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full justify-center shadow-md hover:shadow-lg group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      // Assuming 'Send' is a valid LucideIconName, if not, replace or ensure it's in your textContent.json if dynamic
                      <DynamicIcon
                        name={'Send' as LucideIconName}
                        className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                      />
                    )}
                    {isSubmitting ? contact.labels.submitting : contact.labels.submit}
                  </Button>
                </div>
                {submitStatus === 'success' && (
                  <p className="text-sm text-green-600 dark:text-green-400 text-center p-2 bg-green-500/10 rounded-md">
                    {contact.successMessage}
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-red-600 dark:text-red-400 text-center p-2 bg-red-500/10 rounded-md">
                    {contact.errorMessage}
                  </p>
                )}
              </form>
              <div className="mt-10 text-center">
                <p className="text-sm text-muted-foreground mb-4">{contact.socialPrompt}</p>
                <div className="flex justify-center space-x-6">
                  {contact.socialLinks.map((link: SocialLink) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
                      aria-label={link.label}
                    >
                      <DynamicIcon name={link.iconName as LucideIconName} className="h-7 w-7" />
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
