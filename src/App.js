import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import PeopleIcon from 'material-ui/svg-icons/social/people';

import Body from './sections/Body';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='app'>
          <AppBar title='App Title' />
          <div className='body'>
            {/* Con `containerStyle` sobreescribimos estilos del component. `position: null` para evitar que se monte encima del `AppBar` */}
            <Drawer open containerStyle={{ position: null }}>
              <MenuItem
                containerElement={<Link to='/students' />}
                leftIcon={<PeopleIcon />}
                primaryText='Alumnos'
              />
            </Drawer>
            <Body />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
