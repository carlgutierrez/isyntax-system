import React from 'react';

function PointsSection(props) {
  return (
    <div>
      <div className='text-start mb-2'>
        <h2 className='mb-0 text-primary'>Points</h2>
      </div>
      <div className='progress-style1 card border-10 shadow bg-dark card-body'>
        <div className='progress-text'>
          <div className='row'>
            <div className='col-4 fw-bold text-center text-white'>Date</div>
            <div className='col-4 fw-bold text-center text-white'>Points</div>
            <div className='col-4 fw-bold text-center text-white'>Rank</div>
          </div>
        </div>
        {/* <div className='custom-progress progress rounded-3 mb-4'>
          <div
            className='animated custom-bar progress-bar slideInLeft'
            style={{ width: '80%' }}
            aria-valuemax='100'
            aria-valuemin='0'
            aria-valuenow='10'
            role='progressbar'
          ></div>
        </div> */}
        <div className='row'>
          <div className='col-4 text-center text-white'>October 2021</div>
          <div className='col-4 text-center text-white'>6969</div>
          <div className='col-4 text-center text-white'> 15 / 50</div>
        </div>
        <div className='row'>
          <div className='col-4 text-center text-white'>November 2021</div>
          <div className='col-4 text-center text-white'>10000</div>
          <div className='col-4 text-center text-white'> 5 / 61</div>
        </div>
      </div>
    </div>
  );
}

export default PointsSection;
