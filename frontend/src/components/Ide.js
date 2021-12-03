import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

function Ide({ status }) {
  const { isAuthenticated } = useAuth0();
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
          {/* <p className='text-white'>
            $ 9: error: reached end of file while parsing
          </p>
          <p className='text-white'>$ }</p>
          <p className='text-white'>$ &nbsp;^</p>
          <p className='text-white'>$ 1 error</p> */}
          <p className='text-white'>
            line 9: error: reached end of file while parsing <br /> {'}'}
            <br />
            &nbsp;^
            <br /> 1 error
          </p>
        </div>
      </div>
      {status === 'Todo' && (
        <>
          <Button variant='primary' className='mx-2 mb-4'>
            Test
          </Button>
          {isAuthenticated && (
            <>
              <Button variant='primary' className='mx-2 mb-4'>
                Analyze
              </Button>
              <Button variant='primary' className='mx-2 mb-4'>
                Submit
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Ide;
