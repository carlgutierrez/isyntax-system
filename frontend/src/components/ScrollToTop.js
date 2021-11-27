import React from 'react';

const ScrollToTop = () => {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div onClick={scrollUp} className='scrollToTop'>
      <img
        src='images/scroll-top.svg'
        alt='scroll-to-top'
        width='26px'
        height='26px'
      />
    </div>
  );
};

export default ScrollToTop;
