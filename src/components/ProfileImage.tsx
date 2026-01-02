import profileImage from '@/assets/profile.png';

interface ProfileImageProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfileImage = ({ size = 'lg', className = '' }: ProfileImageProps) => {
  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-32 sm:h-32',
    md: 'w-40 h-40 sm:w-56 sm:h-56',
    lg: 'w-52 h-52 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]',
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
          alt="Mustafa Hussein Ahmed" 
          className="w-full h-full object-cover object-top scale-110"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
