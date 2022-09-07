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
function Task({todo, updateTodo ,deleteTodo,updateStatus}){
    const {id , description, isComplete} = todo
    const [isEditOn , setisEditOn] = useState(false);
    const [localValue , setlocalValue] = useState(description);
    const [checked, setChecked] = useState(isComplete);

    const EditTask=()=>{
        setisEditOn(!isEditOn)
    }
    const saveTask = ()=>{
        setisEditOn(!isEditOn)
        updateTodo(id,localValue)
        
    }    

    const deleteTask = ()=>{
        //------------------------------------------------ALERT BOX HERE
        console.log("Confim to delete TASK",id);
        deleteTodo(id)
    }
     const changeCompletionStatus=(event)=>{
        console.log("checked",checked);
        updateStatus(id,checked)
        setChecked(!checked)
     }

    return <Paper sx={{width:"100%", margin:"20px auto",size:"small"}}>
        <ListItem direction="row"
  justifycontent="flex-between"
  alignItems="center"
  spacing={7}>
        <Button onClick={changeCompletionStatus}>
        <Checkbox checked={!checked} icon={<PendingActionsIcon   color="info"/>} checkedIcon={<CheckCircleIcon color="success"/>}   />
        </Button>
        {/* <Checkbox onClick={props.onCheckBoxToggle} checked={props.checked} disableRipple /> */}
        <TextField  maxwidth="lg" sx={{width:"100%",margin:"10px", fullWidth:true}} color="secondary"  variant="filled" size="small" focused value={localValue } disabled={!isEditOn} id ={id} onChange={(e)=>setlocalValue(e.target.value)}></TextField>

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