import React, { useRef, useEffect } from 'react';
import './speechbtn.css'
// here onVoiceText argument is placed in component function 
// this function will be used to transfer data to parent element 
// delow there is a function named onVoiceText(voicetext)
// it sends data to parent element this is child => parent data transfer by
// function callback 

const Speechbtn = ({onVoiceText}) => { 
  const micBtnRef = useRef(null);
  const taskInputRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;

    // Start listening on click
    micBtnRef.current.onclick = () => {
      recognition.start();
    };
    recognition.onerror = (event) => {
  console.log("Speech Recognition Error:", event.error);
};

recognition.onstart = () => {
  console.log("🎤 Voice recognition started...");
};

recognition.onspeechend = () => {
  console.log("Speech ended");
};



    // Set the result in input
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      taskInputRef.current.value = voiceText;
      console.log("Heard:", voiceText);
      onVoiceText(voiceText);  //this line sends data

    };

  }, [onVoiceText]);

  return (
    <div>
      <button ref={micBtnRef}>Voice</button>
      <input className='i304'
        type="text"
        ref={taskInputRef}
        placeholder="Enter task..."
      />
    </div>
  );
};

export default Speechbtn;
