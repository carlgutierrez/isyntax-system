import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';

function SuggestionSection({ codeSuggestion }) {
  // const javaText =
  //   'public class Main{\n     public static void main(String []args){\n       System.out.println("iSyntax ");\n     }\n}';
  // const x = prettier.format(javaText, {
  //   parser: 'java',
  //   tabWidth: 4,
  // });
  // console.log(x);

  // const suggestCode =
  //   activity.title === 'Sum of 2 Integers'
  //     ? 'import java.util.Scanner;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner input = new Scanner(System.in);\n    int num1 = input.nextInt();\n    int num2 = input.nextInt();\n    System.out.println(sum + "" + num1);\n  }\n}'
  // : 'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("iSyntax ");\n  }\n}';
  return (
    <div className={'text-white'}>
      <h4 className='fw-bold'>Suggestion</h4>
      <h5>
        *Note: The predicted code does not always suggest correct code/fix
      </h5>
      <div className='text-dark m-4' style={{ height: '60vh', width: '50%' }}>
        <CodeMirror
          // autoFocus={true}
          // placeholder='Enter code here...'
          value={codeSuggestion}
          height='300px'
          width='100%'
          extensions={[java()]}
          editable={false}
          // theme='dark'
        />
      </div>
    </div>
  );
}

export default SuggestionSection;
