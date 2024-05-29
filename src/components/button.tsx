import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={twMerge('bg-brand text-white outline-none hover:bg-brand-600 py-2 px-4 rounded-md active:bg-brand-700', props.className)}
    >
      {props.children}
    </button>
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
