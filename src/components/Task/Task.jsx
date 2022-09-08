import { useEffect, useState } from "react";
import { TextInput, Icon,Button,Checkbox, cbModal } from "@contentstack/venus-components";
import './Task.css'
import { ButtonGroup } from "@mui/material";
import DeleteModal from "../Modal/DeleteModal.jsx";

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
		 deleteModal()
	};
	const changeCompletionStatus = (event) => {
		updateStatus(id, checked
			);
		setChecked(!checked);
	};

	const deleteModal = () => {
		cbModal({
		  component: ({...props}) => <DeleteModal 
		  header={"this is header"}
		  {...props} />,
		  modalProps: {
		    onClose:(status)=>{
			if(status==="true"){
				deleteTodo(id);
			}
		    },
		    onOpen: () => {
			console.log('onOpen gets called')
		    },
		     size: 'tiny',
		  },
		  testId: 'cs-modal-storybook',
		})
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
						iconalignment={undefined}
						onClick={saveTask}
					>Save
					</Button>) : 
					(<Button
						style={{
							backgroundColor: "#41E6C9"

						    }}
						buttonType="primary"		
						icon="Edit"
						iconalignment={undefined}
						onClick={EditTask}
					>Edit</Button>)}
					
					<Button buttonType="primary" onClick={deleteTask} style={{
							backgroundColor: "#FA6E33"
						    }}>
						Delete
					</Button>

				</ButtonGroup>

			</div>
			
		</div>

	)
}

export default Task;
