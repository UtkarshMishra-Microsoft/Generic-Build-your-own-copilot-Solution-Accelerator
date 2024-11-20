import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeatureCard from './FeatureCard';

describe('FeatureCard', () => {
  it('renders correctly with the provided props', () => {
    const { getByText } = render(<FeatureCard title="Test Card" description="Test Description" />);
    expect(getByText('Test Card')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });

  it('applies correct CSS classes for styles', () => {
    const { getByTestId } = render(<FeatureCard title="Test Card" description="Test Description" />);
    const card = getByTestId('feature-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card');
  });

  it('handles missing optional props gracefully', () => {
    const { getByTestId } = render(<FeatureCard title="Test Card" description="" />);
    const card = getByTestId('feature-card');
    expect(card).toBeInTheDocument();
  });
});