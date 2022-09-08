import { Button, ButtonGroup, Icon, ModalBody, ModalFooter, ModalHeader } from "@contentstack/venus-components";

const DeleteModal = (props) => {  
	console.log("header:",props.header);
	return (
		<>
			<ModalBody className="modalBodyCustomClass">
				<h2><Icon icon="RedAlert" size="large"/> Warning!</h2><br />
				<p> Are you sure you want to delete?
				</p>
			</ModalBody>

			<ModalFooter>
				<ButtonGroup>
					<Button
						buttonType="light"
						onClick={() => props.closeModal("false")}
					> 
					Cancel
					</Button>
					<Button buttonType="light"
						onClick={() =>props.closeModal("true")} >
							Confirm
					</Button>
				</ButtonGroup>
			</ModalFooter>
		</>
	);
};

export default DeleteModal