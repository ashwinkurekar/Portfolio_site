/**
 * Authoritative Profile Image Configuration
 *
 * Permanent source for Ashwin Kurekar's profile photograph.
 * Exclusively sourced from Google Drive file:
 * https://drive.google.com/file/d/18OAyrwdU89yQxOsXWYeoP1ll_TtddF5-/view?usp=sharing
 * Google Drive File ID: 18OAyrwdU89yQxOsXWYeoP1ll_TtddF5-
 *
 * ABSOLUTELY ZERO GITHUB AVATAR REFERENCES.
 */
export const GOOGLE_DRIVE_FILE_ID = '18OAyrwdU89yQxOsXWYeoP1ll_TtddF5-';

// Working Google Drive direct image URL
export const GOOGLE_DRIVE_DIRECT_URL = `https://drive.google.com/uc?export=view&id=${GOOGLE_DRIVE_FILE_ID}`;

// Primary profile image source: permanent local static asset of this exact Google Drive photo
export const PROFILE_IMAGE_URL = '/images/profile-photo.jpg';

// Alternate redundant endpoints for this exact Google Drive photo
export const PROFILE_IMAGE_FALLBACKS = [
  '/profile-photo.jpg',
  `https://drive.google.com/thumbnail?id=${GOOGLE_DRIVE_FILE_ID}&sz=w1200`,
  `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_FILE_ID}`,
  GOOGLE_DRIVE_DIRECT_URL,
];
