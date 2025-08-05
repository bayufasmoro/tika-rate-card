import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  children: React.ReactNode;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = '',
  className = '',
  children
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button 
      onClick={handleClick} 
      className={className}
    >
      {children}
    </button>
  );
};

export default WhatsAppButton;
