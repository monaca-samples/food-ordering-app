import '../css/AboutUsPage.css';
import React from 'react';
import { Page } from 'framework7-react';
import { HouseFill } from 'framework7-icons/react';
import NavbarBack from '../components/NavbarBack';

const AboutUsPage = () => (
  <Page name="about-us">
    <NavbarBack />
    <p className="about">
      <span>
        <strong>About:</strong>
      </span>
      <span>
        We are European based Asian restaurant with over 50 branches in
        countries like Austria, France, Norway, Belgium...
      </span>
      <span>
        All our chiefs have long term experience in their field, and we make
        sure to choose only the best quality ingredients to satisfy our
        customers.
      </span>

      <span className="second">
        <strong>Contact - Main Branch:</strong>
      </span>
      <span>
        Pab-Dom Restaurant
        <br />
        46 Rue Bonneterie
        <br />
        75009 Paris, France
      </span>
      <span className="second">
        <strong>Opening hours:</strong>
      </span>
      <span>11:00 - 23:00 - Every day</span>

      <span className="bottom">
        Created by Asial Corporation
        <br />
        App Version: 1.0.0
      </span>
    </p>
    <a
      href="/"
      className="about_button col button button-fill button-round back"
    >
      <HouseFill style={{ margin: '0 10px 2px 0', fontSize: '17px' }} />
      Back to Home
    </a>
  </Page>
);

export default AboutUsPage;
