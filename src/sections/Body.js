import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Student from './Student';
import NewStudent from './NewStudent';
import Students from './Students';
import NotFound from './NotFound';

class Body extends Component {
  render() {
    // Usamos `<Switch />` para renderizar diferentes componentes según la ruta elegida (definida en `path`)
    return (
      <Switch>
        <Route path='/students/new' exact component={NewStudent} />
        <Route path='/students/:id' exact component={Student} />
        <Route path='/students' exact component={Students} />
        <Route path='/*' component={NotFound} />
      </Switch>
    );
  }
}

export default Body;
