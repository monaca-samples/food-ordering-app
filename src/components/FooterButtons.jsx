import '../css/FooterButtons.css';
import React, { Fragment } from 'react';

const FooterButtons = (props) => {
  const getClassName = (id) => ` col button button-raised button-round ${
    id === 'secondaryButton' ? 'button-outline' : 'button-fill'}`;

  return (
    <>
      <div className="buttons_container">
        <a
          {...props.leftButton}
          className={
            props.leftButton.className + getClassName(props.leftButton.id)
          }
          data-transition="f7-cover"
        >
          {props.leftButton.label}
        </a>
        <a
          {...props.rightButton}
          className={getClassName(props.rightButton.id)}
          data-transition="f7-cover"
        >
          {props.rightButton.label}
        </a>
      </div>
    </>
  );
};

export default FooterButtons;
