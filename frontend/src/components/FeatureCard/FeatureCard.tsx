import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div data-testid="feature-card" className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;