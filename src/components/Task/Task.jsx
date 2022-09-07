import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Checkbox, ListItem, Paper } from "@mui/material";
import { Favorite, FavoriteBorder} from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';


// const divStyle ={
//     width:"90%",
//     margin:"auto",

// }
const style = {width:"100%",margin:"10px"}
function Task({todo, updateTodo ,deleteTodo}){
    const {id , description} = todo
    const [isEditOn , setisEditOn] = useState(false);
    const [localValue , setlocalValue] = useState(description);
    
    const EditTask=()=>{
        setisEditOn(!isEditOn)
    }
    const saveTask = ()=>{
        setisEditOn(!isEditOn)
        updateTodo(id,localValue)
    }    

    const deleteTask = ()=>{
        console.log("Confim to delete TASK",id);
        deleteTodo(id)
    }

    return <Paper sx={{width:"100%", margin:"20px auto",size:"small"}}>
        <ListItem direction="row"
  justifycontent="flex-between"
  alignItems="center"
  spacing={7}>
        
        <Checkbox icon={<PendingActionsIcon  color="info"/>} checkedIcon={<CheckCircleIcon color="success"/>}   />
        {/* <Checkbox onClick={props.onCheckBoxToggle} checked={props.checked} disableRipple /> */}
        <TextField maxwidth="lg" sx={{width:"100%",margin:"10px", fullWidth:true}} color="secondary"  variant="filled" size="small" focused value={localValue } disabled={!isEditOn} id ={id} onChange={(e)=>setlocalValue(e.target.value)}></TextField>

        {/* <input style={style} value={localValue } disabled={!isEditOn} id ={id} onChange={(e)=>setlocalValue(e.target.value)}/> */}
        {/* {isEditOn ?<button onClick={saveTask}> Save </button> : <button  onClick={EditTask}> Edit </button>} */}
        {/* <button onClick={deleteTask}> Delete </button> */}
        {/* {isEditOn ?<Button variant="Contained" startIcon={<DeleteIcon />}>Save</Button> : <Button variant="Contained" startIcon={<EditIcon/>}/>} */}
        {/* <IconButton variant="outlined" color="primary" startIcon={<DeleteIcon />}>Save</IconButton>  */}
        <Stack direction="row" justifyContent="center"  alignItems="center"  spacing={0}>
        {isEditOn ?
        
        <Button variant="outline"  color="primary" onClick={saveTask} startIcon={<SaveIcon color="primary"/>}>Save</Button>
        :
        <Button variant="outline" color="info" onClick={EditTask} startIcon={<EditIcon color="info"/>}>Edit</Button>}
        
        <Button variant="outline" color="success" onClick={deleteTask} ><DeleteIcon color="error"/></Button>
        </Stack>

        
        </ListItem>
        </Paper>
}

export default Task;