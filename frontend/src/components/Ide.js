import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import SuggestionSection from './SuggestionSection';
import { useGlobalContext } from './../context';
import { toast } from 'react-toastify';

function Ide({ status, role }) {
  const { toggleTest, toggleSuggestion, setToggleTest, setToggleSuggestion } =
    useGlobalContext();
  const { isAuthenticated } = useAuth0();
  const [currentMana, setCurrentMana] = useState(1);

  const handleMana = () => {
    if (currentMana >= 1) setCurrentMana(currentMana - 1);
    else toast.warning('Not enough mana!');
  };

  return (
    <>
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
        <h5 className='text-white'>Standard Input/s:</h5>
        <div className='col-lg-4 rounded-3 mx-auto mb-4 d-flex'>
          <textarea
            className='form-control mt-2 inputs text-white'
            rows='4'
            placeholder='Enter multiple values in separate lines...'
            style={{ backgroundColor: '#1B1919' }}
          ></textarea>
        </div>
        <div className='col-lg-8 rounded-3 mx-auto mb-4 d-flex'></div>
      </div>

      {status === 'Todo' && (
        <>
          <Button
            variant='primary'
            className='mx-2 mb-4'
            onClick={() => setToggleTest(true)}
          >
            Test
          </Button>
          {isAuthenticated && (
            <>
              <Button
                variant='primary'
                className='mx-2 mb-4'
                onClick={() => {
                  setToggleSuggestion(true);
                  handleMana();
                }}
              >
                Analyze (🔮 {currentMana}/5 mana)
              </Button>
              <Button variant='primary' className='mx-2 mb-4'>
                Submit
              </Button>
            </>
          )}
        </>
      )}

      {/* {role === 'teacher' && */}
      {status === 'Todo' && isAuthenticated && toggleSuggestion && (
        <SuggestionSection />
      )}
    </>
  );
}

export default Ide;
