import { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import MarkdownIt from 'markdown-it';
import moment from 'moment-timezone';

function InstructionSection({
  title,
  items,
  dueDate,
  dateCreated,
  subject,
  status,
  postedByName,
  instructions,
}) {
  const [openModal, setOpenModal] = useState(false);
  const md = new MarkdownIt();
  const result = md.render(instructions);
  // console.log(instructions);

  const pageDueDate =
    dueDate === 'noDueDate'
      ? 'No due date'
      : `Due ${moment(dueDate).tz('Africa/Abidjan').format('D MMM, hh:mm A')}`;

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
            {title} Rubrics
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead className='text-center'>
              <tr>
                <th>Program</th>
                <th>Excellent</th>
                <th>Good</th>
                <th>Poor</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td style={{ width: '25%' }} className='px-2'>
                  Accuracy (40%)
                </td>
                <td style={{ width: '25%' }} className='px-2'>
                  Program executes correctly with no syntax or runtime errors. (
                  {Math.round(items * 0.4)})
                </td>
                <td style={{ width: '25%' }} className='px-2'>
                  The program executes some of the test cases. (
                  {Math.round(items * 0.4 * 0.66)})
                </td>
                <td style={{ width: '25%' }} className='px-2'>
                  The program does not execute. (0)
                </td>
              </tr>
              <tr>
                <td style={{ width: '25%' }} className='px-2'>
                  Punctual (40%)
                </td>
                <td style={{ width: '25%' }} className='px-2'>
                  Submit activity at once (before the task given). (
                  {Math.round(items * 0.4)})
                </td>
                <td style={{ width: '25%' }} className='px-2'>
                  Submit activity on the day of submission. (
                  {Math.round(items * 0.4 * 0.66)})
                </td>
                <td style={{ width: '25%' }} className='px-2'>
                  Late submission of (0)
                </td>
              </tr>
              <tr>
                <td style={{ width: '25%' }} className='px-2'>
                  Documentation (20%)
                </td>
                <td style={{ width: '25%' }} className='px-2'>
                  Program is well documented. (2 or more comments) (
                  {Math.round(items * 0.2)})
                </td>
                <td style={{ width: '25%' }} className='px-2'>
                  Missing one comment. ({Math.round(items * 0.2 * 0.66)})
                </td>
                <td style={{ width: '25%' }} className='px-2'>
                  The program is poorly documented. (0)
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            variant='primary'
            type='button'
            onClick={() => setOpenModal(false)}
          >
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>

      <div className='mx-auto text-white '>
        <h1 className='text-primary text-center'>{title}</h1>
        <p className='fw-bold'>
          {postedByName} &nbsp;&#8226; &nbsp;{' '}
          {moment(dateCreated).tz('Asia/Manila').format('D MMM')}
        </p>
        <p className='fw-bold'>
          {items} points &nbsp;&#8226;&nbsp; {pageDueDate}
        </p>
        <div dangerouslySetInnerHTML={{ __html: result }} />
        <Button
          variant='primary'
          type='button'
          className='my-3'
          onClick={() => setOpenModal(true)}
        >
          Rubrics
        </Button>
        {/* <p>
        <strong>Instruction:</strong> Write a program which calculates the cube
        of a given integer x.
      </p>
      <h4>Input</h4>
      <p>An integer x is given in a line.</p>
      <h4>Output</h4>
      <p>Print the cube of x in a line.</p>
      <h4>Sample Input</h4>
      <pre>
        <code>2</code>
      </pre>
      <h4>Sample Output</h4>
      <pre>
        <code>8</code>
      </pre> */}
      </div>
    </>
  );
}

export default InstructionSection;
