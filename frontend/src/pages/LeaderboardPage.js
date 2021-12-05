import { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useGlobalContext } from './../context';
import Loading from './../components/Loading';
import moment from 'moment-timezone';

function LeaderboardPage() {
  const monthNow = moment(new Date()).tz('Asia/Manila').format('MMMM');

  const { users, isLoading, getAllUsers } = useGlobalContext();
  useEffect(() => {
    getAllUsers();
  }, []);

  let rows = [];
  rows = users.sort(function (a, b) {
    return b.totalScore - a.totalScore;
  });
  let rank = 0;
  let currentTotalScore = 0;
  for (var i = 0; i < rows.length; i++) {
    if (currentTotalScore === rows[i]['totalScore']) rows[i]['rank'] = rank;
    else {
      rank++;
      rows[i]['rank'] = rank;
      currentTotalScore = rows[i]['totalScore'];
    }
  }
  console.log(rows);

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );

  return (
    <Container className='mt-5'>
      {/* <div className='d-flex align-items-center justify-content-center text-dark'></div> */}
      <h1 className='text-white text-center'>🏆 {monthNow} Leaderboard 🏆</h1>
      <div
        className='d-flex align-items-center justify-content-center text-dark mb-4'
        // style={{ height: '550px' }}
      >
        <Table bordered hover variant='dark'>
          <thead className='text-center'>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {rows.map(({ rank, name, username, totalScore }, index) => (
              <tr key={index}>
                <td>{rank}</td>
                <td>
                  <a
                    href={`/profile/${username}`}
                    style={
                      rank > 3
                        ? { textDecoration: 'none', color: 'inherit' }
                        : { textDecoration: 'none', color: '#FFD700' }
                    }
                  >
                    {rank === 1 && `🥇 ${name}`}
                    {rank === 2 && `🥈 ${name}`}
                    {rank === 3 && `🥉 ${name}`}
                    {rank > 3 && name}
                  </a>
                </td>
                <td>{totalScore}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default LeaderboardPage;
