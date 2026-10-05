/**
 * EmailJS Configuration for Ashwin Kurekar's Portfolio Contact Form
 *
 * Official browser SDK: @emailjs/browser
 * Configuration values are sourced with verified credentials:
 * - Service ID: service_fkck4ra
 * - Template ID: template_k614f9w
 * - Public Key: 70nk0hkqyVp60zqj4
 *
 * Target recipient: ashwinkurekar07@gmail.com
 */

export const getEmailJsConfig = () => {
  const rawServiceId =
    (typeof window !== 'undefined' && localStorage.getItem('EMAILJS_SERVICE_ID')) ||
    import.meta.env.VITE_EMAILJS_SERVICE_ID;

  // Protect against stale container env variable 'service_8t6znsm'
  const serviceId =
    rawServiceId &&
    rawServiceId !== 'service_8t6znsm' &&
    rawServiceId !== 'YOUR_SERVICE_ID'
      ? rawServiceId
      : 'service_fkck4ra';

  const rawTemplateId =
    (typeof window !== 'undefined' && localStorage.getItem('EMAILJS_TEMPLATE_ID')) ||
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  const templateId =
    rawTemplateId && rawTemplateId !== 'YOUR_TEMPLATE_ID'
      ? rawTemplateId
      : 'template_k614f9w';

  const rawPublicKey =
    (typeof window !== 'undefined' && localStorage.getItem('EMAILJS_PUBLIC_KEY')) ||
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const publicKey =
    rawPublicKey && rawPublicKey !== 'YOUR_PUBLIC_KEY'
      ? rawPublicKey
      : '70nk0hkqyVp60zqj4';

  return {
    serviceId,
    templateId,
    publicKey,
    targetEmail: 'ashwinkurekar07@gmail.com',
  };
};

export const EMAILJS_CONFIG = getEmailJsConfig();

/**
 * Validates whether real EmailJS public credentials have been supplied
 */
export const isEmailJsConfigured = (): boolean => {
  const config = getEmailJsConfig();
  return (
    Boolean(config.serviceId) &&
    config.serviceId !== 'YOUR_SERVICE_ID' &&
    Boolean(config.templateId) &&
    config.templateId !== 'YOUR_TEMPLATE_ID' &&
    Boolean(config.publicKey) &&
    config.publicKey !== 'YOUR_PUBLIC_KEY'
  );
};
