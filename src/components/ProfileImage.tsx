interface ProfileImageProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfileImage = ({ size = 'lg', className = '' }: ProfileImageProps) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-72 h-72 md:w-80 md:h-80',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Outer glow ring */}
      <div className={`${sizeClasses[size]} rounded-full animate-pulse-glow absolute inset-0`} />
      
      {/* Main image container */}
      <div
        className={`${sizeClasses[size]} rounded-full border-4 border-primary relative overflow-hidden glow-border`}
      >
        {/* Placeholder with gradient */}
        <div className="w-full h-full bg-gradient-to-br from-primary/30 via-card to-info/20 flex items-center justify-center">
          <span className="text-6xl md:text-7xl font-bold text-primary">A</span>
        </div>
        
        {/* Duotone overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-destructive/20 via-transparent to-info/20 mix-blend-overlay" />
      </div>
    </div>
  );
};

export default ProfileImage;
