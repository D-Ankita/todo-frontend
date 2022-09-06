import { useEffect, useState } from "react";
const style = {width:"80%"}
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

    return <div>
        <input style={style} value={localValue + " " +id} disabled={!isEditOn} id ={id} onChange={(e)=>setlocalValue(e.target.value)}/>
        {isEditOn ?<button onClick={saveTask}> Save </button> : <button  onClick={EditTask}> Edit </button>}
        <button onClick={deleteTask}>Delete</button>
    </div>
}

export default Task;