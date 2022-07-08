import Modal from './Modal';
import Button from './Button';

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header='Error'
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
