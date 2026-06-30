import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { CheckoutModal } from './CheckoutModal';
import type { OrderItem } from '../types';

// Mock the Stripe config: standard has a Payment Link, the others don't.
vi.mock('../config', () => ({
  STRIPE_PAYMENT_LINKS: { standard: 'https://buy.stripe.com/test_abc123', premium: '', signature: '' },
  CONTACT_EMAIL: 'hello@melodycraft.org',
}));

afterEach(cleanup);

const baseOrder = {
  genre: 'Acoustic',
  occasion: 'Wedding',
  forWhom: 'Emma',
  story: 'Our first dance under the stars',
};

const item = (tier: 'standard' | 'premium'): OrderItem => ({
  tier,
  price: tier === 'premium' ? 99 : 49,
  order: baseOrder,
});

describe('CheckoutModal', () => {
  it('shows the Stripe pay button when a Payment Link is configured', () => {
    render(<CheckoutModal isOpen onClose={() => {}} item={item('standard')} />);
    expect(screen.getByRole('button', { name: /pay \$49 with stripe/i })).toBeInTheDocument();
  });

  it('falls back to an email order link (with the brief) when no link is set', () => {
    render(<CheckoutModal isOpen onClose={() => {}} item={item('premium')} />);
    const emailLink = screen.getByRole('link', { name: /email my order/i });
    expect(emailLink).toBeInTheDocument();
    const href = emailLink.getAttribute('href') ?? '';
    expect(href.startsWith('mailto:hello@melodycraft.org')).toBe(true);
    expect(decodeURIComponent(href)).toContain('Our first dance under the stars');
  });

  it('renders nothing when there is no item', () => {
    const { container } = render(<CheckoutModal isOpen onClose={() => {}} item={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
