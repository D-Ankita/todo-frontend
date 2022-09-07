import { List, Pagination } from "@mui/material";
import Spinnner from "../Spinner/Spinner";
import Task from "../Task/Task";
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';

const style = {width:"80%",margin:" auto", padding:"10px", }

function Tasklist({ todos ,updateTodo, deleteTodo,updateStatus}) {
  // console.log("tasklist:: In taskList",todos);
  return (
    <Box style={style}
      sx={{width: '90%', height: 400, maxwidth: 600, bgcolor: 'background.paper',maxHeight: 350, overflow: 'auto', padding:" 10px" }}>
      <List >
       

      {!todos? <Spinnner />:todos.map((todo) => { return <Task key={todo.id} todo={todo} updateStatus={updateStatus} updateTodo={updateTodo} deleteTodo={deleteTodo}/>})}

    </List>
  </Box>
  );
}

export default Tasklist;
