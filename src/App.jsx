import { useEffect, useRef, useState } from "react";
import Tasklist from "./components/Tasklist/Tasklist";

import "./App.css";
import "@contentstack/venus-components/build/main.css";
import {
	Button,
	Icon,
	TextInput,
	Notification,
	Heading,
	ButtonGroup,
	cbModal,
} from "@contentstack/venus-components";
import { Slide, Bounce, Flip, Zoom, cssTransition } from "react-toastify";
import { Pagination } from "@mui/material";
import ModalComponent from "./components/Modal/Modal";

const baseurl = "http://localhost:4000";

function App() {
	const [inputTask, setInputTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const [isTaskListChanged, setisTaskListChanged] = useState(false);
	const [pageNo, setPageNo] = useState(1);
	const [limit, setlimit] = useState(8);
	const [totalPages, settotalPages] = useState();
	const [query, setQuery] = useState(
		`${baseurl}/todos?page=${pageNo}&limit=${limit}`
	);

	useEffect(() => {
		fetchTask();
	}, [isTaskListChanged]);
	useEffect(() => {
		fetchTask();
	}, [pageNo]);
	useEffect(() => {
		fetchTask();
	}, [totalPages]);

	const fetchTask = () => {
		fetch(`${baseurl}/todos?page=${pageNo}&limit=${limit}`)
			.then((response) => response.json())
			.then((responseData) => {
				setTaskList([...responseData.data]);
				settotalPages(responseData.totalPages);
			});
	};

	const updateTodo = (id, description) => {
		const taskListCopy = [...taskList];
		let task = taskListCopy.find((task) => task.id === id);
		task.description = description;
		setTaskList([...taskListCopy]);
		fetch(`${baseurl}/todos/${id}`, {
			method: "PATCH",
			headers: { "Content-type": "application/json; charset=UTF-8" },
			body: JSON.stringify({ description: description }),
		})
			.then((response) => response.json())
			.then((data) => {
				showNotification({
					text: data.message,
					type: checkNotificationType(data.statusCode),
				});
				console.log("DATA", data);
			});
	};

	const updateStatus = (id, checked) => {
		const taskListCopy = [...taskList];
		let task = taskListCopy.find((task) => task.id === id);
		task.isComplete = checked;
		setTaskList([...taskListCopy]);
		fetch(`${baseurl}/todos/${id}`, {
			method: "PATCH",
			headers: { "Content-type": "application/json; charset=UTF-8" },
			body: JSON.stringify({ isComplete: checked }),
		})
			.then((response) => response.json())
			.then((data) => {
				showNotification({
					text: data.message,
					type: checkNotificationType(data.statusCode),
				});
				console.log("DATA after status change", data);
			});
	};

	const deleteTodo = (id) => {
		let taskListCopy = [...taskList];
		taskListCopy = taskListCopy.filter((task) => task.id !== id);
		setTaskList([...taskListCopy]);
		setisTaskListChanged(!isTaskListChanged);
		fetch(`${baseurl}/todos/${id}`, {
			method: "DELETE",
			headers: { "Content-type": "application/json; charset=UTF-8" },
		})
			.then((response) => response.json())
			.then((data) => {
				showNotification({
					text: data.message,
					type: checkNotificationType(data.statusCode),
				});
				console.log("DATA after deleting", data);
			});
	};

	const addTodo = async () => {
		fetch(`${baseurl}/todos`, {
			method: "POST",
			headers: { "Content-type": "application/json; charset=UTF-8" },
			body: JSON.stringify({ description: inputTask }),
		})
			.then((response) => response.json())
			.then((data) => {
				showNotification({
					text: data.message,
					type: checkNotificationType(data.statusCode),
				});
				setInputTask("");
				setisTaskListChanged(!isTaskListChanged);
			});
	};

	const checkNotificationType = (statusCode) => {
		let type = "error";
		switch (statusCode) {
			case 200:
				type = "success";
				break;
			case 400:
				type = "error";
				break;
			case 500:
				type = "warning";
				break;
		}
		return type;
	};

	const handelPageChange = (event, value) => {
		setPageNo(value);
	};

	const showNotification = (props) => {
		return Notification({
			notificationContent: { text: props.text },
			notificationProps: {
				hideProgressBar: true,
				position: "top-right",
				draggable: true,
				transition: Bounce,
				closeButton: true,
				autoClose: true,
			},
			type: props.type,
		});
	};

	

	return (
		<>
			<Heading tagName="h1" text="To-Do List" className="App-heading" />
			<div className="App-todoComponent">
				<ButtonGroup className="App-inputComponent">
					<TextInput
						width="large"
						name="label"
						onChange={(e) => setInputTask(e.target.value)}
						value={inputTask}
						placeholder="Enter Task"
					/>
					<Button
						buttonType="primary"
						type="submit"
						iconAlignment={undefined}
						onClick={addTodo}
					>
						<Icon icon="AddPlus" />
						Add
					</Button>
				</ButtonGroup>
				<div className="App-taskList">
					<Tasklist
						todos={taskList}
						updateStatus={updateStatus}
						updateTodo={updateTodo}
						addTodo={addTodo}
						deleteTodo={deleteTodo}
					/>
					<Pagination
						count={totalPages}
						page={pageNo}
						siblingCount={0}
						onChange={handelPageChange}
						sx={{ margin: " 20px auto auto auto" }}
					/>
				</div>
			</div>
		</>
	);
}
export default App;
