import { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from './../context';
import { Redirect, useParams } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import MarkdownIt from 'markdown-it';
import { toast } from 'react-toastify';
import Loading from './../components/Loading';

function EditPage() {
  const dueDateInput = useRef();
  const { isLoading, activity, userProfile, findActivity, updateActivity } =
    useGlobalContext();
  const [dueDateDisable, setIsDueDateDisable] = useState(false);
  const [activityTestCase, setActivityTestCase] = useState([]);
  const [editActivity, setEditActivity] = useState({});
  const [markdown, setMarkdown] = useState('');
  const md = new MarkdownIt({ breaks: true });

  const { _id } = useParams();
  useEffect(() => {
    findActivity(_id);
  }, []);

  useEffect(() => {
    setEditActivity(activity);
    setMarkdown(md.render(String(activity.instructions)));
    if (activity.testCases) {
      const testCases = [...activity.testCases];
      for (let i = 0; i < testCases.length; i++) {
        testCases[i].input = testCases[i].input.replace('\n\n', '\n');
        testCases[i].output = testCases[i].output.replace('\n\n', '\n');
      }
      setActivityTestCase(testCases);
    }
    if (activity.dueDate && activity.dueDate === 'noDueDate')
      setIsDueDateDisable(true);
  }, [activity]);

  const handleSubmitActivity = e => {
    e.preventDefault();
    const testCases = [...activityTestCase];
    for (let i = 0; i < testCases.length; i++) {
      testCases[i].input = testCases[i].input.replace('\n', '\n\n');
      testCases[i].output = testCases[i].output.replace('\n', '\n\n');
    }
    delete editActivity._id;
    delete editActivity.dateCreated;
    toast
      .promise(updateActivity({ ...editActivity, testCases }, _id), {
        pending: 'Saving activity is pending',
        success: 'Activity saved successfully 👌',
        error: 'Saving activity failed 🤯. Please try again',
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

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  if (
    userProfile.role === 'student'
    // || (activity &&
    //   Object.keys(activity).length === 0 &&
    //   Object.getPrototypeOf(activity) === Object.prototype)
  )
    return <Redirect to='/not-found' />;

  return (
    <Container>
      <h1 className='d-flex justify-content-center align-items-center text-white'>
        Edit Activity
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
                  setEditActivity({
                    ...editActivity,
                    title: e.target.value,
                    postedBy: userProfile.name,
                  })
                }
                value={editActivity.title}
              />
            </Form.Group>
          </Col>
          {/* ITEMS */}
          <Col md>
            <Form.Group className='mb-3 text-white' controlId='formBasicItems'>
              <Form.Label>Items</Form.Label>
              <Form.Control
                min='1'
                required
                type='number'
                placeholder='Items'
                onChange={e =>
                  setEditActivity({
                    ...editActivity,
                    items: e.target.value,
                  })
                }
                value={editActivity.items}
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
                  setEditActivity({
                    ...editActivity,
                    dueDate: e.target.value,
                  })
                }
                value={
                  editActivity.dueDate && editActivity.dueDate.slice(0, 16)
                }
              />
              <Form.Group
                className='my-2 text-white'
                controlId='formBasicCheckbox'
              >
                <Form.Check
                  checked={dueDateDisable}
                  type='checkbox'
                  label='No due date'
                  onClick={() => {
                    setIsDueDateDisable(!dueDateDisable);
                    if (dueDateDisable === false) {
                      setEditActivity({
                        ...editActivity,
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
                  setEditActivity({
                    ...editActivity,
                    subject: e.target.value.toUpperCase(),
                  })
                }
                value={editActivity.subject}
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
              value={editActivity.instructions}
              onChange={e => {
                setEditActivity({
                  ...editActivity,
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

export default EditPage;
