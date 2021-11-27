import React from 'react';

function DesignSection(props) {
  return (
    <section
      className='bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start mt-5'
      id='mission'
    >
      <div className='container'>
        <div className='align-items-center'>
          <div>
            <span className='text-center '>
              <h1>
                Designed for<span className='text-primary'> students </span>and
                <span className='text-primary'> instructors</span>
              </h1>
            </span>
            <p className='lead my-4 text-center'>
              iSyntax.college is an educational tool for programming courses.
              Students can test and analyze their code using built-in compiler.
              Instructors can supervise their students.
            </p>

            <div className='container px-4'>
              <div className='row gx-10'>
                <div className='col'>
                  <p className='lead my-0 '>
                    Features for students
                    <ul className='FeaturesStudents-group'>
                      <li className='FeaturesStudents-group-item'>
                        Enroll in your instructor's courses
                      </li>
                      <li className='FeaturesStudents-group-item'>
                        Solve programming problems
                      </li>
                      <li className='FeaturesStudents-group-item'>
                        Get instant feedback on your solutions
                      </li>
                      <li className='FeaturesStudents-group-item'>
                        Enhance your skills in Java programming language
                      </li>
                      <li className='FeaturesStudents-group-item'>
                        Earn rewards and badges by competing with other students
                      </li>
                    </ul>
                  </p>
                </div>
                <div className='col'>
                  <p className='lead my-0 '>
                    Features for instructors
                    <ul className='FeaturesTeacher-group'>
                      <li className='FeaturesTeacher-group-item'>
                        Automated Assessment
                      </li>
                      <li className='FeaturesTeacher-group-item'>
                        Create your own problems
                      </li>
                      <li className='FeaturesTeacher-group-item'>
                        Manage and track the progress of your students
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignSection;
