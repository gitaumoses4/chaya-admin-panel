import React from 'react';

export const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className="bg-brand-200 flex flex-col items-center p-10 gap-4">
      <h1 className="text-brand-600 text-3xl font-bold">Our Partners:</h1>
      <p className="text-brand-400 text-xl">
        Thank you ------ & ------ for partnering with us on our <b>Mitzvot for Israel</b> campaign.
      </p>
    </footer>
  );
};

export interface FooterProps {}
