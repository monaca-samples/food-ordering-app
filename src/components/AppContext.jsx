import React, { useState, createContext, useEffect } from 'react';
import { createMenuDict } from '../js/db';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // State variable definition
  const [cart, setCart] = useState(() => createMenuDict()); // Initialise cart
  const [totalAmount, setTotalAmount] = useState(0); // Total amount
  const [dateTime, setDateTime] = useState({}); // Date and time selected
  const [table, setTable] = useState(); // Table selected
  const [photo, setPhoto] = useState(); // Photo
  const [userInfo, setUserInfo] = useState(); // User info
  const [orderNumber, setOrderNumber] = useState(); // Order number

  // UseEffect for updating the cart
  useEffect(() => {
    let newTotal = 0;

    Object.values(cart).map((value) => {
      value.forEach((item) => {
        newTotal += item.price * item.amount;
      });
    });

    setTotalAmount(newTotal);
  }, [cart]);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        totalAmount,
        dateTime,
        setDateTime,
        table,
        setTable,
        userInfo,
        setUserInfo,
        photo,
        setPhoto,
        orderNumber,
        setOrderNumber,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
