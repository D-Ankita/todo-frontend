import Task from "../Task/Task";
import { ToggleSwitch,  cbModal,ModalBody , ModalFooter, ModalHeader, ButtonGroup , Button , Notification} from "@contentstack/venus-components";
import styles from "./Tasklist.module.css";

function Tasklist({ taskList, updateTaskList }) {
  const error = {
    error_message: "Entry publishing failed. Please enter valid data.",
    errors: {
      single_line: ["is a required field."],
      "group._metadata.uid": ["is a required field."],
      "group_ref._metadata.uid": ["is a required field."],
    },
  };

    const title="Delete Operation"
    const subTitle="Are you sure you want to delete the task??"
    const ModalComponent = (props) => {
      return (
        <>
          <ModalHeader title={props.header} closeModal={props.closeModal} />
  
          <ModalBody className='modalBodyCustomClass'>
            <h3>{props.title}</h3> <br />
            <p>{props.subtitle}</p>
          </ModalBody>
  
          <ModalFooter>
            <ButtonGroup>
              <Button buttonType='light' onClick={() => props.closeModal()}>
                Cancel
              </Button>
              <Button onClick={() => props.closeModal()}>Send</Button>
            </ButtonGroup>
          </ModalFooter>
        </>
      )
    }
  
    const onClose = () => {
      console.log('on modal close')
    }
  
    const header ="Delete the task"
    const handleClick = () => {
      cbModal({
        component: (props) => <ModalComponent title={title} subtitle={subTitle} header ={header} {...props} />,
        modalProps: {
          onClose,
          onOpen: () => {
            console.log('onOpen gets called')
          },
        },
        testId: 'cs-modal-storybook',
      })
    }
  
  
  function displayToast(){
     <div>
    {
      // Notification({
      //   displayContent: { error: error },
      //   notifyProps: {
      //     hideProgressBar: false,
      //     position: "bottom",
      //     autoClose: true,
      //     // transition: ,
      //     closeButton: true,
      //   },
      //   type: "success",
      // });
      Notification({
        notificationContent: { text: "Congratulations!", description: "todo added sucessfully" },
        notificationProps: {
          hideProgressBar: false, position: "bottom-center", closeOnClick:true, 
          autoClose: true, closeButton: true
        },
        type:"success",
      })
    }
    </div>
  }
  return (
    <div className={styles.taskListContainer}>
      {!taskList.length ? (
        <h1>Loading....</h1>
      ) : (
        taskList.map((task) => {
          return (
            <Task task={task} key={task.id} updateTaskList={updateTaskList} />
          );
        })
      )}
    
    {/* <Button id='modal-stories' buttonType='outline' onClick={handleClick}>
        <span>Open Modal</span>
      </Button> */}
      {/* <Button
        // autoClose={3000}
        // label="Button"

        // onClick={() => {
        //   // Notification({
        //   //   displayContent: { error: error },
        //   //   notifyProps: {
        //   //     hideProgressBar: false,
        //   //     position: "bottom",
        //   //     autoClose: true,
        //   //     // transition: ,
        //   //     closeButton: true,
        //   //   },
        //   //   type: "success",
        //   // });
        //   Notification({
        //     notificationContent: { text: "Congratulations!", description: "todo added sucessfully" },
        //     notificationProps: {
        //       hideProgressBar: false, position: "bottom-center", closeOnClick:true, 
        //       autoClose: true, closeButton: true
        //     },
        //     type:"success",
        //   })
        // }}
        onClick ={displayToast}
      >Click me </Button> */}

      
    </div>
  );
}

export default Tasklist;
