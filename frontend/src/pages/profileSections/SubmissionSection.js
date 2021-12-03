import React from 'react';
import { Image } from 'react-bootstrap';

function SubmissionSection(props) {
  return (
    <div className='mb-3 wow fadeIn'>
      <div className='text-start mb-1-6 wow fadeIn'>
        <h2 className='mb-2 text-primary'>Submissions</h2>
        <div className='text-center card border-10 shadow bg-dark card-body'>
          <Image
            src='/images/cal-heatmap-data.PNG'
            className='img-fluid m-3'
            alt='heatmap-blank'
          />
        </div>
      </div>
    </div>
  );
}

export default SubmissionSection;
