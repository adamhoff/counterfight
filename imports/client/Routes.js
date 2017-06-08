import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { render } from 'react-dom';

import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import App from './App';

Meteor.startup(() => {
  render(
    <Router>
      <MainLayout>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/:id" component={App} />
      </MainLayout>
    </Router>,
    document.getElementById('render-target')
  );
});
