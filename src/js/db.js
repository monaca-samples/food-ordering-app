import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore/lite';

import { getStorage, ref, uploadString } from 'firebase/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
let starter = [];
let main = [];
let dessert = [];
let beverage = [];

async function getMenu(database) {
  const menuCol = collection(database, 'menu');
  const menuSnapshot = await getDocs(menuCol);
  const menu = menuSnapshot.docs.map((document) => document.data());
  return menu;
}

const getDatabase = () => {
  starter = [];
  main = [];
  dessert = [];
  beverage = [];

  getMenu(db).then((menu) => {
    menu.map((m) => {
      switch (m.category) {
        case 'starter':
          starter.push(m);
          break;
        case 'main':
          main.push(m);
          break;
        case 'dessert':
          dessert.push(m);
          break;
        case 'beverage':
          beverage.push(m);
          break;
        default:
          break;
      }
    });
  });
};

const createMenuDict = () => {
  getDatabase();

  return {
    Starter: starter,
    Main: main,
    Dessert: dessert,
    Beverage: beverage,
  };
};

const createDate = (date) => {
  setDoc(doc(db, 'reservations', date), {
    times_available: {
      11: [1, 2, 3, 4, 5, 6],
      12: [1, 2, 3, 4, 5, 6],
      13: [1, 2, 3, 4, 5, 6],
      14: [1, 2, 3, 4, 5, 6],
      15: [1, 2, 3, 4, 5, 6],
      16: [1, 2, 3, 4, 5, 6],
      17: [1, 2, 3, 4, 5, 6],
      18: [1, 2, 3, 4, 5, 6],
      19: [1, 2, 3, 4, 5, 6],
      20: [1, 2, 3, 4, 5, 6],
      21: [1, 2, 3, 4, 5, 6],
      22: [1, 2, 3, 4, 5, 6],
    },
    times_booked: {
      11: [],
      12: [],
      13: [],
      14: [],
      15: [],
      16: [],
      17: [],
      18: [],
      19: [],
      20: [],
      21: [],
      22: [],
    },
  });
};

const checkTimeValidForDate = (docSnap, time) => {
  const timeShort = time.split(':')[0];
  if (docSnap.data().times_available[timeShort].length !== 0) {
    return true;
  }
  return false;
};

const getTableAvailability = async (dateTime) => {
  const docRef = doc(db, 'reservations', dateTime.date);
  const tables = await getDoc(docRef).then(async (docSnap) => {
    const timeShort = dateTime.time.split(':')[0];
    const availableTables = await docSnap.data().times_available[timeShort];
    return availableTables;
  });
  return tables;
};

const checkDateTime = async (date, time) => {
  const docRef = doc(db, 'reservations', date);
  const check = await getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      return checkTimeValidForDate(docSnap, time);
    }
    createDate(date);
    return true;
  });
  return check;
};

const addCustomerInfo = (userInfo) => {
  setDoc(doc(db, 'customer_info', userInfo.email), {
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    location: userInfo.location,
  });
};

const addReservation = async (
  dateTime,
  table,
  food,
  userInfo,
  orderNumber,
  photo,
) => {
  if (userInfo.location === '') {
    const getDate = doc(db, 'reservations', dateTime.date);

    // get the available times and change the time
    const info = await getDoc(getDate).then((docSnap) => docSnap);
    const timesAvailable = await info.data().times_available;
    const timesBooked = await info.data().times_booked;

    const timeShort = dateTime.time.split(':')[0];

    timesBooked[timeShort] = timesAvailable[timeShort].splice(
      timesAvailable[timeShort].indexOf(table),
      1,
    );

    // date and time done

    // set everywhere

    updateDoc(getDate, {
      times_available: timesAvailable,
      times_booked: timesBooked,
    });
  }

  addCustomerInfo(userInfo);

  const currentDate = new Date().toString().split(' ').splice(1, 3)
    .join(' ');
  let photoBD;

  const metadata = {
    contentType: 'image/jpeg',
  };

  if (photo !== undefined) {
    photoBD = true;
    uploadString(
      ref(storage, `photos/${orderNumber}.jpg`),
      photo,
      'base64',
      metadata,
    ).then(() => {});
  } else {
    photoBD = false;
  }

  setDoc(doc(db, 'orders', `${currentDate} ${orderNumber.toString()}`), {
    food,
    user: userInfo.email,
    photo: photoBD,
  });
};

const checkOrderNumber = async (orderNumber) => {
  const docRef = doc(db, 'orders', orderNumber.toString());
  const check = await getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      return true;
    }
    return false;
  });
  return check;
};

// Returns new order number that is not already in database
const getOrderNumber = async () => {
  let orderNumber;
  do {
    orderNumber = Math.floor(Math.random() * 10001);
  } while (await checkOrderNumber(orderNumber));
  return orderNumber;
};

export {
  createMenuDict,
  checkDateTime,
  addCustomerInfo,
  getTableAvailability,
  addReservation,
  getOrderNumber,
};
