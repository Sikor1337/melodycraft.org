import React from 'react';

interface SpotifyEmbedProps {
  /** Full Spotify embed URL, e.g. https://open.spotify.com/embed/track/<id>?theme=0 */
  src: string;
  title: string;
  /** compact = single-row player (152px); full = larger player (352px). */
  compact?: boolean;
  /**
   * If set, clip the player to this pixel height inside an overflow-hidden box.
   * Used to hide Spotify's white logged-out "Preview" panel that renders below
   * the dark control row on single-track embeds. Keep it tall enough to show
   * the play controls (~88px works for a one-row player).
   */
  cropHeight?: number;
}

/**
 * Renders a Spotify player inline so visitors can listen without leaving the page.
 */
export const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ src, title, compact = true, cropHeight }) => {
  const iframe = (
    <iframe
      src={src}
      title={title}
      width="100%"
      height={cropHeight ? 152 : compact ? 152 : 352}
      loading="lazy"
      frameBorder={0}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      style={{
        display: 'block',
        borderRadius: cropHeight ? 0 : 14,
        border: cropHeight ? 0 : '1px solid rgba(255,255,255,0.08)',
      }}
    />
  );

  if (cropHeight) {
    return (
      <div
        style={{
          height: cropHeight,
          overflow: 'hidden',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {iframe}
      </div>
    );
  }

  return iframe;
};
