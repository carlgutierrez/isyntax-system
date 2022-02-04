import { useState, useRef } from 'react';
import { useGlobalContext } from './../context';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import MarkdownIt from 'markdown-it';
import { toast } from 'react-toastify';

function CreatePage() {
  const dueDateInput = useRef();
  const { userProfile, saveActivity } = useGlobalContext();
  const [activityTestCase, setActivityTestCase] = useState([
    {
      testNumber: 1,
      input: '',
      output: '',
    },
  ]);
  const [dueDateDisable, setIsDueDateDisable] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [createActivity, setCreateActivity] = useState({
    title: '',
    items: '',
    dueDate: '',
    subject: '',
    status: 'Todo',
    postedBy: '',
    postedByName: '',
    instructions: '',
  });
  const md = new MarkdownIt({ breaks: true });

  const handleSubmitActivity = e => {
    e.preventDefault();
    const testCases = [...activityTestCase];
    for (let i = 0; i < testCases.length; i++) {
      testCases[i].input = testCases[i].input.replace('\n', '\n\n');
      testCases[i].output = testCases[i].output.replace('\n', '\n\n');
    }
    toast
      .promise(saveActivity({ ...createActivity, testCases }), {
        pending: 'Saving activity is pending',
        success: 'Activity saved successfully 👌',
        error: 'Saving activity failed 🤯. Please try again',
      })
      .then(() => {
        setTimeout(function () {
          // window.location.href = 'http://localhost:3000/dashboard';
          window.location.pathname = '/dashboard';
        }, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (userProfile.role === 'student') return <Redirect to='/not-found' />;

  return (
    <Container>
      <h1 className='d-flex justify-content-center align-items-center text-white'>
        Create New Activity
      </h1>
      {/* 4 input section */}
      <Form className='row mx-auto' onSubmit={handleSubmitActivity}>
        {/* TITLE */}
        <Row className='g2'>
          <Col md>
            <Form.Group className='mb-3 text-white' controlId='formBasicTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Title'
                onChange={e =>
                  setCreateActivity({
                    ...createActivity,
                    title: e.target.value,
                    postedBy: userProfile.email,
                    postedByName: userProfile.name,
                  })
                }
              />
              {/* <Form.Text className='text-muted'>
                Sample Text Below Label
              </Form.Text> */}
            </Form.Group>
          </Col>
          {/* ITEMS */}
          <Col md>
            <Form.Group className='mb-3 text-white' controlId='formBasicItems'>
              <Form.Label>Points</Form.Label>
              <Form.Control
                min='1'
                required
                type='number'
                placeholder='Points'
                onChange={e =>
                  setCreateActivity({
                    ...createActivity,
                    items: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        {/* DUE DATE */}
        <Row className='g2'>
          <Col md>
            <Form.Group className='mb-3 text-white' controlId='formBasicTitle'>
              <Form.Label>Due date</Form.Label>
              <Form.Control
                ref={dueDateInput}
                required
                type='datetime-local'
                placeholder='Due Date'
                disabled={dueDateDisable}
                // value='12/25/2021 02:00 AM'
                // value='2021-12-05T16:23:44.365Z'
                onChange={e =>
                  setCreateActivity({
                    ...createActivity,
                    dueDate: e.target.value,
                  })
                }
              />
              <Form.Group
                className='my-2 text-white'
                controlId='formBasicCheckbox'
              >
                <Form.Check
                  type='checkbox'
                  label='No due date'
                  onClick={() => {
                    setIsDueDateDisable(!dueDateDisable);
                    if (dueDateDisable === false) {
                      setCreateActivity({
                        ...createActivity,
                        dueDate: 'noDueDate',
                      });
                      dueDateInput.current.value = '';
                    }
                  }}
                />
              </Form.Group>
            </Form.Group>
          </Col>
          {/* SUBJECT */}
          <Col md>
            <Form.Group className='mb-3 text-white' controlId='formBasicItems'>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Subject Code'
                onChange={e =>
                  setCreateActivity({
                    ...createActivity,
                    subject: e.target.value.toUpperCase(),
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Markdown section */}
        <div className='row mx-auto'>
          <h5 className='text-white'>Enter Instructions:</h5>
          <h6 className='text-white fw-bold'>
            <a
              href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'
              target='_blank'
            >
              Cheat Sheet Here
            </a>
          </h6>

          <div className='col-lg-6 rounded-3 mx-auto mb-4 d-flex'>
            <textarea
              required
              // value={markdown}
              onChange={e => {
                setCreateActivity({
                  ...createActivity,
                  instructions: e.target.value,
                });
                setMarkdown(md.render(e.target.value));
              }}
              className='form-control mt-2 inputs text-white'
              rows='4'
              placeholder='Use markup language for creating formatted instructions'
              style={{ backgroundColor: '#1B1919' }}
            ></textarea>
          </div>
          <div className='col-lg-6 rounded-3 mx-auto mb-4 d-flex text-white'>
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
            {/* {markdown} */}
          </div>
        </div>

        {/* TEST CASE */}
        <Row xs={1} lg={2} className='justify-content-center'>
          {activityTestCase.map((testCase, index) => (
            <Col
              lg={5}
              className='text-white border border-primary rounded-3 p-3 m-2'
              key={index}
            >
              <h3 className='text-center'>Test Case {testCase.testNumber}</h3>
              <div className='mb-3 text-white' controlId='formBasicTitle'>
                <label>Input</label>
                <br />
                <textarea
                  style={{ width: '100%' }}
                  className='form-control mt-2 inputs'
                  rows='2'
                  required
                  type='text'
                  placeholder='Input'
                  onChange={e => {
                    const newArr = [...activityTestCase];
                    newArr[index].input = e.target.value;
                    setActivityTestCase(newArr);
                  }}
                  value={testCase.input}
                ></textarea>
              </div>
              <div className='mb-3 text-white' controlId='formBasicTitle'>
                <label>Output</label>
                <br />
                <textarea
                  style={{ width: '100%' }}
                  className='form-control mt-2 inputs'
                  rows='2'
                  required
                  type='text'
                  placeholder='Output'
                  onChange={e => {
                    const newArr = [...activityTestCase];
                    newArr[index].output = e.target.value;
                    setActivityTestCase(newArr);
                  }}
                  value={testCase.output}
                ></textarea>
              </div>
              <div className='d-flex justify-content-between'>
                <Button
                  className='my-2'
                  variant='danger'
                  disabled={activityTestCase.length === 1}
                  onClick={() => {
                    let newArr = [...activityTestCase];
                    const idx = newArr.indexOf(testCase);
                    newArr.splice(idx, 1);

                    for (let i = 0; i < newArr.length; i++) {
                      newArr[i].testNumber = i + 1;
                    }

                    setActivityTestCase(newArr);
                  }}
                >
                  Remove test case
                </Button>
                {activityTestCase.slice(-1)[0] === testCase && (
                  <Button
                    className='my-2'
                    variant='primary'
                    onClick={() => {
                      const newArr = [...activityTestCase];
                      newArr.push({
                        testNumber: activityTestCase.length + 1,
                        input: '',
                        output: '',
                      });
                      setActivityTestCase(newArr);
                    }}
                  >
                    Add test case
                  </Button>
                )}
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          <Col md></Col>
          <Col md className='text-end my-4'>
            <Button className='mx-3' variant='danger'>
              <a
                href='/dashboard'
                className='text-white'
                style={{ textDecoration: 'none' }}
              >
                Cancel
              </a>
            </Button>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreatePage;
