import { useState, useEffect } from 'react'
import Button from './components/button'
import Navbar from './components/navbar'
import "./app.css"
import { v4 as uuidv4 } from 'uuid';
import Speechbtn from './components/speechbtn';

function App() {
  const [task, settask] = useState("")
  const [todos, settodos] = useState(() => {
    return JSON.parse(localStorage.getItem("key hai ye")) || [];
  });

  useEffect(() => {
    localStorage.setItem("key hai ye", JSON.stringify(todos));
  }, [todos]);

  const handleadd = () => {
    if(task.trim()==="") return;
    settodos([...todos, { uuid: uuidv4(), task, iscompleted: false }]);
    settask("");
  };

  const handeldelete = (e, id) => {
    settodos(todos.filter(item => item.uuid !== id));
  };

  const handeledit = (e, id) => {
    const selected = todos.find(item => item.uuid === id);
    if (selected) settask(selected.task);
    settodos(todos.filter(item => item.uuid !== id));
  };

  const handletext = (e) => {
    settask(e.target.value);
  };

  // 👇 function that receives data from child
  const handleVoiceInput = (text) => {
    settask(text);
    console.log("Received from child:", text);
  };

  return (
    <>
      <Navbar />
      <div className="box">
        <div className="main">
          <div className="headin">Enter Tasks</div>
          <input type="text" placeholder='enter your Tasks' onChange={handletext} value={task} />
          <div className="buttas">
            <Button func={handleadd} text="Add" />
      <Speechbtn onVoiceText={handleVoiceInput} />
          </div>

        </div>

        <div className="main">
          your tasks :
          {todos.map(item => (
            <div className="whole" key={item.uuid}>
              <div className="item">* {item.task}</div>
              <div className="buttonontodo">
                <Button text="Edit" func={(e)=>handeledit(e,item.uuid)} />
                <Button text="delete" func={(e)=>handeldelete(e,item.uuid)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
}

export default App;
