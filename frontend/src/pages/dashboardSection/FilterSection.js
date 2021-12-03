import { DropdownButton, Dropdown } from 'react-bootstrap';

function FilterSection({
  status,
  subject,
  subjects,
  handleStatus,
  handleSubject,
}) {
  return (
    <div className='my-3 d-flex justify-content-end'>
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
      </DropdownButton>
    </div>
  );
}

export default FilterSection;
