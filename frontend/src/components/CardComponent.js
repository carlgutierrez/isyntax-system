import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CardComponent({ _id, title, items, dueDate, dateCreated, postedBy }) {
  return (
    <Link
      to={`/activity/${_id}`}
      style={{ textDecoration: 'none' }}
      className='text-dark'
    >
      <Col>
        <Card className='cards'>
          <Card.Body className='text-center'>
            <Card.Title className='fs-4'>{title}</Card.Title>
            <Card.Text className='text-muted'>
              {postedBy}, {dateCreated}
            </Card.Text>
            <Card.Text className='fs-6 text-muted'>{items} items</Card.Text>
            <hr />
            <Card.Text>Due {dueDate}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Link>
  );
}

export default CardComponent;
