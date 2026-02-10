import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-serif font-bold text-stone-900">{title}</h2>
        {subtitle && <p className="text-stone-500 mt-2">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default SectionHeader;