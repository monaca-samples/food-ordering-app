import Gear from 'framework7-icons/react/cjs/Gear';
import {
  Button, Navbar, NavLeft, NavRight,
} from 'framework7-react';
import React from 'react';
import '../css/NavbarBack.css';
import Settings from './Settings';

const NavbarBack = () => (
  <div className="navbar_back_container">
    <Navbar transparent="true">
      <NavLeft backLink="Back" />
      <NavRight>
        <Settings />
        <Button sheetOpen=".settings-sheet" className="button_settings">
          <Gear style={{ fontSize: '25px', color: '#591303' }} />
        </Button>
      </NavRight>
    </Navbar>
  </div>
);

export default NavbarBack;
