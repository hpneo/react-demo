import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Student from './Student';
import Students from './Students';

class Body extends Component {
  render() {
    // Usamos `<Switch />` para renderizar diferentes componentes según la ruta elegida (definida en `path`)
    return (
      <Switch>
        <Route path='/students/:id' component={Student} />
        <Route path='/students' component={Students} />
      </Switch>
    );
  }
}

export default Body;
