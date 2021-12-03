import React from 'react';
import { Table } from 'react-bootstrap';

function SuggestionSection(props) {
  return (
    <div className='text-white'>
      <h4>Suggestion</h4>
      <Table bordered responsive className='text-white text-center'>
        <thead>
          <tr>
            <th>Word / Character</th>
            <th>Line Number</th>
            <th>Suggestion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{'{'}</td>
            <td>6</td>
            <td> </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default SuggestionSection;
