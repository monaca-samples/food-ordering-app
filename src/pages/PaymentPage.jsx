import React, { useState, useContext, useEffect } from 'react';
import { f7, Page } from 'framework7-react';
import StripeCheckout from 'react-stripe-checkout';
import '../css/PaymentPage.css';
import { CreditcardFill, WalletFill } from 'framework7-icons/react';
import { AppContext } from '../components/AppContext';
import NavbarBack from '../components/NavbarBack';
import { addReservation, getOrderNumber } from '../js/db';

const PaymentPage = () => {
  const {
    cart,
    totalAmount,
    dateTime,
    table,
    userInfo,
    photo,
    orderNumber,
    setOrderNumber,
  } = useContext(AppContext);
  const [selectedPayment, setSelectedPayment] = useState('');
  
  useEffect(async () => {
    setOrderNumber(await getOrderNumber());
  }, []);
  
  // Public key to communicate with Stripe backend
  const publicKey = 'pk_test_51KKp2ELu2ivq6gwie31icN77AAYhId9s1eC3DtwxJHYQ0LObDPGHNmD62SqYyl7VY7uCYdkFWiT2Y83jJGpvmkMk00Nnz5rDXv';
  
  // Filtering only ordered items from cart
  const showOrderedItems = Object.values(cart)
    .flatMap((item) => item)
    .filter((item) => !!item.amount);

  // Creating reservation in database after clicking on Pay
  const submitOrderToDB = () => {
    addReservation(
      dateTime,
      table,
      showOrderedItems,
      userInfo,
      orderNumber,
      photo,
    );
  };

  const handleTokenWithBackend = async (token) => {
    const order = { orderNumber, price: totalAmount };

    f7.dialog.preloader('Processing your payment');
    const response = await fetch(
      'https://restaurant-management-backend.herokuapp.com/checkout',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, order }),
      },
    ).then((res) => {
      f7.dialog.close();
      return res.json();
    });

    if (response.status === 'success') {
      submitOrderToDB();
      f7.dialog.alert('Click OK to continue.', 'Payment successfull', () => {
        f7.views.current.router.navigate('/summary');
      });
    } else {
      f7.dialog.alert('Try it again.', 'Payment unsuccessfull');
    }
  };

  return (
    <Page name="payment">
      <NavbarBack />
      <div className="payment_container">
        <h2 className="payment_title">Ordered items</h2>
        <div className="order_table">
          <div className="data-table card">
            <table>
              <thead>
                <tr>
                  <th className="label-cell">Ordered Items</th>
                  <th className="numeric-cell">Amount</th>
                  <th className="numeric-cell">Price</th>
                </tr>
              </thead>
              <tbody>
                {showOrderedItems.map((item) => (
                  <tr key={item.name}>
                    <td className="label-cell">{item.name}</td>
                    <td className="numeric-cell">{item.amount}</td>
                    <td className="numeric-cell">
                      {item.price}

                      ¥
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="price">
          <h2 className="total_text">Total: </h2>
          <h2 className="total_amount">

            {totalAmount}

            ¥
          </h2>
        </div>

        <div className="payment_option_container">
          <p className="payment_info_paragraph">
            Please choose your preffered way of payment.
          </p>
          <div
            role="button"
            tabIndex={0}
            className={
              `payment_option${selectedPayment === 'card' ? ' selected' : ''}`
            }
            onClick={() => setSelectedPayment('card')}
          >
            <p>Pay with Card</p>
            <CreditcardFill
              style={{ fontSize: '28px', padding: '12px 14px 0 0' }}
            />
          </div>
          <div
            role="button"
            tabIndex={0}
            className={
              `payment_option${selectedPayment === 'cash' ? ' selected' : ''}`
            }
            onClick={() => setSelectedPayment('cash')}
          >
            <p>Pay with Cash</p>
            <WalletFill
              style={{ fontSize: '28px', padding: '12px 14px 0 0' }}
            />
          </div>
        </div>

        <div className="bottom_buttons">
          {selectedPayment === 'cash' ? (
            <a
              href="/summary"
              className="col button button-raised button-round button-outline"
              id="pay_button"
              onClick={submitOrderToDB}
            >
              Pay
              {' '}
              {totalAmount}
              ¥
            </a>
          ) : (
            <StripeCheckout
              label={`Pay ${totalAmount}¥`}
              disabled={!selectedPayment}
              stripeKey={publicKey}
              token={handleTokenWithBackend}
              amount={totalAmount}
              name={`PabDom Order n. ${orderNumber}`}
              currency="JPY"
              triggerEvent="onClick"
            />
          )}
          <a
            href="/food"
            className="col button button-raised button-round button-outline"
            id="menu_button"
          >
            Back to Menu
          </a>
        </div>
      </div>
    </Page>
  );
};
export default PaymentPage;
