import React from 'react';

function ContactSection(props) {
  return (
    <section
      className='bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start mt-5 '
      id='contact'
    >
      <div className='container'>
        <div className='row bg-dark p-4'>
          <div className='container'>
            <p className='lead my-0'>
              <h1 className='font-weight-bold text-center'>
                <span className='text-primary'>Contact Form</span>
              </h1>
            </p>
            <p className='lead my-4 text-center'>
              Feel free to contact us if you have any problems or suggestions.
              We will try to respond to you as soon as possible.
            </p>
          </div>
          <form>
            <div className='form-group row mx-5'>
              <div className='col-sm-2 mb-3'>
                <label for='InputName'>Name:</label>
                <input
                  className='form-control mt-2 inputs'
                  type='text'
                  placeholder='Your Name'
                  id='name'
                  required
                />
              </div>
              <div className='col-sm-3 mb-3'>
                <label for='InputEmail'>Email:</label>
                <input
                  className='form-control mt-2 inputs'
                  type='email'
                  placeholder='Your Email'
                  id='email'
                  required
                />
              </div>
              <div className='mb-3'>
                <div className='form-group'>
                  <label for='comment'>Message:</label>
                  <textarea
                    className='form-control mt-2 inputs'
                    rows='8'
                    id='comment'
                    placeholder='Your Message'
                    required
                  ></textarea>
                </div>
              </div>
              <div className='form-group'>
                <button type='button' className='btn btn-primary pull-right'>
                  <span className='fas fa-send'></span> Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
