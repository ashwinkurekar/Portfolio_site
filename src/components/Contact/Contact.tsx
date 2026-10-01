import React, { useState, useRef, useEffect } from 'react';
import { siteConfig } from '../../config/site';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCheck, FaExclamation, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from '../UI/MagneticButton';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [preparedMailto, setPreparedMailto] = useState<string>('');

  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);
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
      .from('.contact-action-channel', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.4')
      .from(formCardRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please write your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Prepare mailto link with encoded subject and body
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Ashwin,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setPreparedMailto(mailtoUrl);
    }, 600);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

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
          {/* Left Column: Information & Direct Action Buttons */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div className="contact-heading-text">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-2 block">
                08. Inquiries & Collaboration
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.1]">
                Let's Build <br />
                Something
              </h2>
            </div>

            <p className="contact-heading-text text-base sm:text-lg text-zinc-300 leading-relaxed text-balance">
              "Have an idea, internship opportunity, project or collaboration in mind? Let's connect."
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-4 flex flex-col gap-3">
              <div className="contact-action-channel">
                <MagneticButton strength={0.2} className="w-full">
                  <a
                    href={siteConfig.links.email}
                    aria-label="Email Ashwin Kurekar"
                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-cyan-500/40 transition-all group w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                        <FaEnvelope className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Email Me</div>
                        <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {siteConfig.email}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500 group-hover:text-cyan-400 font-mono">↗</span>
                  </a>
                </MagneticButton>
              </div>

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
                        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">LinkedIn</div>
                        <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          Connect Professionally
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500 group-hover:text-cyan-400 font-mono">↗</span>
                  </a>
                </MagneticButton>
              </div>

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
                        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">GitHub</div>
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

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div
              ref={formCardRef}
              className="p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-2xl"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6">
                Send a Message
              </h3>

              {isSuccess && (
                <div className="mb-6 p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-start gap-3 text-cyan-300 text-sm">
                    <FaCheck className="w-4 h-4 shrink-0 text-cyan-400 mt-0.5" />
                    <span>
                      Thanks! Your message has been prepared. Please use the email button below to contact Ashwin directly.
                    </span>
                  </div>
                  {preparedMailto && (
                    <a
                      href={preparedMailto}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Open Mail Client Now (Pre-filled)</span>
                      <FaArrowUpRightFromSquare className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name field */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
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

                {/* Submit button */}
                <MagneticButton strength={0.15} className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    <FaPaperPlane className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
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
