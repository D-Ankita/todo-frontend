import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Tasklist from "./components/Tasklist/Tasklist";
import {
  Button,
  ToggleSwitch,
  TextInput,
  ButtonGroup,
  Notification,
  Dropdown,
  Icon,
} from "@contentstack/venus-components";
import "@contentstack/venus-components/build/main.css";

const baseurl = "http://localhost:4000";
function App() {
  const [inputTask, setInputTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isTaskListChanged, setIsTaskListChanged] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(5);

  console.log("Page:", page);
  let taskListCopy = [...taskList];
  const getTodos = () => {
    fetch(`${baseurl}/todos?page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((todoData) => {
        const { data, totalPages } = todoData.data;
        console.log("data:", totalPages, data);
        setTaskList([...data]);
        setCount(totalPages);
      });
  };
  useEffect(() => {
    getTodos();
  }, [isTaskListChanged]);

  // useEffect(() => {
  //   console.log("tasklist",taskList.reverse());
  // }, [taskList]);

  const updateTaskList = async (operation, id, updatation) => {
    switch (operation) {
      case "edit":
        let task = taskListCopy.find((task) => task.id === id);
        for (const [key, value] of Object.entries(updatation)) {
          console.log("field", key, value);
          task[key] = value;
        }
        console.log("TASK___", task);
        
        const response = await fetch(`${baseurl}/todos/${id}`, {
          method: "PATCH",
          body: JSON.stringify(updatation),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        console.log("response:", response);
        if (response.status === 500) {
          displayTostMessage({
            type: "error",
            text: "Failed updatation",
            description: `Unable to update task. Try again!`,
          });
          return;
        }
        displayTostMessage({
          type: "success",
          text: "Bravoo!!",
          description: `Task updated sucessfully`,
        });
        setTaskList([...taskListCopy]);

        break;
      case "delete":
        let taskIndex = taskListCopy.findIndex((task) => task.id === id);
        console.log("taskList", taskListCopy);
        taskListCopy.splice(taskIndex, 1);
        const res = await fetch(`${baseurl}/todos/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (res.status === 404) {
          displayTostMessage({
            type: "error",
            text: "Cannot delete task",
            description: "Try again!",
          });

          // Display error modal
          alert("delete operation error");
          return;
        }
        displayTostMessage({
          type: "success",
          text: "Vamos!!",
          description: "Task deleted sucessfully",
        });
        setTaskList([...taskListCopy]);
        setIsTaskListChanged(!isTaskListChanged);
        if (!taskListCopy.length) {
          if (page === 1) {
            console.log("inside if:", page);
            setIsTaskListChanged(!isTaskListChanged);
            return;
          }
          setPage(page - 1);
          setIsTaskListChanged(!isTaskListChanged);
        }
        break;
    }
  };

  const displayTostMessage = ({ type, text, description }) => {
    return Notification({
      notificationContent: {
        text: text,
        description: description,
      },
      notificationProps: {
        hideProgressBar: false,
        position: "bottom-center",
        closeOnClick: true,
        autoClose: true,
        closeButton: true,
      },
      type: type,
    });
  };
  const addTodo = async () => {
    if (inputTask === "") {
      displayTostMessage({
        type: "error",
        text: "Unable to add task",
        description: `Description cant be empty Try again!`,
      });
      return;
    }
    const res = await fetch(`${baseurl}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        description: inputTask,
      }),
    });

    if (res.status >= 400) {
      displayTostMessage({
        type: "error",
        text: "Cannot add task",
        description:
          "Task description should have length greater than 4 characters",
      });
      // alert("Description length should be greater than 3");
    }
    if (res.status === 200) {
      displayTostMessage({
        type: "success",
        text: "Congratulations!",
        description: "task added successfully",
      });
      setIsTaskListChanged(!isTaskListChanged);
      // res.json().then((data) => {
      //   setIsTaskListChanged(!isTaskListChanged);
      // taskListCopy.unshift(data.data);
      // setIsTaskListChanged(!isTaskListChanged)
      // setTaskList([...taskListCopy]);
      // console.log("tasklist length:", taskListCopy.length);
      // if (taskListCopy.length > limit) {
      //   console.log("in IF");
      //   // setPage((prev) => prev + 1);
      //   setIsTaskListChanged(!isTaskListChanged);
      // }
      // });
    }

    setInputTask("");
  };

  const handlePrevious = () => {
    setPage(page - 1);
    setIsTaskListChanged(!isTaskListChanged);
  };

  const handleNext = () => {
    setPage(page + 1);
    setIsTaskListChanged(!isTaskListChanged);
  };

  const handleLimit = (value) => {
    setLimit(value);
    setIsTaskListChanged(!isTaskListChanged);
  };
  return (
    <div className="App">
      <div className="appHeader">
        <div className="addTaskContainer">
          <TextInput
            maxLength={40}
            placeholder="Enter task..."
            // showCharacterCount
            type="text"
            width="large"
            id="todoinputId"
            onChange={(e) => setInputTask(e.target.value)}
            value={!inputTask ? "" : inputTask}
          />

          <Button
            buttonType="primary"
            icon="AddPlus"
            iconAlignment="left"
            size="small"
            style={{
              height: 40,
            }}
            onClick={addTodo}
          >
            ADD
            {/* <Icon
          icon="PurpleAdd"
          size="original"
          testId="cs-Icon"
          withTooltip={false}
          onClick={addTodo}
        /> */}
          </Button>
        </div>
        <div className="Dropdown-wrapper">
          <Dropdown
            closeAfterSelect={true}
            adjustWidthForContent={false}
            arrowSecondary={false}
            dropDownPosition="bottom"
            dropDownType="primary"
            ellipseAlignment="vertical"
            highlightActive={false}
            isEllipse
            isMultiCheck={false}
            onChange={(e) => {
              handleLimit(e.value);
            }}
            list={[
              {
                label: 5,
                value: 5,
              },
              {
                label: 7,
                value: 7,
              },
              {
                label: 10,
                value: 10,
              },
            ]}
            testId="cs-dropdown"
            type="click"
            viewAs="label"
            withArrow={false}
            withIcon={false}
            withSearch={false}
          >
            <Icon
              icon="Settings"
              size="original"
              testId="cs-Icon"
              withTooltip={false}
            />
          </Dropdown>
        </div>
      </div>

      <Tasklist taskList={taskList} updateTaskList={updateTaskList} />

      <ButtonGroup>
        {page > 1 && (
          <Button
            buttonType="primary"
            icon="LeftArrow"
            iconAlignment={undefined}
            onClick={handlePrevious}
          >
            Prev
          </Button>
        )}

        {page < count && (
          <Button
            buttonType="primary"
            icon="RightArrow"
            iconAlignment="right"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}

export default App;
