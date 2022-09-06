import Task from "../Task/Task";

function Tasklist({ taskList , updateTaskList }) {
  return (
    <div> 
      {!taskList.length ? <h1>Loading....</h1> :taskList.map((task) => {
        return <Task task={task} key={task.id} updateTaskList={updateTaskList}/>
      })}
    </div>
  );
}

export default Tasklist;
