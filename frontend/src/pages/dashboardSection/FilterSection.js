import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FilterSection({
  status,
  subject,
  subjects,
  role,
  handleStatus,
  handleSubject,
}) {
  return (
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
  );
}

export default FilterSection;
