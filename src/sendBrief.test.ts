import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { SongOrder } from './types';

const order: SongOrder = {
  genre: 'Acoustic',
  occasion: 'Wedding',
  forWhom: 'Emma',
  story: 'Our first dance under the stars',
};

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllGlobals();
});

describe('sendBriefEmail', () => {
  it('posts the brief to Web3Forms with the order reference', async () => {
    vi.doMock('./config', () => ({ WEB3FORMS_ACCESS_KEY: 'wf_test_key' }));
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    const { sendBriefEmail } = await import('./sendBrief');
    sendBriefEmail(order, 'premium', 39.99, 'MC-TEST1');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(init.keepalive).toBe(true);
    const body = JSON.parse(init.body);
    expect(body.access_key).toBe('wf_test_key');
    expect(body.reference).toBe('MC-TEST1');
    expect(body.plan).toBe('Streaming for a Year ($39.99)');
    expect(body.story).toBe('Our first dance under the stars');
  });

  it('does nothing when no access key is configured', async () => {
    vi.doMock('./config', () => ({ WEB3FORMS_ACCESS_KEY: '' }));
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const { sendBriefEmail } = await import('./sendBrief');
    sendBriefEmail(order, 'standard', 9.99, 'MC-TEST2');

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('swallows network failures without throwing', async () => {
    vi.doMock('./config', () => ({ WEB3FORMS_ACCESS_KEY: 'wf_test_key' }));
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    const { sendBriefEmail } = await import('./sendBrief');
    expect(() => sendBriefEmail(order, 'standard', 9.99, 'MC-TEST3')).not.toThrow();
    // Let the rejected promise settle to prove the catch handles it.
    await Promise.resolve();
  });
});
