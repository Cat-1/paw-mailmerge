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
  message: string;
  onClose: () => void;
}

const PopUpAlert: React.FC<PopUpAlertProps> = ({variant, message, onClose }) => {
  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

export default PopUpAlert;