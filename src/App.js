import logo from "./logo.svg";
// import "./App.css";
import { useEffect, useRef, useState } from "react";
import Tasklist from "./components/Tasklist/Tasklist";
import SendIcon from '@mui/icons-material/Send';
import { Alert, Button, Pagination, Paper, Stack, TextField, Typography } from "@mui/material";

import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';



const baseurl = "http://localhost:4000"
export default function App() {
  
  //-------------------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = ['All Tasks', 'Completed Tasks', 'Pending Tasks'];
  
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    console.info(`You clicked ${options[selectedIndex]}`);
    fetchTask();


  };
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
//------------------------------------------------------------------------------------------------------




    const [inputTask , setInputTask] = useState("");
    const [taskList , setTaskList] = useState([])
    const [isTaskListChanged , setisTaskListChanged] = useState(false)
    const [pageNo, setPageNo] = useState(1);
    const [limit, setlimit] = useState(3);
    const [totalPages, settotalPages] = useState();
    const [query, setQuery] = useState(`${baseurl}/todos?page=${pageNo}&limit=${limit}`);

      const fetchTask = () => {
      console.log("selectedIndex-------------",selectedIndex);
      switch(selectedIndex){
        case 1:
          setQuery(`${baseurl}/todos?isComplete=true&page=${pageNo}&limit=${limit}`);
          break;
        case 2:
          setQuery(`${baseurl}/todos?isComplete=false&page=${pageNo}&limit=${limit}`);
          break;
      }
      fetch(query)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log("IN USE EFFECT--------FETCH - data",responseData);
        setTaskList([...responseData.data])
        // console.log("IN USE EFFECT--------FETCH - pageNo",responseData.totalPages);
        settotalPages(responseData.totalPages);
        // console.log("IN USE EFFECT--------FETCH - isComplete",responseData);
        // console.log("isCompleteStatus",isCompleteStatus);
        // setIsCompleteStatus(responseData.data.isComplete)
      })
    }
  
    useEffect(() => {
      fetchTask();
    }, [isTaskListChanged]);
    useEffect(() => {
      fetchTask();
    }, [pageNo]);
    useEffect(() => {
      fetchTask();
    }, [totalPages]);

    // useEffect(() => {console.log("IN USE EFFECT----||",taskList);}, [taskList]);  
  
    const updateTodo = (id, description)=>{
      // console.log(description);
      const taskListCopy = [...taskList];
      let task = taskListCopy.find((task)=>task.id === id);
      task.description = description
      // console.log("Task",task);
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
  
    const updateStatus = (id,checked)=>{
      const taskListCopy = [...taskList];
      let task = taskListCopy.find((task)=>task.id === id);
      task.isComplete = checked
      setTaskList([...taskListCopy])
      fetch(`${baseurl}/todos/${id}`,{
        method:'PATCH',
        // mode:'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body:JSON.stringify({isComplete:checked})
      }).then((response)=>response.json()).then((data)=>console.log("DATA after status change",data))
    }
  
    const deleteTodo = (id)=>{
      // const taskListCopy = taskList.filter((task)=> task.id !== id);
      let taskListCopy = [...taskList]
      taskListCopy = taskListCopy.filter((task)=>task.id !== id)
      // console.log("after deletion",taskListCopy);
      setTaskList([...taskListCopy])
      setisTaskListChanged(!isTaskListChanged)
      
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
      <Alert severity="error">{data.message}</Alert>
      setInputTask("")
      // fetchTask()
      setisTaskListChanged(!isTaskListChanged)
      // fetch(`${baseurl}/todos`)
      // .then((response) => response.json())
      // .then((data) => {
      //   // console.log("data",data);
      //   setTaskList([...data.data])
      // })
    }
      )
    }
  
  
    const handelPageChange =(event,value)=>{
      setPageNo(value)
    }
  
    return <Paper sx={{width:"60%", margin:"20px auto",padding:" 0px 0px 10px 0px"}}>
      <Typography variant="h6" gutterBottom sx={{textAlign:"center"}}>
          To Do List
        </Typography>
      <Stack direction="column"
    justifycontent="center"
    alignItems="center"
    spacing={1}
    mt={0}
    maxwidth="100%"
    >
        <Paper sx={{width:"80%", margin:"20px auto",padding:"10px", }} elevation={3}>
        <Stack direction="row" spacing={2} justifycontent="center" alignItems="center">
          <TextField label="Enter Task" color="secondary" fullWidth="true" focused type="text" size="small" id="inputtext" onChange={(e)=>setInputTask(e.target.value) } value={inputTask}/>
          {/* <input type="text" placeholder="Enter task" id="inputtext" onChange={(e)=>setInputTask(e.target.value) } value={inputTask}/> */}
          <Button variant="contained" onClick={addTodo} type="submit" size="large" endIcon={<SendIcon />}> Add </Button>
        </Stack>
        </Paper>
      <Tasklist todos = {taskList} updateStatus={updateStatus} updateTodo={updateTodo} addTodo={addTodo} deleteTodo={deleteTodo}/>
      <Stack direction="row">
      <Pagination count={totalPages} page={pageNo} siblingCount={0} onChange={handelPageChange}/>
      
{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button  disableRipple>{options[selectedIndex]}</Button>
        <Button size="small" aria-controls={open ? 'split-button-menu' : undefined} aria-expanded={open ? 'true' : undefined}  aria-label="select merge strategy"  aria-haspopup="menu" onClick={handleToggle}>
        <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper sx={{ zIndex: 1, }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow  {...TransitionProps}  style={{ transformOrigin:  placement === 'right top',  }}  >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>  {options.map((option, index) => (
                    <MenuItem key={option} selected={index === selectedIndex}  onClick={(event) => handleMenuItemClick(event, index)}  >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      </>
{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      </Stack>

  </Stack>
    </Paper>;
  }
  
// export default App;
