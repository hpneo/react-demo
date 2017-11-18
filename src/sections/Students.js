import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { fetchStudents, selectStudents } from '../redux/ducks/students';

const floatingActionButtonStyle = {
  position: 'absolute',
  bottom: '2rem',
  right: '2rem',
};

class Students extends Component {
  componentDidMount() {
    this.props.dispatch(fetchStudents());
  }
  render() {
    const { fetching, students } = this.props;

    let componentToRender;

    if (fetching) {
      componentToRender = (
        <TableRow>
          <TableRowColumn>
            <LinearProgress mode='indeterminate' />
          </TableRowColumn>
        </TableRow>
      );
    } else {
      componentToRender = students.map(student => (
        <TableRow key={student.id}>
          <TableRowColumn>{student.first_name}</TableRowColumn>
          <TableRowColumn>{student.last_name}</TableRowColumn>
          <TableRowColumn>{student.email}</TableRowColumn>
        </TableRow>
      ));
    }

    return (
      <div className='app-content'>
        <h1>Alumnos</h1>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Nombre</TableHeaderColumn>
              <TableHeaderColumn>Apellidos</TableHeaderColumn>
              <TableHeaderColumn>E-mail</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              componentToRender
            }
          </TableBody>
        </Table>

        <FloatingActionButton
          style={floatingActionButtonStyle}
          href='/students/new'
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const studentsState = selectStudents(state);

  return {
    students: studentsState.data,
    fetching: studentsState.fetching,
  }
};

export default connect(mapStateToProps)(Students);
