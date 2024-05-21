import React from 'react';

interface ButtonProps {
  className?: string;
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ className, text, onClick }) => {
  return (
    <button
      className={`${className} rounded-2xl font-medium border border-slate-400 px-4 py-3 cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
