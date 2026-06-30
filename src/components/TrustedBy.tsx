import React from 'react';

const PLATFORMS = ['Spotify', 'Apple Music', 'TikTok', 'YouTube', 'Amazon Music'];

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-14 hairline">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-neutral-600 mb-8">
          Ready to release on every major platform
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 md:gap-x-16">
          {PLATFORMS.map((p) => (
            <span key={p} className="text-lg font-semibold text-neutral-500">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
