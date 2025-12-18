import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BackButtonProps {
  to?: string;
  label?: string;
}

const BackButton = ({ to, label = 'رجوع' }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
    >
      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
