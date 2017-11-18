import React, { Component } from 'react';
import { reduxForm, Field, submit } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const required = value =>
value ? undefined : 'Debe ingresar un valor';

const email = value =>
/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? undefined : 'Debe ingresar un correo con formato correcto';

class NewStudentForm extends Component {
  render() {
    const { dispatch, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name='first_name'
          label='Nombres'
          component={renderTextField}
          validate={required}
        />
        <br />
        <Field
          name='last_name'
          label='Apellidos'
          component={renderTextField}
          validate={required}
        />
        <br />
        <Field
          name='email'
          label='E-mail'
          component={renderTextField}
          type='email'
          validate={[required, email]}
        />
        <br />
        <RaisedButton
          primary
          label='Enviar'
          onClick={() => dispatch(submit('new-student'))}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'new-student',
})(NewStudentForm);
