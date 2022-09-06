import Spinnner from "../Spinner/Spinner";
import Task from "../Task/Task";

function Tasklist({ todos ,updateTodo, deleteTodo,addTodo}) {
  console.log("tasklist:: In taskList",todos);
  return (
    <div>
      {/* !props.TaskList : <h1>Loading...</h1> ? return */}

      {todos.map((todo) => {
        return <Task key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} addTodo={addTodo}/>
      })}

      {/* {!todos? <Spinnner />:todos.map((todo) => { return <Task todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>})} */}
    </div>
  );
}

export default Tasklist;
