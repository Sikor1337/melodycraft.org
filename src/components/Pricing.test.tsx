import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Pricing } from './Pricing';

afterEach(cleanup);

describe('Pricing', () => {
  it('renders all three plans with their prices', () => {
    render(<Pricing onSelectPlan={() => {}} />);
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Pro Release')).toBeInTheDocument();
    expect(screen.getByText('Signature')).toBeInTheDocument();
    expect(screen.getByText('$49')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('$199')).toBeInTheDocument();
  });

  it('marks exactly one plan as "Most popular" (the $99 anchor middle)', () => {
    render(<Pricing onSelectPlan={() => {}} />);
    expect(screen.getAllByText('Most popular')).toHaveLength(1);
  });

  it('calls onSelectPlan with the chosen tier', () => {
    const onSelectPlan = vi.fn();
    render(<Pricing onSelectPlan={onSelectPlan} />);

    fireEvent.click(screen.getByRole('button', { name: /choose personal/i }));
    expect(onSelectPlan).toHaveBeenCalledWith('standard');

    fireEvent.click(screen.getByRole('button', { name: /choose pro release/i }));
    expect(onSelectPlan).toHaveBeenCalledWith('premium');

    fireEvent.click(screen.getByRole('button', { name: /choose signature/i }));
    expect(onSelectPlan).toHaveBeenCalledWith('signature');
  });
});
