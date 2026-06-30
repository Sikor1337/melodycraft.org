import React from 'react';

interface SpotifyEmbedProps {
  /** Full Spotify embed URL, e.g. https://open.spotify.com/embed/track/<id>?theme=0 */
  src: string;
  title: string;
  /** compact = single-row player (152px); full = larger player (352px). */
  compact?: boolean;
}

/**
 * Renders a Spotify player inline so visitors can listen without leaving the page.
 * The src values are PLACEHOLDERS — swap them for the studio's own track/playlist
 * embed links (Spotify → Share → Copy link, then use /embed/ in the path).
 */
export const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ src, title, compact = true }) => {
  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      height={compact ? 152 : 352}
      loading="lazy"
      frameBorder={0}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}
    />
  );
};
