import { Button, ButtonGroup, ModalBody, ModalFooter, ModalHeader } from "@contentstack/venus-components";

const ModalComponent = (props) => {    
	return (
		<>
			<ModalHeader
				title="Modal header"
				closeModal={props.closeModal}
			/>

			<ModalBody className="modalBodyCustomClass">
				<h3>props.heading</h3> <br />
				<p>
				props.description
				</p>
			</ModalBody>

			<ModalFooter>
				<ButtonGroup>
					<Button
						buttonType="light"
						onClick={() => props.closeModal()}
					> 
					Cancel
					</Button>
					<Button buttonType="light"
						onClick={() => props.confirmModal()} >
							Send
					</Button>
				</ButtonGroup>
			</ModalFooter>
		</>
	);
};

export default ModalComponent