import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import SuggestionSection from './SuggestionSection';
import { useGlobalContext } from './../context';
import { toast } from 'react-toastify';
import MarkdownIt from 'markdown-it';

function Ide({ activity, role, id }) {
  const md = new MarkdownIt();

  const {
    toggleTest,
    toggleSuggestion,
    setToggleTest,
    setToggleSuggestion,
    handleDeleteActivity,
  } = useGlobalContext();
  const { isAuthenticated } = useAuth0();
  const [currentMana, setCurrentMana] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const handleMana = () => {
    if (currentMana >= 1) setCurrentMana(currentMana - 1);
    else toast.warning('Not enough mana !');
    setToggleSuggestion(true);
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
        <SyntaxHighlighter
          className='col-lg-6 rounded-3 mx-auto my-4 d-flex'
          showLineNumbers={true}
          language='java'
          style={atelierForestDark}
        >
          {
            'import java.io.*;\n\npublic class sample {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(i);{\n        }\n    }\n}'
          }
        </SyntaxHighlighter>

        <div
          className='col-lg-6 rounded-3 mx-auto my-4 p-3'
          style={{ backgroundColor: 'black', height: '300px', width: '500px' }}
        >
          {toggleTest && (
            <p className='text-white'>
              line 9: error: reached end of file while parsing <br /> {'}'}
              <br />
              &nbsp;^
              <br /> 1 error
            </p>
          )}
        </div>
      </div>

      <div className='row mx-auto'>
        <div className='col-lg-6 rounded-3 mx-auto mb-4'>
          <h5 className='text-white'>Standard Input/s:</h5>
          <textarea
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
            onClick={() => setToggleTest(true)}
          >
            Test
          </Button>
          {isAuthenticated && role === 'student' && (
            <>
              <Button
                variant='primary'
                className='mx-2 mb-4'
                onClick={() => handleMana()}
              >
                Analyze (🔮 {currentMana}/5 mana)
              </Button>
              <Button variant='primary' className='mx-2 mb-4'>
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
        <SuggestionSection />
      )}
    </>
  );
}

export default Ide;
