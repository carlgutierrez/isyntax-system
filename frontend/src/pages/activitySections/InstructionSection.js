import React from 'react';
import MarkdownIt from 'markdown-it';
import moment from 'moment-timezone';

function InstructionSection({
  title,
  items,
  dueDate,
  dateCreated,
  subject,
  status,
  postedBy,
  instructions,
}) {
  const md = new MarkdownIt();
  const result = md.render(instructions);
  // console.log(instructions);

  const pageDueDate =
    dueDate === 'noDueDate'
      ? 'No due date'
      : `Due ${moment(dueDate).tz('Africa/Abidjan').format('D MMM, hh:mm A')}`;

  return (
    <div className='mx-auto text-white '>
      <h1 className='text-primary text-center'>{title}</h1>
      <p className='fw-bold'>
        {postedBy} &nbsp;&#8226; &nbsp;{' '}
        {moment(dateCreated).tz('Asia/Manila').format('D MMM')}
      </p>
      <p className='fw-bold'>
        {items} items &nbsp;&#8226;&nbsp; {pageDueDate}
      </p>

      <div dangerouslySetInnerHTML={{ __html: result }} />

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
  );
}

export default InstructionSection;
