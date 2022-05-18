import '../css/FoodPage.css';
import React, { useContext } from 'react';
import {
  Page,
  BlockTitle,
  List,
  AccordionContent,
  ListItem,
  Stepper,
} from 'framework7-react';
import { AppContext } from '../components/AppContext';
import FooterButtons from '../components/FooterButtons';
import NavbarBack from '../components/NavbarBack';

const FoodPage = () => {
  // Context variables definition
  const {
    cart,
    setCart,
    totalAmount,
  } = useContext(AppContext);

  // Function for adding items to the cart
  const addItemToCart = (foodItem, category) => {
    const newCartItems = cart[category].map((item) => {
      if (item.name === foodItem.name) {
        item.amount += 1;
      }
      return item;
    });
    setCart({ ...cart, ...{ [category]: newCartItems } });
  };

  // Function for removing items to the cart
  const removeItemFromCart = (foodItem, category) => {
    const newCartItems = cart[category].map((item) => {
      if (item.name === foodItem.name) {
        item.amount = item.amount ? item.amount - 1 : 0;
      }
      return item;
    });
    setCart({ ...cart, ...{ [category]: newCartItems } });
  };

  return (
    <Page name="food">
      <NavbarBack />

      <div className="food_container">
        <h2 className="food_title">
          What would you like
          <br />

          to eat?
        </h2>
        <BlockTitle style={{ textAlign: 'center' }}>TODAY&apos;S MENU</BlockTitle>
        {Object.entries(cart).map(([category, value]) => (
          <List key={category} accordionList inset>
            <ListItem accordionItem title={category}>
              <AccordionContent>
                <List>
                  {value.map((foodItem) => (
                    <ListItem key={foodItem.name} title={foodItem.name}>
                      <Stepper
                        style={{
                          position: 'absolute',
                          right: 100,
                        }}
                        raised
                        small
                        round
                        buttonsOnly
                        onStepperMinusClick={() => removeItemFromCart(foodItem, category)}
                        onStepperPlusClick={() => addItemToCart(foodItem, category)}
                      />
                      {!foodItem.amount ? '' : `${foodItem.amount}x `}
                      {foodItem.price}

                      ¥
                    </ListItem>
                  ))}
                </List>
              </AccordionContent>
            </ListItem>
          </List>
        ))}
        <div className="price">
          <h2 className="total_text">Total: </h2>
          <h2 className="total_amount">

            {totalAmount}

            ¥
          </h2>
        </div>
        <FooterButtons
          leftButton={{
            label: 'Eat-In',
            href: totalAmount ? '/date-time' : '',
            id: totalAmount ? 'primaryButton' : 'disabledPrimaryButton',
          }}
          rightButton={{
            label: 'Delivery',
            href: totalAmount ? '/delivery' : '',
            id: totalAmount ? 'secondaryButton' : 'disabledSecondaryButton',
          }}
        />
      </div>
    </Page>
  );
};

export default FoodPage;
