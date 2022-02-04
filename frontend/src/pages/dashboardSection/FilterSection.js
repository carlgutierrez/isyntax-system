import { useState } from 'react';
import { DropdownButton, Dropdown, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from './../../context';

function FilterSection({
  status,
  subject,
  subjects,
  role,
  handleStatus,
  handleSubject,
}) {
  const { findSubjectCode, addClassCode } = useGlobalContext();
  const [openModal, setOpenModal] = useState(false);
  const [classCodeInput, setClassCodeInput] = useState('');

  const handleEnroll = e => {
    e.preventDefault();

    const isClassCode = findSubjectCode(classCodeInput);

    if (!isClassCode) toast.warning('Class code not found.');
    if (isClassCode) {
      toast
        .promise(addClassCode(classCodeInput), {
          pending: 'Enrolling to subject...',
          success: 'Subject successfully added 👌',
          error: "The system can't add subject right now. Please try again",
        })
        .then(() => {
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

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
          <form onSubmit={handleEnroll}>
            <input
              type='text'
              name='classCode'
              required
              // minlength='5'
              // maxlength='8'
              size='10'
              placeholder='Class Code'
              className='my-2 p-2'
              onChange={e => setClassCodeInput(e.target.value.toUpperCase())}
            ></input>
            {/* <br /> */}
            <div className='d-flex justify-content-end'>
              <Button
                variant='danger'
                onClick={() => setOpenModal(false)}
                className='mx-3'
              >
                Cancel
              </Button>
              <Button variant='primary' type='submit'>
                Join
              </Button>
            </div>
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
              {subjects.sort().map((value, index) => (
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
