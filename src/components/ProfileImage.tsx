import profileImage from '@/assets/profile.png';

interface ProfileImageProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfileImage = ({ size = 'lg', className = '' }: ProfileImageProps) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-56 h-56',
    lg: 'w-72 h-72 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Outer glow ring */}
      <div className={`${sizeClasses[size]} rounded-full absolute inset-0 blur-xl bg-primary/30`} />
      
      {/* Main image container */}
      <div
        className={`${sizeClasses[size]} rounded-full border-[6px] border-primary relative overflow-hidden`}
        style={{ boxShadow: '0 0 60px hsl(252 100% 68% / 0.5), 0 0 100px hsl(252 100% 68% / 0.3)' }}
      >
        {/* Profile Image */}
        <img 
          src={profileImage} 
          alt="Akram Atiia" 
          className="w-full h-full object-cover object-top scale-110"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
