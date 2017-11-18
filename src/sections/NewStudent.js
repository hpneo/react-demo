import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewStudentForm from '../components/NewStudentForm';
import { createStudent } from '../redux/ducks/newStudent';

class NewStudent extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <div className='app-content'>
        <h1>Ingresar alumno</h1>

        <NewStudentForm onSubmit={data => dispatch(createStudent(data))} />
      </div>
    );
  }
}

export default connect()(NewStudent);
