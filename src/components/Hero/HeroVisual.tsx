import React from 'react';
import { ProfileHeroPhoto } from './ProfileHeroPhoto';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center py-4">
      <ProfileHeroPhoto />
    </div>
  );
};

