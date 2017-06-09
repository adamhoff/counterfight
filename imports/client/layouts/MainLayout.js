import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});


const MainLayout = ({children}) =>
    <div className='main-layout'>
      <header>
        <ReactCSSTransitionGroup
          transitionName='layout'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={300}>
        <h1><Link to='/'>CounterFight</Link></h1>
        <hr></hr>
        <LoginButtons />
        <nav>
          <Link to='/about'>About</Link>
        </nav>
      </ReactCSSTransitionGroup>
      </header>
      {children}
    </div>

export default MainLayout;
