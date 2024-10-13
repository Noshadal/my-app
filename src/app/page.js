"use client"; 
import { useState, useEffect, useRef } from 'react';

const Alarm = () => {
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [alarmTimeout, setAlarmTimeout] = useState(null);
  const alarmSound = useRef(null); // Ref for the audio element

  const handleSetAlarm = () => {
    const alarmTime = new Date(time).getTime();
    const now = Date.now();

    if (alarmTime < now) {
      alert('Please select a future time.');
      return;
    }

    setMessage(`Alarm set for ${new Date(alarmTime).toLocaleString()}`);
    if (alarmTimeout) {
      clearTimeout(alarmTimeout);
    }
    const timeoutId = setTimeout(() => {
      if (alarmSound.current) {
        alarmSound.current.play();  
      }
      alert('Alarm ringing!');
      setMessage('');
    }, alarmTime - now);
    setAlarmTimeout(timeoutId);
  };

  useEffect(() => {
    return () => {
      if (alarmTimeout) {
        clearTimeout(alarmTimeout);
      }
    };
  }, [alarmTimeout]);

  return (
    <>
    <div className='flex justify-center items-center bg-gray-800 h-[90vh] flex-col gap-12'>
      <h1 className='text-gray-900 font-bold text-3xl' >Set an Alarm</h1>
      <input
        type="datetime-local"
        onChange={(e) => setTime(e.target.value)}
        value={time}
      />
      <button  className='text-gray-400 font-bold text-3xl animate-bounce' onClick={handleSetAlarm}>
        Set Alarm
      </button>
      {message && <p className='text-gray-200 font-bold text-lg'>{message}</p>}
      <audio ref={alarmSound} src="/alarm-sound.mp3" />
      <audio ref={alarmSound} src="/alarm-sound.mp3" volume="1.0" loop />
    </div>
      <h1 className='bg-black h-[10vh] flex justify-center items-center my text-2xl outline-dotted outline-white'>Product by MR Noshad</h1>
      </>
  );
};

export default Alarm;
