import React from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { MagneticButton } from './MagneticButton';

export interface CertificateButtonProps {
  certificateUrl?: string | null;
  itemTitle?: string;
  className?: string;
}

export interface OfferLetterButtonProps {
  offerLetterUrl?: string | null;
  itemTitle?: string;
  className?: string;
}

/**
 * Validates whether the provided string is a valid non-empty external web or document link.
 * Strictly filters out empty strings, null, undefined, hash fragments, and invalid protocols.
 */
export function isValidDocumentUrl(url?: string | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (
    trimmed === '' ||
    trimmed === '#' ||
    trimmed === '/' ||
    trimmed.toLowerCase() === 'undefined' ||
    trimmed.toLowerCase() === 'null' ||
    trimmed.toLowerCase() === 'javascript:void(0)'
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Backwards-compatible alias
export const isValidCertificateUrl = isValidDocumentUrl;

/**
 * Certificate action button with animated hover, glow, external link indicator, and fallback text.
 */
export const CertificateButton: React.FC<CertificateButtonProps> = ({
  certificateUrl,
  itemTitle,
  className = '',
}) => {
  const hasUrl = Boolean(certificateUrl && certificateUrl.trim() !== '');
  const isValid = isValidDocumentUrl(certificateUrl);

  if (isValid && certificateUrl) {
    const trimmedUrl = certificateUrl.trim();
    return (
      <div
        className={`inline-flex items-center ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <MagneticButton strength={0.2}>
          <a
            href={trimmedUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={
              itemTitle
                ? `View certificate for ${itemTitle} in a new tab`
                : 'View Certificate in a new tab'
            }
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 cursor-pointer w-full sm:w-auto text-center"
          >
            <span>View Certificate</span>
            <FaArrowUpRightFromSquare className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </MagneticButton>
      </div>
    );
  }

  // If a URL was provided but is invalid
  if (hasUrl && !isValid) {
    return (
      <div
        className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 font-mono text-xs select-none w-full sm:w-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span>Certificate link currently unavailable</span>
      </div>
    );
  }

  // Default when no certificate URL is configured yet
  return (
    <div
      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-500 font-mono text-xs select-none w-full sm:w-auto ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <span>Certificate link coming soon</span>
    </div>
  );
};

/**
 * Offer Letter action button with animated hover, cyan glow, external link indicator, and fallback text.
 */
export const OfferLetterButton: React.FC<OfferLetterButtonProps> = ({
  offerLetterUrl,
  itemTitle,
  className = '',
}) => {
  const hasUrl = Boolean(offerLetterUrl && offerLetterUrl.trim() !== '');
  const isValid = isValidDocumentUrl(offerLetterUrl);

  if (isValid && offerLetterUrl) {
    const trimmedUrl = offerLetterUrl.trim();
    return (
      <div
        className={`inline-flex items-center ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <MagneticButton strength={0.2}>
          <a
            href={trimmedUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={
              itemTitle
                ? `View offer letter for ${itemTitle} in a new tab`
                : 'View Offer Letter in a new tab'
            }
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-cyan-200 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.45)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 cursor-pointer w-full sm:w-auto text-center"
          >
            <span>View Offer Letter</span>
            <FaArrowUpRightFromSquare className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </MagneticButton>
      </div>
    );
  }

  // If a URL was provided but is invalid
  if (hasUrl && !isValid) {
    return (
      <div
        className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 font-mono text-xs select-none w-full sm:w-auto ${className}`}
      >
        <span>Offer letter link currently unavailable</span>
      </div>
    );
  }

  // Default when no offer letter URL is configured yet
  return (
    <div
      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-500 font-mono text-xs select-none w-full sm:w-auto ${className}`}
    >
      <span>Offer letter link coming soon</span>
    </div>
  );
};
