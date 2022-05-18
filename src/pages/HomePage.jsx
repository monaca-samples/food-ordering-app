import '../css/HomePage.css';
import React from 'react';
import { Page } from 'framework7-react';
import FooterButtons from '../components/FooterButtons';

const HomePage = () => (
  <Page name="home">
    <div className="home_container">
      <div className="ramen-img">
        <img src="static/icons/ramen.jpg" alt="ramen" />
      </div>
      <div className="header">
        <h1>
          Welcome to
          <br />
          Pab-Dom
        </h1>
        <div className="logo-img">
          <img src="static/icons/logo_ramen.png" alt="logo_ramen" />
        </div>
        <p>Explore the taste of Japan with us</p>
      </div>
      <FooterButtons
        leftButton={{
          label: 'Menu',
          href: '/food',
          id: 'primaryButton',
        }}
        rightButton={{
          label: 'About Us',
          href: '/about-us',
          id: 'secondaryButton',
        }}
      />
    </div>
  </Page>
);

export default HomePage;
