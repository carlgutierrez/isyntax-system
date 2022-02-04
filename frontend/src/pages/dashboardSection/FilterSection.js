import { useState } from 'react';
import { DropdownButton, Dropdown, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FilterSection({
  status,
  subject,
  subjects,
  role,
  handleStatus,
  handleSubject,
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={openModal}
        onHide={() => setOpenModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Join Class
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Ask your teacher for the class code, then enter it here.</h5>
          <form
            onSubmit={e => {
              e.preventDefault();
              setOpenModal(false);
            }}
          >
            <input
              type='text'
              name='classCode'
              required
              // minlength='5'
              // maxlength='8'
              size='10'
              placeholder='Class Code'
              className='my-2'
            ></input>
            <Button variant='danger' onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button
              variant='primary'
              type='submit'
              // onClick={() => setOpenModal(false)}
            >
              Join
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <div className='my-3 d-flex justify-content-end'>
        {role === 'student' ? (
          <>
            <DropdownButton
              id='dropdown-basic-button'
              title={status}
              className='mx-3'
              onSelect={handleStatus}
            >
              <Dropdown.ItemText className='text-primary fw-bold'>
                Select status
              </Dropdown.ItemText>
              {['Todo', 'Finished'].map((value, index) => (
                <Dropdown.Item key={index} eventKey={value}>
                  {value}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton
              id='dropdown-basic-button'
              title={subject}
              className='mx-3'
              onSelect={handleSubject}
            >
              <Dropdown.ItemText className='text-primary fw-bold'>
                Select subject
              </Dropdown.ItemText>
              {subjects.map((value, index) => (
                <Dropdown.Item key={index} eventKey={value}>
                  {value}
                </Dropdown.Item>
              ))}
            </DropdownButton>{' '}
            <Button
              variant='primary'
              className='mx-3'
              onClick={() => setOpenModal(true)}
            >
              Join Class
            </Button>
          </>
        ) : (
          // <Link to='/create-activity'>
          <a href='/create-activity'>
            <Button variant='primary' className='mx-3'>
              Create Activity
            </Button>
          </a>
        )}
      </div>
    </>
  );
}

export default FilterSection;
