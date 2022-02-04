import React from 'react';

function NoviceSection(props) {
  return (
    <section className='bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start mt-5'>
      <div className='container'>
        <div className='align-items-center'>
          <div>
            <span className='text-center '>
              <h1>
                From<span className='text-primary'> Novice </span>to
                <span className='text-primary'> Expert</span>
              </h1>
            </span>
            <p className='lead my-4 text-center'>
              Begin tracking progress with the coding heatmap on the profile
              page, which depicts previous and prospective coding efforts.
              (coming soon)
            </p>
            <div className='text-center'>
              <img
                src='images/cal-heatmap-blank.PNG'
                className='img-fluid m-3'
                alt='heatmap-blank'
              />
              <img
                src='images/cal-heatmap-data.PNG'
                className='img-fluid m-3'
                alt='heatmap-data'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoviceSection;
