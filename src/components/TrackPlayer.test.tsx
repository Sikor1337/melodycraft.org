import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TrackPlayer, Track } from './TrackPlayer';

afterEach(cleanup);

const track: Track = {
  title: 'Test Song',
  subtitle: 'Test Artist · Pop',
  cover: 'https://i.scdn.co/image/cover',
  preview: 'https://p.scdn.co/mp3-preview/abc',
  href: 'https://open.spotify.com/track/abc123',
};

describe('TrackPlayer', () => {
  it('renders the title, subtitle and a play control', () => {
    render(<TrackPlayer track={track} />);
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist · Pop')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play preview of test song/i })).toBeInTheDocument();
  });

  it('links to the full track on Spotify (card variant)', () => {
    render(<TrackPlayer track={track} />);
    expect(screen.getByRole('link', { name: /spotify/i })).toHaveAttribute('href', track.href);
  });

  it('exposes a seek slider labelled for the track', () => {
    render(<TrackPlayer track={track} />);
    expect(screen.getByRole('slider', { name: /seek test song/i })).toBeInTheDocument();
  });

  it('loads the preview audio source', () => {
    const { container } = render(<TrackPlayer track={track} />);
    const audio = container.querySelector('audio');
    expect(audio).toHaveAttribute('src', track.preview);
    expect(audio).toHaveAttribute('preload', 'none');
  });
});
