import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
// import moment from 'moment';

function CardComponent(activity) {
  const dueDate =
    activity.dueDate === 'noDueDate'
      ? 'No due date'
      : `Due ${moment(activity.dueDate)
          .tz('Africa/Abidjan')
          .format('D MMM, hh:mm A')}`;
  return (
    // <Link
    //   to={`/activity/${activity._id}`}
    //   style={{ textDecoration: 'none' }}
    //   className='text-dark'
    // >
    <a
      href={`/activity/${activity._id}`}
      style={{ textDecoration: 'none' }}
      className='text-dark'
    >
      <Col>
        <Card className='cards'>
          <Card.Body className='text-center'>
            <Card.Title className='fs-4'>{activity.title}</Card.Title>
            <Card.Text className='text-muted'>
              {activity.postedBy},{' '}
              {moment(activity.dateCreated).tz('Asia/Manila').format('D MMM')}
            </Card.Text>
            <Card.Text className='fs-6 text-muted'>
              {activity.items} items
            </Card.Text>
            <hr />
            <Card.Text>{dueDate}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </a>
  );
}

export default CardComponent;
