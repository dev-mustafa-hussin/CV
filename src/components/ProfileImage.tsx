import profileImage from '@/assets/profile.png';

interface ProfileImageProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfileImage = ({ size = 'lg', className = '' }: ProfileImageProps) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-56 h-56',
    lg: 'w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Outer glow ring */}
      <div className={`${sizeClasses[size]} rounded-full animate-pulse-glow absolute inset-0`} />
      
      {/* Main image container */}
      <div
        className={`${sizeClasses[size]} rounded-full border-4 border-primary relative overflow-hidden glow-border bg-card`}
      >
        {/* Profile Image */}
        <img 
          src={profileImage} 
          alt="Akram Atiia" 
          className="w-full h-full object-cover object-center scale-125"
        />
        
        {/* Duotone overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-info/5 mix-blend-overlay" />
      </div>
    </div>
  );
};

export default ProfileImage;
