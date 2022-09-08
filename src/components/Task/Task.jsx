import { useState } from "react";
import { TextInput } from "@contentstack/venus-components";
import {
  Button,
  cbModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ButtonGroup,
  Checkbox,
  Icon,
} from "@contentstack/venus-components";
import styles from "./Task.module.css";

function Task({ task, updateTaskList }) {
  const { id, description } = task;
  const [isComplete, setIsComplete] = useState(task.isComplete);
  const [localValue, setLocalValue] = useState(description);
  const [isEditOn, setIsEditOn] = useState(false);

  console.log("task:", task.description, task.isComplete);
  // console.log("isComplete:",isComplete);
  const ModalComponent = (props) => {
    return (
      <>
        <ModalHeader title="Delete Task" closeModal={props.closeModal} />
        <ModalBody className="modalBodyCustomClass">
          <h3>Are you sure you want to delete this todo?</h3> <br />
          {/* <p>The Modal component is a dialog box/popup window that is displayed on top of the current page</p> */}
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button
              buttonType="light"
              onClick={() => props.closeModal("delete")}
            >
              ok
            </Button>
            <Button onClick={() => props.closeModal()}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </>
    );
  };

  const handleSave = (e) => {
    setIsEditOn(!isEditOn);
    updateTaskList("edit", id, { description: localValue });
  };

  const handleEdit = () => {
    setIsEditOn(!isEditOn);
  };

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const onClose = (deleteConfirmation = false) => {
    if (deleteConfirmation === "delete") {
      updateTaskList("delete", id);
    }
  };

  const handleDelete = () => {
    cbModal({
      component: (props) => <ModalComponent {...props} />,
      modalProps: {
        onClose,
        onOpen: () => {
          console.log("onOpen gets called");
        },
      },
      testId: "cs-modal-storybook",
    });
  };

  const handleIsComplete = () => {
    setIsComplete(!isComplete);
    updateTaskList("edit", id, { isComplete: !isComplete });
  };
  return (
    <div className={styles.TaskContainer}>
      
      <div className={styles.inputContainer}>
      <TextInput
          className={isComplete?styles.inputButton:""}
          maxLength={20}
          placeholder="Enter value..."
          showCharacterCount
          type="text"
          width="large"
          value={localValue}
          disabled={!isEditOn}
          id={id}
          onChange={handleChange}
        />
        <div className={isComplete? styles.line :""}></div>
      </div>
      
      {/* <input
        value={localValue}
        disabled={!isEditOn}
        id={id}
        onChange={handleChange}
      /> */}
      <ButtonGroup className={styles.buttonContainer}>
        <Checkbox
          // checked
          // !checked? icon="CheckboxInactive"
          checked={isComplete}
          className={styles.checkBox}
          icon={!isComplete ? "CheckboxInactive" : "CheckboxActive"}
          onClick={handleIsComplete}
        />
        {isEditOn ? (
          <Button
            buttonType="primary"
            icon="SaveWhite"
            iconAlignment="left"
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
          // <button onClick={handleStart}> Save </button>
          <Button
            buttonType="primary"
            icon="CreateWhite"
            iconAlignment="left"
            onClick={handleEdit}
            size="default"
          >
            Edit
          </Button>
          // <button onClick={handleEdit}> Edit </button>
        )}
        <Button
          buttonType="delete"
          icon="DeleteAsset"
          iconAlignment="left"
          onClick={handleDelete}
          size="default"
        >
          Delete
        </Button>
      </ButtonGroup>

      {/* <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
}

export default Task;
