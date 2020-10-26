import React, {useRef} from "react";
import {ZoomMtg} from "@zoomus/websdk";
import styles from './App.module.scss';
import '../node_modules/@zoomus/websdk/dist/css/bootstrap.css';
import '../node_modules/@zoomus/websdk/dist/css/react-select.css';

function App() {
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  const zoomRoot = useRef(null);

  const meetConfig = {
    apiKey: 'Zz0o6PmATEWFOK_DPOCU5A',
    meetingNumber: '825 0429 3152',
    leaveUrl: 'localhost:3000',
    userName: 'Mykhail Kosiuk',
    userEmail: 'tuareg1812@gmail.com',
    passWord: '135462', // if required
    role: 1 // 1 for host; 0 for attendee
  };

  const startMeeting = async () => {
    const result = await fetch('localhost:8000/getsignature', {
      method: 'POST',
      body: JSON.stringify(meetConfig)
    })
    const response = await result.text();
    ZoomMtg.init({
      leaveUrl: meetConfig.leaveUrl,
      isSupportAV: true,
      success: function() {
        ZoomMtg.join({
          signature: response,
          apiKey: meetConfig.apiKey,
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          passWord: meetConfig.passWord, 
          error: (res) => console.log(res) 
        })		
      }
    })
  }

  return (
    <div>
      <button onClick={() => startMeeting()}>Start meeting</button>
      <div id="zmmtg-root" ref={zoomRoot}></div>
      <div id="aria-notify-area"></div>
    </div>
  );
}

export default App;
