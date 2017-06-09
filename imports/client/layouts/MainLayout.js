import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Link } from 'react-router-dom';
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});


const MainLayout = ({children}) =>
    <div className='main-layout'>
      <header>
        <h1><Link to='/'>CounterFight</Link></h1>
        <LoginButtons />
        <nav>
          <Link to='/about'>About</Link>
        </nav>
      </header>
      {children}
    </div>

export default MainLayout;
