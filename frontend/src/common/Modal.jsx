import React from 'react';
import ModalBootstrap from 'react-bootstrap/Modal';

function Modal({ heading, message, show, closeModal, content }) {
  return (
    <>
      <ModalBootstrap show={show} onHide={closeModal}>
        <ModalBootstrap.Header closeButton>
          <ModalBootstrap.Title>{heading}</ModalBootstrap.Title>
        </ModalBootstrap.Header>
        <ModalBootstrap.Body>{message}</ModalBootstrap.Body>
        <ModalBootstrap.Footer>{content}</ModalBootstrap.Footer>
      </ModalBootstrap>
    </>
  );
}

export default Modal;
