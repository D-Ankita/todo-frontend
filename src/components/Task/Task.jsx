import { useEffect, useState } from "react";
import { TextInput, Icon,Button,Checkbox, cbModal } from "@contentstack/venus-components";
import './Task.css'
import { ButtonGroup } from "@mui/material";
import ModalComponent from "../Modal/Modal";

const style = { width: "100%", margin: "10px" };

function Task({ todo, updateTodo, deleteTodo, updateStatus }) {
	const { id, description, isComplete } = todo;
	const [isEditOn, setisEditOn] = useState(false);
	const [localValue, setlocalValue] = useState(description);
	const [checked, setChecked] = useState(!isComplete);

	const EditTask = () => {
		console.log("isEditOn",isEditOn);
		setisEditOn(!isEditOn);

	};

	const saveTask = () => {
		console.log("isEditOn",isEditOn);
		setisEditOn(!isEditOn);
		updateTodo(id, localValue);
	};

	const deleteTask = () => {
		//------------------------------------------------ALERT BOX HERE
		handleModalClick()
		console.log("Confim to delete TASK", id);
		deleteTodo(id);
	};
	const changeCompletionStatus = (event) => {
		console.log("checked", checked);
		updateStatus(id, checked);
		setChecked(!checked);
	};

	const handleModalClick = () => {
		cbModal({
		  component: ({...props}) => <ModalComponent {...props} />,
		  modalProps: {
		    onModalClose,
		    onOpen: () => {
			console.log('onOpen gets called')
		    },
		    closeModal:()=>{
			console.log("Closing the Modal");
		    }
		  },
		  testId: 'cs-modal-storybook',
		})
	}

	const onModalClose = () => {
		console.log('on modal close')
	}

	return(
		<div className="Task-Container">
			<div className="Task-Item" >
				<Button onClick={changeCompletionStatus} buttonType="light" style={{
    backgroundColor: 'white'
  }}>
					<Checkbox className="checkbox"
						checked={!checked}
						isButton
					/> { !checked ? ( <Icon
					icon="Success"
					size="medium"
					testId="cs-Icon"
					withTooltip={false}
					/> )
					:
					(<Icon
					icon="PublishRulesTab"
					size="medium"
					testId="cs-Icon"
					withTooltip={false}
					/> )}
				</Button>



				<TextInput
					width="full"
					name="label"
					value={localValue}
					disabled={!isEditOn}
					id={id}
					onChange={(e) => setlocalValue(e.target.value)}
				/>


				<ButtonGroup className="Task-button-group">
					{ isEditOn ? 
					(<Button
						style={{
							backgroundColor: 'brown'
						    }}
						buttonType="primary"
						icon="SaveWhite"
						iconAlignment={undefined}
						onClick={saveTask}
					>Save
					</Button>) : 
					(<Button
						style={{
							backgroundColor: "#41E6C9"

						    }}
						buttonType="primary"		
						icon="Edit"
						iconAlignment={undefined}
						onClick={EditTask}
					>Edit</Button>)}
					
					<Button buttonType="primary" onClick={deleteTask} style={{
							backgroundColor: 'yellow'
						    }}>
						<Icon
						icon="Delete"
						iconAlignment={undefined}
						fill="white"
						> </Icon>
					</Button>

				</ButtonGroup>

			</div>
			
		</div>

	)
}

export default Task;
