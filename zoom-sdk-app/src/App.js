import React, {useEffect, useState} from "react";
import {ZoomMtg} from "@zoomus/websdk";
import styles from './App.module.scss';
import '../node_modules/@zoomus/websdk/dist/css/bootstrap.css';
import '../node_modules/@zoomus/websdk/dist/css/react-select.css';

const App = () => {

  const [meetConfig, setMeetConfig] = useState({
    apiKey: 'Zz0o6PmATEWFOK_DPOCU5A', // should be received from the closed endpoint on server
    meetingNumber: 86928057773,
    leaveUrl: 'localhost:3000',
    userName: 'Mykhail Kosiuk',
    userEmail: 'tuareg1812@gmail.com',
    passWord: '072772', // if required
    role: 1 // 1 for host; 0 for attendee
  });

  const startMeeting = async () => {
    try {
    const result = await fetch('http://localhost:8000/api/gensignature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        meetingNumber: meetConfig.meetingNumber,
        role: meetConfig.role
      })
    })
    const response = JSON.parse(await result.text());
    console.log(response.signature);
    ZoomMtg.init({
      leaveUrl: meetConfig.leaveUrl,
      isSupportAV: true,
      success: function() {
        ZoomMtg.join({
          signature: response.signature,
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
    <div className={styles.zoomHeader}>
      <input type={"text"} placeholder={"Meeting number"} onChange={(e) => setMeetConfig({...meetConfig, meetingNumber: parseInt(e.target.value)})}/>
      <input type={"text"} placeholder={"Meeting password"} onChange={(e) => setMeetConfig({...meetConfig, passWord: e.target.value})}/>
      <input type={"text"} placeholder={"User Name"} onChange={(e) => setMeetConfig({...meetConfig, userName: e.target.value})}/>
      <input type={"text"} placeholder={"User Email"} onChange={(e) => setMeetConfig({...meetConfig, userEmail: e.target.value})}/>
      <select onChange={(e) => setMeetConfig({...meetConfig, role: e.target.value})}>
        <option value={"0"}>Attendee</option>
        <option value={"1"}>Host</option>
      </select>
      <button type={"button"} onClick={() => startMeeting()} className={styles.startBtn}>Start meeting</button>
    </div>
  );
}

export default App;
