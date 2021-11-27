import React from 'react';

function ImproveSection(props) {
  return (
    <section
      className='bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start mt-5 '
      id='about'
    >
      <div className='align-items-center'>
        <div>
          <span className='text-center '>
            <h1>
              Improve your<span className='text-primary'> programming </span>
              practice
            </h1>
          </span>
          <p className='lead my-4 text-center'>
            iSyntax.college helps you to learn about Java language.
          </p>

          <div className='container'>
            <div className='row text-center-group'>
              <div className='col-md '>
                <div className='card bg-dark text-light cards'>
                  <div className='card-body text-center'>
                    <div className='img'>
                      <img src='images/checkedJCR.svg' alt='check' />
                    </div>
                    <p className='card-text'>Hone your skills in programming</p>
                  </div>
                </div>
              </div>
              <div className='col-md'>
                <div className='card bg-dark text-light cards'>
                  <div className='card-body text-center'>
                    <div className='img'>
                      <img src='images/leaderboardJCR.svg' alt='lead' />
                    </div>
                    <p className='card-text'>
                      Compete with other students and earn rewards
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md'>
                <div className='card bg-dark text-light cards'>
                  <div className='card-body text-center'>
                    <div className='img'>
                      <img src='images/machine-learningJCR.svg' alt='ml' />
                    </div>
                    <p className='card-text'>
                      Use Artificial Intelligence to analyze your code
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImproveSection;
