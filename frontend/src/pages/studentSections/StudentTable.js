import React from 'react';
import { Table } from 'react-bootstrap';

function StudentTable() {
  function createData(name, act1, act2, act3, act4, act5) {
    return {
      name,
      act1,
      act2,
      act3,
      act4,
      act5,
    };
  }

  let userArray = [
    createData(
      'Andrew Baines Bernard',
      'Submitted',
      'Pending',
      'Pending',
      'Late',
      'Pending'
    ),
    createData(
      'Angela Noelle Schrute',
      'Pending',
      'Submitted',
      'Late',
      'Pending',
      'Pending'
    ),
    createData(
      'Creed Bratton',
      'Pending',
      'Pending',
      'Pending',
      'Pending',
      'Pending'
    ),
    createData(
      'Darryl Philbin',
      'Pending',
      'Late',
      'Pending',
      'Pending',
      'Pending'
    ),
    createData(
      'Dwight Kurt Schrute III',
      'Pending',
      'Pending',
      'Pending',
      'Pending',
      'Pending'
    ),
    createData(
      'James Halpert',
      'Late',
      'Pending',
      'Pending',
      'Submitted',
      'Pending'
    ),
    createData(
      'Kelly Erin Hannon',
      'Submitted',
      'Pending',
      'Submitted',
      'Pending',
      'Pending'
    ),
    createData(
      'Kelly Rajnigandha Kapoor',
      'Pending',
      'Pending',
      'Pending',
      'Pending',
      'Pending'
    ),
    createData(
      'Kevin Malone',
      'Pending',
      'Submitted',
      'Pending',
      'Pending',
      'Pending'
    ),
    createData(
      'Meredith Palmer',
      'Pending',
      'Pending',
      'Pending',
      'Late',
      'Pending'
    ),
    createData(
      'Michael Gary Scott',
      'Pending',
      'Pending',
      'Pending',
      'Pending',
      'Submitted'
    ),
    createData(
      'Oscar Martinez',
      'Pending',
      'Pending',
      'Submitted',
      'Pending',
      'Pending'
    ),
    createData(
      'Pamela Morgan Halpert',
      'Late',
      'Pending',
      'Pending',
      'Pending',
      'Pending'
    ),
    createData(
      'Phyllis Vance',
      'Pending',
      'Submitted',
      'Pending',
      'Pending',
      'Pending'
    ),
    createData(
      'Ryan Bailey Howard',
      'Pending',
      'Pending',
      'Submitted',
      'Pending',
      'Pending'
    ),
    createData(
      'Stanley Hudson',
      'Pending',
      'Pending',
      'Pending',
      'Submitted',
      'Pending'
    ),
    createData(
      'Toby Flenderson',
      'Pending',
      'Pending',
      'Late',
      'Pending',
      'Pending'
    ),
  ];

  return (
    <Table bordered hover variant='dark'>
      <thead className='text-center'>
        <tr>
          <th>Name</th>
          <th>iSyntax</th>
          <th>Sum of 2 Integers</th>
          <th>Staircase</th>
          <th>Simple Array Sum</th>
          <th>Plus Minus</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {userArray.map(({ name, act1, act2, act3, act4, act5 }, index) => (
          <tr key={index}>
            <td>{name}</td>
            {[act1, act2, act3, act4, act5].map((value, index) => {
              let className = 'text-warning';
              if (value === 'Submitted') className = 'text-success';
              if (value === 'Late') className = 'text-danger';
              return (
                <td className={className} key={index}>
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default StudentTable;
