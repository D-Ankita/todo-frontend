import { useState } from "react";

function Task({ task, updateTaskList }) {
  const { id, description } = task;

  const [localValue, setLocalValue] = useState(description);
  const [isEditOn, setIsEditOn] = useState(false);

  const handleStart = (e) => {
    setIsEditOn(!isEditOn);
    updateTaskList("edit",id, localValue);
  };

  const handleEdit = () => {
    setIsEditOn(!isEditOn);
  };

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleDelete = ()=>{
    if( window.confirm("Are you sure you want to delete this todo?"))
    {
        updateTaskList("delete",id);
    }
  }
  return (
    <div>
      <input
        value={localValue}
        disabled={!isEditOn}
        id={id}
        onChange={handleChange}
      />
      {isEditOn ? (
        <button onClick={handleStart}> Save </button>
      ) : (
        <button onClick={handleEdit}> Edit </button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Task;
