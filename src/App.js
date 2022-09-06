import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Tasklist from "./components/Tasklist/Tasklist";
import AddTodo from "./components/AddTodo/AddTodo";

const baseurl = "http://localhost:4000";
function App() {
  const [inputTask, setInputTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isTaskListChanged , setIsTaskListChanged] = useState(false)
  let taskListCopy = [...taskList];
  console.log("tasklist length:",taskList.length);
  const getTodos = ()=>{
    console.log("INside getTodos");
    fetch(`${baseurl}/todos`)
    .then((response) => response.json())
      .then((data) => {
        console.log("data",data);
        setTaskList([...data.data]);
      });
  }
  useEffect(() => {
    getTodos()
  }, [isTaskListChanged]);

  useEffect(() => {
    console.log("tasklist",taskList);
  }, [taskList]);
  
  const updateTaskList = async(operation,id, description) => {

    switch(operation){
      case "edit":
        let task = taskListCopy.find((task) => task.id === id);
        task.description = description;
        fetch(`${baseurl}/todos/${id}`,{
          method: 'PATCH',
          body: JSON.stringify({
           description: description
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((resp)=> {
          setTaskList([...taskListCopy]);
        })
        .catch((err)=>{
          // Display error modal
          alert(err.message)
        })
        break;
      case "delete":
        let taskIndex = taskListCopy.findIndex((task) => task.id ===id);
        console.log("taskList",taskListCopy);
        taskListCopy.splice(taskIndex , 1);
        const res= await fetch(`${baseurl}/todos/${id}`,{
          method: "DELETE",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        if(res.status === 404){
          // Display error modal
          alert("delete operation error")
          return;
        }
        setTaskList([...taskListCopy])
        if(!taskListCopy.length){
          setIsTaskListChanged(!isTaskListChanged)
        }
       
        break;
    }
   
  };

  const addTodo = async ()=>{
    if(inputTask ===""){
      alert("Enter Task")
      return
    }
    const res = await fetch(`${baseurl}/todos`,{
      method:"POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        description: inputTask
       }),
    })
    
    if(res.status >=400){
      alert("Enter description properly")
    }
    if(res.status === 200){
      res.json().then((data)=>{
        // setIsTaskListChanged(!isTaskListChanged)
        taskListCopy.push(data.data)
        setTaskList([...taskListCopy])
        console.log("tasklist length:",taskListCopy.length);
        if(taskListCopy.length >10){
          setIsTaskListChanged(!isTaskListChanged)
        }
      })
    }
    setInputTask("")
  }
  
  return (
    <div className="App">
      <input type="text" id="todoinputId" placeholder="Enter task" onChange={(e) => setInputTask(e.target.value)} value={!inputTask?"":inputTask}/>
      <button onClick={addTodo}>+</button>
      <Tasklist taskList={taskList} updateTaskList={updateTaskList}/>
    </div>
  );
}

export default App;
