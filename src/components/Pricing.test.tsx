import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Pricing } from './Pricing';

afterEach(cleanup);

describe('Pricing', () => {
  it('renders all three plans with their prices', () => {
    render(<Pricing onSelectPlan={() => {}} />);
    expect(screen.getByText('Just the Song')).toBeInTheDocument();
    expect(screen.getByText('Streaming for a Year')).toBeInTheDocument();
    expect(screen.getByText('Streaming for Life')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByText('$39.99')).toBeInTheDocument();
    expect(screen.getByText('$69.99')).toBeInTheDocument();
  });

  it('marks exactly one plan as "Most popular" (the middle streaming plan)', () => {
    render(<Pricing onSelectPlan={() => {}} />);
    expect(screen.getAllByText('Most popular')).toHaveLength(1);
  });

  it('calls onSelectPlan with the chosen tier', () => {
    const onSelectPlan = vi.fn();
    render(<Pricing onSelectPlan={onSelectPlan} />);

    fireEvent.click(screen.getByRole('button', { name: /choose just the song/i }));
    expect(onSelectPlan).toHaveBeenCalledWith('standard');

    fireEvent.click(screen.getByRole('button', { name: /choose streaming for a year/i }));
    expect(onSelectPlan).toHaveBeenCalledWith('premium');

    fireEvent.click(screen.getByRole('button', { name: /choose streaming for life/i }));
    expect(onSelectPlan).toHaveBeenCalledWith('signature');
  });
});
