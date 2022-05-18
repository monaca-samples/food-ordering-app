import '../css/DateTimePage.css';
import React, { useEffect, useState, useContext } from 'react';
import {
  f7, List, ListInput, Page,
} from 'framework7-react';
import FooterButtons from '../components/FooterButtons';
import { AppContext } from '../components/AppContext';
import { checkDateTime } from '../js/db';
import NavbarBack from '../components/NavbarBack';

const DateTimePage = () => {
  // Context variables definition
  const {
    dateTime,
    setDateTime,
    userInfo,
    setUserInfo,
  } = useContext(AppContext);

  // Variable definition
  const today = new Date();
  const minutes = today.getMinutes();

  // State variables definition
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [validTime, setValidTime] = useState(false);
  const [customerName, setCustomerName] = useState(
    userInfo ? userInfo.name : '',
  );
  const [customerEmail, setCustomerEmail] = useState(
    userInfo ? userInfo.email : '',
  );
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  // Round the time to o'clock function
  if (minutes < 30) {
    today.setMinutes = 30;
  } else if (minutes >= 30) {
    today.setMinutes = 0;
    today.setHours = today.getHours + 1;
  }

  // Set the dateTime from context if necessary
  if (!(Object.keys(dateTime).length === 0)) {
    if (
      new Date(dateTime.date).toLocaleDateString('es-ES', {
        month: '2-digit',
        year: 'numeric',
        day: '2-digit',
      }) !== selectedDate
    ) {
      setSelectedDate(
        new Date(dateTime.date).toLocaleDateString('es-ES', {
          month: '2-digit',
          year: 'numeric',
          day: '2-digit',
        }),
      );
    }
    if (dateTime.time !== selectedTime) {
      setSelectedTime(dateTime.time);
    }
  }

  // Function for sending the contact info to the context
  const sendContactInfoToContext = () => {
    setUserInfo({
      name: customerName,
      email: customerEmail,
      phone: '',
      location: '',
    });
  };

  const split = (date) => {
    const dateSplit = date.split('/');
    return `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`;
  };

  // UseEffect for checking if the date and time are valid
  useEffect(() => {
    if (selectedDate && selectedTime && validTime) {
      const date = new Date(split(selectedDate)).toDateString();
      checkDateTime(date, selectedTime).then((result) => {
        if (result) {
          setDateTime({ date, time: selectedTime });
        } else {
          const toastCenter = f7.toast.create({
            text: 'Sorry! There are not empty tables in selected date and time. Please choose another one.',
            closeTimeout: 3000,
          });
          toastCenter.open();
          setValidTime(false);
        }
      });
    }
  }, [validTime]);

  // UseEffect for sending the contact info to the context when the email changes
  useEffect(() => {
    if (nameValid && emailValid) {
      sendContactInfoToContext();
    }
  }, [emailValid]);

  // UseEffect for sending the contact info to the context when the name changes
  useEffect(() => {
    if (nameValid && emailValid) {
      sendContactInfoToContext();
    }
  }, [nameValid]);

  return (
    <Page name="date-time">
      <NavbarBack />
      <div className="dateTime_container">
        <h2 className="dateTime_title">
          When would you like
          <br />

          to come?
        </h2>
        <List inset>
          <ListInput
            className="input_datetime"
            label="Select your date"
            type="datepicker"
            placeholder="Select your date"
            id="dateInput"
            validate
            required
            //  value={selectedDate ? [new Date(split(selectedDate))] : []}
            calendarParams={{ minDate: today }}
            onInputNotEmpty={(e) => {
              if (
                selectedDate === undefined
                || (selectedDate !== undefined && e.target.value !== selectedDate)
              ) {
                setSelectedDate(e.target.value);
              }
            }}
          />
          <ListInput
            className="input_datetime"
            label="Select your time"
            type="time"
            step="3600"
            id="timeInput"
            required
            min="11:00"
            max="22:30"
            value={selectedTime || ''}
            placeholder="Select your time"
            validate
            onInput={(e) => setSelectedTime(e.target.value)}
            onValidate={(isValid) => setValidTime(isValid)}
          />
        </List>
        <h2 className="contact_title">
          Please tell us your
          <br />

          name and email
        </h2>
        <List inset className="user_info_list">
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
        </List>

        <FooterButtons
          leftButton={{
            label: 'Back',
            href: '/food/',
            id: 'secondaryButton',
            className: 'back',
          }}
          rightButton={{
            label: 'Next',
            id:
              selectedDate
              && selectedTime
              && validTime
              && nameValid
              && emailValid
                ? 'primaryButton'
                : 'disabledPrimaryButton',
            href:
              selectedDate
              && selectedTime
              && validTime
              && nameValid
              && emailValid
                ? '/table/'
                : '',
          }}
        />
      </div>
    </Page>
  );
};

export default DateTimePage;
