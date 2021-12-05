import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

function CardComponent(activity) {
  return (
    <Link
      to={`/activity/${activity._id}`}
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
            <Card.Text>
              Due{' '}
              {moment(activity.dueDate)
                .tz('Asia/Manila')
                .format('D MMM, hh:mm A')}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Link>
  );
}

export default CardComponent;
