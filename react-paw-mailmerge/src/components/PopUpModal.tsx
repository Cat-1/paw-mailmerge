import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface PopUpModalProps {
  messages: string[];
  onClose: () => void;
}

const PopUpAlert: React.FC<PopUpModalProps> = ({ messages, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {messages.map((message, index) => <p key={index}>{message}</p>)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpAlert;