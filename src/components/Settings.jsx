/* eslint-disable no-undef */
import {
  BlockTitle,
  f7,
  List,
  ListItem,
  Sheet,
  Toggle,
} from 'framework7-react';
import React, { useEffect, useState } from 'react';
import '../css/Settings.css';

const Settings = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const [camera, setCamera] = useState(false);
    const [location, setLocation] = useState(false);

    const isPermissionGranted = (status) => {
      if (status && (status === cordova.plugins.diagnostic.permissionStatus.GRANTED || status === cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE)) {
        return true;
      }
      return false;
    };


    useEffect(() => {
      // Check Camera permission
      cordova.plugins.diagnostic.getCameraAuthorizationStatus({
        successCallback: function (status) {
          if (isPermissionGranted(status)) {
            setCamera(true);
          } else {
            setCamera(false);
          }
        },
        errorCallback: function (error) {
          console.log(error);
        },
        externalStorage: false
      });
      // Check Location permission
      cordova.plugins.diagnostic.getLocationAuthorizationStatus(function (status) {
        if (isPermissionGranted(status)) {
          setLocation(true);
        } else {
          setLocation(false);
        }
      }, function (error) {
        console.error(error);
      });
    });
  

    const checkCameraAccess = () => {
      cordova.plugins.diagnostic.requestCameraAuthorization({
        successCallback: function (status) {
          const isGranted = isPermissionGranted(status);
          const message = "Authorization request for camera use was " + (isGranted ? "granted" : "denied") + ". If you would like to change, change it from the phone settings.";
          f7.dialog.alert(message);
        },
        errorCallback: function (error) {
          f7.dialog.alert(error);
        },
        externalStorage: false
      });
    };

    const checkLocationAccess = () => {
      cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
        const isGranted = isPermissionGranted(status);
        const message = "Authorization request for location use was " + (isGranted ? "granted" : "denied") + ". If you would like to change, change it from the phone settings.";
        f7.dialog.alert(message);
      }, function (error) {
        console.error(error);
      }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
    };

    return (
      <Sheet swipeToClose closeByOutsideClick className='settings-sheet'>
        <BlockTitle>Settings</BlockTitle>
        <List simpleList>
          <ListItem>
            <span>Allow camera access</span>
            <Toggle onChange={checkCameraAccess} checked={camera} color='gray' />
          </ListItem>
          <ListItem>
            <span>Allow location access</span>
            <Toggle
              onChange={checkLocationAccess}
              checked={location}
              color='gray'
            />
          </ListItem>
        </List>
      </Sheet>
    );
  }
  else {
    return null;
  }
};

export default Settings;
