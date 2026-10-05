import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { siteConfig } from '../../config/site';
import { EMAILJS_CONFIG, isEmailJsConfigured, getEmailJsConfig } from '../../config/emailjs';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPaperPlane,
  FaCheck,
  FaExclamation,
  FaSpinner,
  FaArrowRotateLeft,
} from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from '../UI/MagneticButton';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const formRef = useRef<HTMLFormElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const lastSubmitRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic final reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      tl.from('.contact-heading-text', {
        y: 45,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
      })
        .from(
          '.contact-action-channel',
          {
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .from(
          formCardRef.current,
          {
            y: 40,
            opacity: 0,
            scale: 0.96,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.6'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      errs.name = 'Please provide your name.';
    } else if (trimmedName.length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!trimmedEmail) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!trimmedMessage) {
      errs.message = 'Please write your message.';
    } else if (trimmedMessage.length < 5) {
      errs.message = 'Message must be at least 5 characters.';
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Spam & Bot Protection: Hidden honeypot field
    if (honeypot.trim() !== '') {
      return; // Silently ignore automated submissions
    }

    // 2. Rapid double-click protection: enforce minimum cooldown
    const now = Date.now();
    if (now - lastSubmitRef.current < 2500) {
      return;
    }

    // 3. Validation
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('sending');
    lastSubmitRef.current = now;

    try {
      const currentConfig = getEmailJsConfig();

      // Guard: If credentials are placeholders, prevent broken API dispatch
      if (!isEmailJsConfigured()) {
        setStatus('error');
        setStatusMessage(
          'EmailJS is not configured yet with your account credentials. Please provide your Service ID, Template ID, and Public Key to enable live email delivery to ashwinkurekar07@gmail.com.'
        );
        return;
      }

      const templateParams = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        time: currentFormattedTime,
      };

      let isDelivered = false;

      // Primary Attempt: Official EmailJS Browser SDK send
      try {
        emailjs.init(currentConfig.publicKey);
        const sdkRes = await emailjs.send(
          currentConfig.serviceId,
          currentConfig.templateId,
          templateParams,
          currentConfig.publicKey
        );
        if (sdkRes && (sdkRes.status === 200 || sdkRes.text === 'OK')) {
          isDelivered = true;
        }
      } catch (browserSdkErr) {
        console.warn(
          '[EmailJS browser SDK attempt failed, attempting secure proxy backup]',
          browserSdkErr
        );
      }

      // Secondary Attempt: If browser blocked direct API call (e.g. ad blockers / CORS), use local backend proxy
      if (!isDelivered) {
        try {
          const proxyRes = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(templateParams),
          });

          if (proxyRes.ok) {
            isDelivered = true;
          } else {
            const errBody = await proxyRes.json().catch(() => ({}));
            console.warn('[Proxy dispatch status]', proxyRes.status, errBody);
          }
        } catch (proxyErr) {
          console.warn('[EmailJS proxy attempt failed]', proxyErr);
        }
      }

      if (isDelivered) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Email delivery could not be confirmed');
      }
    } catch (err: unknown) {
      console.warn('[EmailJS transmission notification]', err);
      setStatus('error');
      setStatusMessage(
        'Something went wrong while sending your message. Please try again or contact me directly by email.'
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    // Reset error state on edit after a failure
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const currentFormattedTime = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 sm:py-32 relative border-t border-zinc-800/60 overflow-hidden"
    >
      {/* Background cinematic glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Action & Alternative Channels */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div className="contact-heading-text">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2 block">
                07. Inquiries & Collaboration
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.1]">
                Let's Build <br />
                Something
              </h2>
            </div>

            <p className="contact-heading-text text-base sm:text-lg text-zinc-300 leading-relaxed text-balance">
              "Have an idea, internship opportunity, project or collaboration in mind? Let's connect."
            </p>

            {/* Quick Action Channels (Includes Direct Email Me Button) */}
            <div className="pt-4 flex flex-col gap-3">
              {/* Separate Direct Email Button */}
              <div className="contact-action-channel">
                <MagneticButton strength={0.2} className="w-full">
                  <a
                    href={`mailto:${siteConfig.email}?subject=Contact%20from%20Ashwin%20Kurekar%27s%20Portfolio`}
                    aria-label={`Email Ashwin Kurekar directly at ${siteConfig.email}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-cyan-500/40 transition-all group w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                        <FaEnvelope className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                          Email Me Directly
                        </div>
                        <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {siteConfig.email}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500 group-hover:text-cyan-400 font-mono">↗</span>
                  </a>
                </MagneticButton>
              </div>

              {/* LinkedIn Channel */}
              <div className="contact-action-channel">
                <MagneticButton strength={0.2} className="w-full">
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visit Ashwin Kurekar's LinkedIn"
                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-cyan-500/40 transition-all group w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                        <FaLinkedin className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                          LinkedIn
                        </div>
                        <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          Connect Professionally
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500 group-hover:text-cyan-400 font-mono">↗</span>
                  </a>
                </MagneticButton>
              </div>

              {/* GitHub Channel */}
              <div className="contact-action-channel">
                <MagneticButton strength={0.2} className="w-full">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-cyan-500/40 transition-all group w-full"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-200 group-hover:bg-zinc-700 transition-colors">
                        <FaGithub className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                          GitHub
                        </div>
                        <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          Explore Open Repositories
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500 group-hover:text-cyan-400 font-mono">↗</span>
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: EmailJS Contact Form */}
          <div className="lg:col-span-7">
            <div
              ref={formCardRef}
              className="p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-2xl backdrop-blur-sm"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6">
                Send a Message
              </h3>

              {/* Success Alert Banner: ONLY shown on verified EmailJS confirmation */}
              {status === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 space-y-2 animate-in fade-in duration-300"
                >
                  <div className="flex items-center gap-2.5 text-cyan-300 font-semibold text-sm">
                    <FaCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>MESSAGE SENT SUCCESSFULLY</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-6.5">
                    ✓ Message sent successfully. Thanks for reaching out — I'll get back to you soon.
                  </p>
                </div>
              )}

              {/* Error Alert Banner: Shown if EmailJS fails */}
              {status === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 p-5 rounded-2xl bg-rose-950/40 border border-rose-500/50 space-y-2 animate-in fade-in duration-300"
                >
                  <div className="flex items-center gap-2.5 text-rose-300 font-semibold text-sm">
                    <FaExclamation className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>MESSAGE COULD NOT BE SENT</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-6.5">
                    {statusMessage ||
                      'Something went wrong while sending your message. Please try again or contact me directly by email.'}
                  </p>
                  {!isEmailJsConfigured() && (
                    <p className="text-[11px] text-amber-300/90 font-mono pl-6.5 pt-1">
                      Setup Note: EmailJS environment variables (<code className="text-amber-200">VITE_EMAILJS_SERVICE_ID</code>, <code className="text-amber-200">VITE_EMAILJS_TEMPLATE_ID</code>, <code className="text-amber-200">VITE_EMAILJS_PUBLIC_KEY</code>) must be configured with your EmailJS credentials.
                    </p>
                  )}
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* Honeypot Spam Protection (hidden from humans) */}
                <input
                  type="text"
                  name="_honey_trap"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Hidden time variable for EmailJS template {{time}} */}
                <input
                  type="hidden"
                  name="time"
                  value={currentFormattedTime}
                />

                {/* Name field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    readOnly={status === 'sending'}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-all ${
                      errors.name
                        ? 'border-rose-500/70 focus:ring-1 focus:ring-rose-500'
                        : 'border-zinc-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                      <FaExclamation className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={status === 'sending'}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-all ${
                      errors.email
                        ? 'border-rose-500/70 focus:ring-1 focus:ring-rose-500'
                        : 'border-zinc-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                      <FaExclamation className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    readOnly={status === 'sending'}
                    placeholder="Tell me about your project, role, or proposal..."
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-all resize-none ${
                      errors.message
                        ? 'border-rose-500/70 focus:ring-1 focus:ring-rose-500'
                        : 'border-zinc-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                      <FaExclamation className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button with explicit states: SEND MESSAGE / SENDING... / ✓ MESSAGE SENT / TRY AGAIN */}
                <MagneticButton strength={status === 'sending' ? 0 : 0.15} className="w-full">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full py-4 px-6 rounded-xl text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      status === 'sending'
                        ? 'bg-cyan-500/70 cursor-not-allowed opacity-80'
                        : status === 'success'
                        ? 'bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                        : status === 'error'
                        ? 'bg-amber-400 hover:bg-amber-300'
                        : 'bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] active:scale-[0.99]'
                    }`}
                  >
                    {status === 'sending' && (
                      <>
                        <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                        <span>SENDING...</span>
                      </>
                    )}
                    {status === 'success' && (
                      <>
                        <FaCheck className="w-3.5 h-3.5" />
                        <span>✓ MESSAGE SENT</span>
                      </>
                    )}
                    {status === 'error' && (
                      <>
                        <FaArrowRotateLeft className="w-3.5 h-3.5" />
                        <span>TRY AGAIN</span>
                      </>
                    )}
                    {status === 'idle' && (
                      <>
                        <FaPaperPlane className="w-3.5 h-3.5" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
