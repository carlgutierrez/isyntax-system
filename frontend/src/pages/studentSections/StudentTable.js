import React from 'react';
import { Table } from 'react-bootstrap';

function StudentTable({ users, teacherSubjects, allSubmissions }) {
  const teacherSubjectsID = [];
  for (const index in teacherSubjects) {
    teacherSubjectsID.push(teacherSubjects[index]._id);
  }

  const teacherAllSubmissions = [];
  for (const index in allSubmissions) {
    teacherAllSubmissions.push({
      userEmail: allSubmissions[index].userEmail,
      activityID: allSubmissions[index].activityID,
      rubricScore: allSubmissions[index].rubricScore,
    });
  }

  return (
    <Table bordered hover variant='dark'>
      <thead className='text-center'>
        <tr>
          <th>Name</th>
          {teacherSubjects.map(({ title }, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody className='text-center'>
        {/* {userArray.map(({ name, act1, act2, act3, act4, act5 }, index) => (
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
        ))} */}

        {/* HERE */}
        {users.map(({ name, email }, index) => (
          <tr key={index}>
            <td>{name}</td>
            {/* {[...Array(teacherSubjects.length).keys()].map((value, index) => { */}
            {teacherSubjectsID.map((activityID, index) => {
              let activityStatus = teacherAllSubmissions.filter(submission => {
                return (
                  submission.userEmail === email &&
                  submission.activityID === activityID
                  // && submission.rubricScore
                );
              });

              let textColor = '#FFA900';
              let statusText = 'Pending';

              if (activityStatus.length === 1) {
                textColor = '#00B74A';
                statusText = 'Submitted';
              }
              if (
                activityStatus.length === 1 &&
                // activityStatus[0].rubricScore &&
                activityStatus[0].rubricScore[1] === 0
              ) {
                textColor = '#F93154';
                statusText = 'Late';
              }

              return (
                <td textColor={textColor} key={index}>
                  <a
                    href={`/result/${activityID}?email=${email}`}
                    style={{
                      pointerEvents: `${
                        statusText === 'Pending' ? 'none' : 'all'
                      } `,
                      textDecoration: 'none',
                      color: `${textColor}`,
                      cursor: 'pointer',
                    }}
                  >
                    {statusText}
                  </a>
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
