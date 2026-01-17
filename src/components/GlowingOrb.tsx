interface GlowingOrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent';
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

const GlowingOrb: React.FC<GlowingOrbProps> = ({
  className = '',
  size = 'md',
  color = 'primary',
  position = {},
}) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
  };

  const colorClasses = {
    primary: 'bg-primary/30',
    secondary: 'bg-secondary/30',
    accent: 'bg-chart-1/30',
  };

  return (
    <div
      className={`absolute rounded-full blur-3xl animate-pulse-glow pointer-events-none ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      style={position}
    />
  );
};

export default GlowingOrb;
