import '../css/TablePicker.css';
import React, { useContext, useEffect, useState } from 'react';
import { Page, f7 } from 'framework7-react';
import { Camera } from 'framework7-icons/react';
import FooterButtons from '../components/FooterButtons';
import Table from '../components/table';
import { getTableAvailability } from '../js/db';
import { AppContext } from '../components/AppContext';
import NavbarBack from '../components/NavbarBack';

const TablePickerPage = () => {
  // Context variables definition
  const {
    dateTime,
    table,
    setTable,
    setPhoto,
  } = useContext(AppContext);

  // State variables definition
  const [tablesAvailable, setTablesAvailable] = useState([]);
  const [selectedTable, setSelectedTable] = useState();

  // Table set if needed
  const disableReservedTables = async () => {
    if (table) {
      if (table !== selectedTable) {
        await setSelectedTable(table);
        setTable(null);
      }
    }
  };

  // UseEffect for rendering anytime the tables available change
  useEffect(() => {}, [tablesAvailable]);

  // UseEffect for selecting a table
  useEffect(() => {
    disableReservedTables();
  }, []);

  // UseEffect for getting and setting the tables available
  useEffect(() => {
    getTableAvailability(dateTime).then((tables) => {
      setTablesAvailable(tables);
    });
  }, []);

  // Function for taking the photo
  function takePhoto() {
    navigator.camera.getPicture(
      (imageURI) => {
        // Photo took successfully
        setPhoto(imageURI);
        f7.dialog.alert('The picture will be saved after finishing your order.', 'Picture Taken Successfully');
      },
      (error) => {
        // Error while taking the photo
        f7.dialog.alert('Try again please.', 'Taking of picture failed');
        console.error(error);
      },
      {
        destinationType: 0,
      },
    );
  }

  return (
    <Page name="table-picker">
      <NavbarBack />
      <div className="table_picker_container">
        <h2 className="table_picker_title">
          Where would you
          <br />
          like to sit?
        </h2>
        <div id="tables">
          <div className="row">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTable(1)}
              className={
                tablesAvailable.includes(1)
                  ? selectedTable === 1
                    ? 'col-33 selected'
                    : 'col-33'
                  : 'col-33 table_disabled'
              }
            >
              <Table number="1" />
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTable(2)}
              className={
                tablesAvailable.includes(2)
                  ? selectedTable === 2
                    ? 'col-33 selected'
                    : 'col-33'
                  : 'col-33 table_disabled'
              }
            >
              <Table number="2" />
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTable(3)}
              className={
                tablesAvailable.includes(3)
                  ? selectedTable === 3
                    ? 'col-33 selected'
                    : 'col-33'
                  : 'col-33 table_disabled'
              }
            >
              <Table number="3" />
            </div>
          </div>
          <div className="row">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTable(4)}
              className={
                tablesAvailable.includes(4)
                  ? selectedTable === 4
                    ? 'col-33 selected'
                    : 'col-33'
                  : 'col-33 table_disabled'
              }
            >
              <Table number="4" />
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTable(5)}
              className={
                tablesAvailable.includes(5)
                  ? selectedTable === 5
                    ? 'col-33 selected'
                    : 'col-33'
                  : 'col-33 table_disabled'
              }
            >
              <Table number="5" />
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTable(6)}
              className={
                tablesAvailable.includes(6)
                  ? selectedTable === 6
                    ? 'col-33 selected'
                    : 'col-33'
                  : 'col-33 table_disabled'
              }
            >
              <Table number="6" />
            </div>
          </div>
        </div>
        <div className="camera_container">
          <h2 className="table_picker_title">Take a picture</h2>

          <Camera onClick={takePhoto} style={{ fontSize: 50 }} />
          <p>This picture will be used to recognize you on your arrival.</p>
        </div>

        <FooterButtons
          leftButton={{
            label: 'Back',
            href: '/date-time/',
            id: 'secondaryButton',
            className: 'back',
          }}
          rightButton={{
            label: 'Next',
            onClick: () => setTable(selectedTable),
            id: selectedTable ? 'primaryButton' : 'disabledPrimaryButton',
            href: selectedTable ? '/payment/' : '',
          }}
        />
      </div>
    </Page>
  );
};

export default TablePickerPage;
