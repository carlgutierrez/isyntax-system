import { useState } from 'react';
import { Modal, Image } from 'react-bootstrap';

function NewBadgeAcquired({ name, picture }) {
  const [openModal, setOpenModal] = useState(true);
  return (
    <div>
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={openModal}
        onHide={() => setOpenModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            <h2 className='text-center'>New Badge Accquired</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className='text-center text-primary'>{`🎊🎉 ${name} 🎉🎊`}</h2>
          <div className='d-flex justify-content-center'>
            <Image
              src={picture}
              roundedCircle
              style={{ width: '30%', height: '30%' }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewBadgeAcquired;
