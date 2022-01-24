import React from 'react';
import moment from 'moment-timezone';
import { Row, Col, Table } from 'react-bootstrap';
import MarkdownIt from 'markdown-it';
import Loading from '../../components/Loading';

function TestCaseSection({
  title,
  items,
  dueDate,
  dateCreated,
  subject,
  status,
  postedBy,
  instructions,
  testCases,
}) {
  const md = new MarkdownIt();
  console.log(testCases);

  const pageDueDate =
    dueDate === 'noDueDate'
      ? 'No due date'
      : `Due ${moment(dueDate).tz('Africa/Abidjan').format('D MMM, hh:mm A')}`;

  if (!testCases)
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  return (
    <div className='mx-auto'>
      <h1 className='text-primary text-center'>{title}</h1>
      <p className='fw-bold'>
        {postedBy} &nbsp;&#8226; &nbsp;{' '}
        {moment(dateCreated).tz('Asia/Manila').format('D MMM')}
      </p>
      <p className='fw-bold'>
        {items} items &nbsp;&#8226;&nbsp; {pageDueDate}
      </p>

      <h2 className='text-center mb-4'>Results</h2>

      <div className='row mx-auto'>
        <div className='col-lg-6 rounded-3 mx-auto mb-4'>
          <h5>
            Date Submitted:
            {moment(new Date()).tz('Asia/Manila').format('D MMM, hh:mm A')}
          </h5>
          <br />
          <h5>Accuracy: 20 (Good)</h5>
          <h5>Design of Code Logic: 12 (Excellent)</h5>
          <h5>Punctual: 15 (Excellent)</h5>
          <h5>Documentation: 8 (Excellent)</h5>
          <br />
          <h5>Total Score: 55 / {items}</h5>
        </div>
        {/* TEST CASES */}
        <div className='col-lg-6 rounded-3 mx-auto mb-4'>
          <h5 className='text-white fw-bold'>Test Cases:</h5>
          <div
            className='form-control mt-2 inputs text-white'
            style={{ backgroundColor: '#1B1919' }}
          >
            <h6 className='fw-bold' style={{ color: '#0d6efd' }}>
              Test Case Passed 2 / {testCases.length}
            </h6>
            <Row xs={1} lg={3} className='justify-content-center'>
              {testCases.map(({ testNumber, input, output }, index) => {
                let userOutput = output;
                if (testNumber === 2) {
                  userOutput = '6026';
                }
                const inputResult = md.render(userOutput);
                const outputResult = md.render(output);
                return (
                  <Col>
                    <p style={{ color: '#0d6efd' }} key={index}>
                      {testNumber !== 2 ? '✔️' : '❌'}Test Case # {testNumber}:
                    </p>
                    <div style={{ display: 'block' }}>
                      <h6 style={{ color: '#0d6efd' }}>Your Output:</h6>
                      <div dangerouslySetInnerHTML={{ __html: inputResult }} />
                      <h6 style={{ color: '#0d6efd' }}>Expected Output:</h6>
                      <div dangerouslySetInnerHTML={{ __html: outputResult }} />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <h2 className='text-center mt-5'>Rubrics</h2>
        <Table bordered hover variant='dark' className='mb-5'>
          <thead className='text-center'>
            <tr>
              <th>Program (e.g. 100 items)</th>
              <th>Excellent</th>
              <th>Good</th>
              <th>Fair</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td style={{ width: '25%' }} className='px-2'>
                Accuracy (40%)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Program executes correctly with no syntax or runtime errors.
                (40)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Program executes with a minor (easily fixed error). (26)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                The program does not execute, but the effort in completing the
                program. (13)
              </td>
            </tr>
            <tr>
              <td style={{ width: '25%' }} className='px-2'>
                Design of code logic (30%)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Program is logically well designed (30)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                The program contains minor logic errors which have no
                significant effect on the results. (20)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Program is incorrect, but the effort is in completing the
                program. (10)
              </td>
            </tr>
            <tr>
              <td style={{ width: '25%' }} className='px-2'>
                Punctual (20%)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Submit activity at once (before the task given). (20)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Submit activity on the day of submission. (13)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Submit activity at closing date/time. (7)
              </td>
            </tr>
            <tr>
              <td style={{ width: '25%' }} className='px-2'>
                Documentation (10%)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Program is well documented. (10)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Missing one comment. (7)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Missing two or more comments. (3)
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TestCaseSection;
