import '../css/ContactInfo.css';
import React, { useState, useContext } from 'react';
import {
  f7, List, ListInput, Page,
} from 'framework7-react';
import { LocationFill } from 'framework7-icons/react';
import FooterButtons from '../components/FooterButtons';
import NavbarBack from '../components/NavbarBack';
import { AppContext } from '../components/AppContext';

function ContactInfo() {
  const {
    userInfo,
    setUserInfo,
  } = useContext(AppContext);

  // If userInfo already exists in context, it will be initialized
  const [customerName, setCustomerName] = useState(
    userInfo ? userInfo.name : '',
  );
  const [customerEmail, setCustomerEmail] = useState(
    userInfo ? userInfo.email : '',
  );
  const [customerPhone, setCustomerPhone] = useState(
    userInfo ? userInfo.phone : '',
  );
  const [customerCity, setCustomerCity] = useState(
    userInfo ? userInfo.location : '',
  );
  //  Need all three separately to not overwrite validity
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);

  // Sending the contact info to the context
  const sendContactInfoToContext = () => {
    setUserInfo({
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      location: customerCity,
    });
  };

  // Getting the GPS position using the cordova plugin
  const getGPSPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        f7.dialog.preloader('Acquiring GPS Location');
        //  Reset of customerCity in case the user clicks it second time
        setCustomerCity();
        f7.dialog.close();
        setCustomerCity(position.coords.latitude + ', ' + position.coords.longitude);
        f7.dialog.alert(
          `Your location: ${position.coords.latitude + ', ' + position.coords.longitude}`,
          'GPS Location Acquired',
        );
      },
      (error) => {
        f7.dialog.alert('Try again please.', 'Acquiring Location Failed');
        console.error(error);
      },
    );
  };

  return (
    <Page name="contact">
      <NavbarBack />
      <div className="contact_container">
        <h2 className="contact_title">
          Where should we
          <br />

          deliver your order?
        </h2>
        <List inset>
          <ListInput
            type="text"
            placeholder="Name"
            required
            validate
            value={customerName || ''}
            onChange={(e) => setCustomerName(e.target.value)}
            onValidate={(isValid) => setNameValid(isValid)}
          />
          <ListInput
            type="email"
            placeholder="E-mail"
            required
            validate
            value={customerEmail || ''}
            onChange={(e) => setCustomerEmail(e.target.value)}
            onValidate={(isValid) => setEmailValid(isValid)}
          />
          <ListInput
            tyle="number"
            placeholder="Phone Number"
            required
            validate
            pattern="[0-9]*"
            value={customerPhone || ''}
            onChange={(e) => setCustomerPhone(e.target.value)}
            onValidate={(isValid) => setPhoneValid(isValid)}
          />
        </List>

        <div className="location_container">
          <h2 className="location_title">
            Share a location
            <br />
          </h2>

          <LocationFill onClick={getGPSPosition} style={{ fontSize: 38 }} />

          <p className="location_info_paragraph">
            Click the arrow to share your current location. This location will
            be used as delivery address.
          </p>
        </div>

        <FooterButtons
          leftButton={{
            label: 'Back',
            href: '/food/',
            id: 'secondaryButton',
            className: 'back',
          }}
          rightButton={{
            label: 'Next',
            onClick: sendContactInfoToContext,
            id:
              customerName
              && customerPhone
              && customerEmail
              && customerCity
              && nameValid
              && emailValid
              && phoneValid
                ? 'primaryButton'
                : 'disabledPrimaryButton',

            href:
              customerName
              && customerPhone
              && customerEmail
              && customerCity
              && nameValid
              && emailValid
              && phoneValid
                ? '/payment/'
                : '',
          }}
        />
      </div>
    </Page>
  );
}

export default ContactInfo;
