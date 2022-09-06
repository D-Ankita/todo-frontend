import logo from "./logo.svg";
// import "./App.css";
import { useEffect, useState } from "react";
import Tasklist from "./components/Tasklist/Tasklist";
import AddTodo from "./components/AddTodo/AddTodo";
import axios from "axios";

const baseurl = "http://localhost:4000"
function App() {

  const [inputTask , setInputTask] = useState("");
  const [taskList , setTaskList] = useState([])
  useEffect(() => {
    fetch(`${baseurl}/todos`)
    .then((response) => response.json())
    .then((data) => {
      // console.log("data",data);
      setTaskList([...data.data])
    })
  }, []);

  useEffect(() => {console.log("IN USE EFFECT----",taskList);}, [taskList]);

  const updateTodo = (id, description)=>{
    console.log(description);
    const taskListCopy = [...taskList];
    let task = taskListCopy.find((task)=>task.id === id);
    task.description = description
    console.log("Task",task);
    setTaskList([...taskListCopy])
    fetch(`${baseurl}/todos/${id}`,{
      method:'PATCH',
      // mode:'cors',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body:JSON.stringify({description:description})
    }).then((response)=>response.json()).then((data)=>console.log("DATA",data))
  }

  const deleteTodo = (id)=>{
    // const taskListCopy = taskList.filter((task)=> task.id !== id);
    let taskListCopy = [...taskList]
    taskListCopy = taskListCopy.filter((task)=>task.id !== id)
    console.log("after deletion",taskListCopy);
    setTaskList([...taskListCopy])
    
    fetch(`${baseurl}/todos/${id}`,{
      method:'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response)=>response.json()).then((data)=>console.log("DATA after deleting",data))
    
  }
  
  const addTodo = async()=>{
    fetch(`${baseurl}/todos`,{
      method:'POST',
      // mode:'cors',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body:JSON.stringify({description:inputTask})
    }).then((response)=>response.json()).then((data)=>{console.log("DATA after POST",data);
    setInputTask("")
    fetch(`${baseurl}/todos`)
    .then((response) => response.json())
    .then((data) => {
      // console.log("data",data);
      setTaskList([...data.data])
    })
  }
    )
  }
  useEffect(() => {
    fetch(`${baseurl}/todos`)
    .then((response) => response.json())
    .then((data) => {
      // console.log("data",data);
      setTaskList([...data.data])
    })
  }, []);


  return <div className="App">
      <input type="text" placeholder="Enter task" id="inputtext" onChange={(e)=>setInputTask(e.target.value) } value={inputTask}/>
      <button onClick={addTodo} type="submit">+</button>
    {/* <AddTodo/> */}
    <Tasklist todos = {taskList} updateTodo={updateTodo} addTodo={addTodo} deleteTodo={deleteTodo}/>
  </div>;
}

export default App;
