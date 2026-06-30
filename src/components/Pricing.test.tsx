import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Pricing } from './Pricing';

afterEach(cleanup);

describe('Pricing', () => {
  it('renders both plans with their prices', () => {
    render(<Pricing onSelectPlan={() => {}} />);
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Pro Release')).toBeInTheDocument();
    expect(screen.getByText('$49')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });

  it('calls onSelectPlan with the chosen tier', () => {
    const onSelectPlan = vi.fn();
    render(<Pricing onSelectPlan={onSelectPlan} />);

    fireEvent.click(screen.getByRole('button', { name: /choose personal/i }));
    expect(onSelectPlan).toHaveBeenCalledWith('standard');

    fireEvent.click(screen.getByRole('button', { name: /choose pro release/i }));
    expect(onSelectPlan).toHaveBeenCalledWith('premium');
  });
});
