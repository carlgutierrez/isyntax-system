import { useEffect } from 'react';
import moment from 'moment-timezone';
import { Row, Col, Table } from 'react-bootstrap';
import MarkdownIt from 'markdown-it';
import Loading from '../../components/Loading';
import { useGlobalContext } from '../../context';

import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';

// function TestCaseSection({
//   _id,
//   title,
//   items,
//   dueDate,
//   dateCreated,
//   subject,
//   status,
//   postedBy,
//   instructions,
//   testCases,
function TestCaseSection({ activity, submissionResultObject }) {
  // const { userProfile, getSubmission } = useGlobalContext();

  // useEffect(() => {
  //   getSubmission(userProfile._id, _id);
  // }, []);

  const md = new MarkdownIt();

  const pageDueDate =
    activity.dueDate === 'noDueDate'
      ? 'No due date'
      : `Due ${moment(activity.dueDate)
          .tz('Africa/Abidjan')
          .format('D MMM, hh:mm A')}`;

  if (
    // !activity.testCases &&
    activity &&
    Object.keys(activity).length === 0 &&
    Object.getPrototypeOf(activity) === Object.prototype &&
    // submissionResultObject.submissionResult.length !== 0

    submissionResultObject &&
    Object.keys(submissionResultObject).length === 0 &&
    Object.getPrototypeOf(submissionResultObject) === Object.prototype
  )
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  return (
    <div className='mx-auto'>
      <h1 className='text-primary text-center'>{activity.title}</h1>
      <p className='fw-bold'>
        {activity.postedByName} &nbsp;&#8226; &nbsp;{' '}
        {moment(activity.dateCreated).tz('Asia/Manila').format('D MMM')}
      </p>
      <p className='fw-bold'>
        {activity.items} points &nbsp;&#8226;&nbsp; {pageDueDate}
      </p>

      <h2 className='text-center mb-4'>Results</h2>

      <div className='row mx-auto'>
        <div className='col-lg-6 rounded-3 mx-auto mb-4'>
          <h5>
            Date Submitted: &nbsp;
            {moment(submissionResultObject.dateSubmitted)
              .tz('Asia/Manila')
              .format('D MMM, hh:mm A')}
          </h5>
          <br />

          {!(
            submissionResultObject &&
            Object.keys(submissionResultObject).length === 0 &&
            Object.getPrototypeOf(submissionResultObject) === Object.prototype
          ) && (
            <>
              <h5>Accuracy: {submissionResultObject.rubricScore[0]}</h5>
              <h5>Punctual: {submissionResultObject.rubricScore[1]}</h5>
              <h5>Documentation: {submissionResultObject.rubricScore[2]}</h5>
              <br />
              <h5>
                Total Score:{' '}
                {submissionResultObject.rubricScore.reduce(
                  (partialSum, a) => partialSum + a,
                  0
                )}{' '}
                / {activity.items}
              </h5>
            </>
          )}
        </div>
        {/* TEST CASES */}
        <div className='col-lg-6 rounded-3 mx-auto mb-4'>
          <h5 className='text-white fw-bold'>Test Cases:</h5>
          <div
            className='form-control mt-2 inputs text-white'
            style={{ backgroundColor: '#1B1919' }}
          >
            <h6 className='fw-bold' style={{ color: '#0d6efd' }}>
              Test Case Passed {submissionResultObject.testCasePassed} /{' '}
              {activity.testCases.length}
            </h6>
            <Row xs={1} lg={3} className='justify-content-center'>
              {!(
                submissionResultObject &&
                Object.keys(submissionResultObject).length === 0 &&
                Object.getPrototypeOf(submissionResultObject) ===
                  Object.prototype
              ) &&
                activity.testCases.map(
                  ({ testNumber, input, output }, index) => {
                    let userOutput = [
                      ...submissionResultObject.submissionResult,
                    ];

                    const inputResult = md.render(userOutput[index].output);

                    const outputResult = md.render(output);
                    return (
                      <Col>
                        <p style={{ color: '#0d6efd' }} key={index}>
                          {userOutput[index].output === output ? '✔️' : '❌'}
                          Test Case # {testNumber}:
                        </p>
                        <div style={{ display: 'block' }}>
                          <h6 style={{ color: '#0d6efd' }}>Your Output:</h6>
                          <div
                            dangerouslySetInnerHTML={{ __html: inputResult }}
                          />
                          <h6 style={{ color: '#0d6efd' }}>Expected Output:</h6>
                          <div
                            dangerouslySetInnerHTML={{ __html: outputResult }}
                          />
                        </div>
                      </Col>
                    );
                  }
                )}
            </Row>
          </div>
        </div>

        {/* CODE SUBMITTED */}
        <div className='col-lg-6 rounded-3 mx-auto mb-4'>
          <h5 className='text-white fw-bold'>Code Submitted: </h5>
          <div className='text-dark mt-2' style={{ height: '60vh' }}>
            <CodeMirror
              value={submissionResultObject.code}
              height='300px'
              width='100%'
              extensions={[java()]}
              editable={false}
            />
          </div>

          {/* <Row xs={1} lg={1} className='justify-content-center text-dark m-4'>
            <CodeMirror
              value={submissionResultObject.code}
              height='300px'
              width='100%'
              extensions={[java()]}
              editable={false}
            />
          </Row> */}
        </div>

        <h2 className='text-center mt-5'>Rubrics</h2>
        <Table bordered hover variant='dark' className='mb-5'>
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
                {Math.round(activity.items * 0.4)})
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                The program executes some of the test cases. (
                {Math.round(activity.items * 0.4 * 0.66)})
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
                {Math.round(activity.items * 0.4)})
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Submit activity on the day of submission. (
                {Math.round(activity.items * 0.4 * 0.66)})
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Late submission of activity. (0)
              </td>
            </tr>
            <tr>
              <td style={{ width: '25%' }} className='px-2'>
                Documentation (20%)
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Program is well documented. (2 or more comments) (
                {Math.round(activity.items * 0.2)})
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                Missing one comment. ({Math.round(activity.items * 0.2 * 0.66)})
              </td>
              <td style={{ width: '25%' }} className='px-2'>
                The program is poorly documented. (0)
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TestCaseSection;
