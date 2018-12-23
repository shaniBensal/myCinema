import React, { Component } from 'react';
import Routes from './Routes';
import { HashRouter as Router } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faInfo, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faEdit, faInfo, faSearch, faPlus)

class App extends Component {
  render() {
    return (
      <Router>
          <React.Fragment>
            <Routes />
          </React.Fragment>
        </Router>
    );
  }
}

export default App;
