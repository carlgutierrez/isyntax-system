import { useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import SuggestionSection from './SuggestionSection';
import { useGlobalContext } from './../context';
import { toast } from 'react-toastify';
import MarkdownIt from 'markdown-it';

import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';

function Ide({ activity, role, id }) {
  const md = new MarkdownIt();

  const {
    toggleTest,
    toggleSuggestion,
    setToggleTest,
    setToggleSuggestion,
    handleDeleteActivity,
    predictCode,
  } = useGlobalContext();
  const { isAuthenticated } = useAuth0();
  const [output, setOutput] = useState('wrong');
  const [input, setInput] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [codeInput, setCodeInput] = useState(
    'public class Main{\n   public static void main(String []args){\n      \n   }\n}'
  );

  // const handlePredict = () => {
  //   // toast
  //   //   .promise(predictCode(codeInput), {
  //   //     pending: 'Algorithm is predicting... 🧠',
  //   //     success: 'Suggestion send successfully 👌',
  //   //     error: "The algorithm can't analyze right now. Please try again",
  //   //   })
  //   //   .then(({ suggestion }) => {
  //   //     setCodeSuggestion(suggestion);
  //   //     setToggleSuggestion(true);
  //   //     console.log('suggestion clicked');
  //   //   })
  //   //   .catch(err => {
  //   //     console.log(err);
  //   //   });
  //   setToggleSuggestion(true);
  // };

  const handleTestClick = e => {
    setToggleTest(true);
    if (input !== '') {
      setOutput('correct');
    } else {
      setOutput('wrong');
    }
  };

  const handleDelete = e => {
    e.preventDefault();
    setOpenModal(false);
    toast
      .promise(handleDeleteActivity(id), {
        pending: 'Deleting activity is pending',
        success: 'Activity deleted successfully 👌',
        error: 'Deleting activity failed 🤯. Please try again',
      })
      .then(() => {
        setTimeout(function () {
          window.location.pathname = '/dashboard';
        }, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={openModal} onHide={() => setOpenModal(false)}>
        <Modal.Header closeButton className='bg-dark text-white'>
          <Modal.Title>
            Are you sure you want to delete the activity?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark text-white'>
          By removing the activity you will also lose every grades and
          submissions for this activity. It will never be restored.
        </Modal.Body>
        <Modal.Footer className='bg-dark text-white'>
          <Button variant='danger' onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleDelete}>
            Delete Activity
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='row'>
        <CodeMirror
          autoFocus={true}
          placeholder='Enter code here...'
          className='col-lg-6 rounded-3 my-4 d-flex'
          value={codeInput}
          height='300px'
          width='100%'
          extensions={[java()]}
          onChange={(value, viewUpdate) => {
            setCodeInput(value);
          }}
          // theme='dark'
        />

        <div
          className='col-lg-6 rounded-3 mx-auto my-4 p-3'
          style={{ backgroundColor: 'black', height: '300px', width: '500px' }}
        >
          {toggleTest && activity.title !== 'Sum of 2 Integers' && (
            <p className='text-white'>
              Main.java:4: error: {'<'}identifier{'>'} expected
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println("iSyntax");
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^
              <br />
              Main.java:4: error: {'<'}identifier{'>'} expected
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println("iSyntax");
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^
              <br /> 2 errors
            </p>
          )}
          {toggleTest && activity.title === 'Sum of 2 Integers' && (
            <p className='text-white'>
              <>
                {output === 'wrong' && (
                  <p
                    className='content'
                    dangerouslySetInnerHTML={{
                      __html: `Main.java:12: error: reached end of file while parsing
                <br />
                }
                <br />
                &nbsp;&nbsp;^
                <br /> 1 error`,
                    }}
                  />
                )}
                {output === 'correct' && (
                  <p
                    className='content'
                    dangerouslySetInnerHTML={{
                      __html: `$ java Main.java
                                <br />
                                &nbsp;&nbsp;15`,
                    }}
                  />
                )}
              </>
            </p>
          )}
        </div>
      </div>

      <div className='row mx-auto'>
        <div className='col-lg-6 rounded-3 mx-auto mb-4'>
          <h5 className='text-white'>Standard Input/s:</h5>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className='form-control mt-2 inputs text-white'
            rows='4'
            placeholder='Enter multiple values in separate lines...'
            style={{ backgroundColor: '#1B1919' }}
          ></textarea>
        </div>
        {/* TEST CASES */}
        <div className='col-lg-6 rounded-3 mx-auto mb-4'>
          <h5 className='text-white'>Test Cases:</h5>
          <div
            className='form-control mt-2 inputs text-white'
            style={{ backgroundColor: '#1B1919' }}
          >
            <h6 className='fw-bold' style={{ color: '#0d6efd' }}>
              Test Cases 0 / {activity.testCases.length}
            </h6>
            <Row xs={1} lg={3} className='justify-content-center'>
              {activity.testCases.map(
                ({ testNumber, input, output }, index) => {
                  const inputResult = md.render(input);
                  const outputResult = md.render(output);
                  return (
                    <Col>
                      <p style={{ color: '#0d6efd' }} key={index}>
                        ⌛ Test Case # {testNumber}:
                      </p>
                      <div style={{ display: 'block' }}>
                        <h6 style={{ color: '#0d6efd' }}>Input:</h6>
                        <div
                          dangerouslySetInnerHTML={{ __html: inputResult }}
                        />
                        <h6 style={{ color: '#0d6efd' }}>Output:</h6>
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
      </div>

      {activity.status === 'Todo' && (
        <>
          <Button
            variant='primary'
            className='mx-2 mb-4'
            onClick={handleTestClick}
          >
            Test
          </Button>
          {isAuthenticated && role === 'student' && (
            <>
              <Button
                variant='primary'
                className='mx-2 mb-4'
                onClick={() => setToggleSuggestion(true)}
              >
                Analyze
              </Button>
              <Button
                variant='primary'
                className='mx-2 mb-4'
                onClick={() => (window.location.pathname = `/result/${id}`)}
              >
                Submit
              </Button>
            </>
          )}

          {role === 'teacher' && (
            <>
              <Button
                variant='warning'
                className='mx-2 mb-4'
                onClick={() =>
                  (window.location.pathname = `/edit-activity/${id}`)
                }
              >
                Edit
              </Button>
              <Button
                variant='danger'
                className='mx-2 mb-4'
                onClick={() => setOpenModal(true)}
              >
                Delete
              </Button>
            </>
          )}
        </>
      )}

      {/* {role === 'teacher' && */}
      {activity.status === 'Todo' && isAuthenticated && toggleSuggestion && (
        <SuggestionSection {...activity} />
      )}
    </>
  );
}

export default Ide;
