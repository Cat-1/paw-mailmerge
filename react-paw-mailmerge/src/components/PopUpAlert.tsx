import React from 'react';
import { Alert } from 'react-bootstrap';

export enum AlertVariant {
  'primary' = 'primary',
  'secondary' = 'secondary',
  'success' = 'success',
  'danger' = 'danger',
  'warning' = 'warning',
  'info' = 'info',
  'light' = 'light',
  'dark' = 'dark',
}

interface PopUpAlertProps {
  variant: AlertVariant;
  messages: string[];
  onClose: () => void;
}

const PopUpAlert: React.FC<PopUpAlertProps> = ({variant, messages, onClose }) => {
  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {messages.map((message, index) => <p key = {index}>{message}</p>)}
    </Alert>
  );
};

export default PopUpAlert;