import React, {useEffect} from "react";
import {ZoomMtg} from "@zoomus/websdk";
import styles from './App.module.scss';
import '../node_modules/@zoomus/websdk/dist/css/bootstrap.css';
import '../node_modules/@zoomus/websdk/dist/css/react-select.css';

const App = () => {
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
    try {
    const result = await fetch('http://localhost:8000/gensignature', {
      method: 'POST',
      body: JSON.stringify(meetConfig)
    })
    const response = await result.text();
    console.log(response);
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
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av'); 
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }, []);


  return (
    <div>
      <button onClick={() => startMeeting()} className={styles.startBtn}>Start meeting</button>
    </div>
  );
}

export default App;
