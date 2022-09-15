import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

import './modal.css';

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  // console.log(
  //   `%cTodo: add CSS Transitions later on`,
  //   'background: yellow; color: #444; padding: 5px; border-radius: 20px;'
  // );
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {/* add css transitions here */}
      {props.show && <ModalOverlay {...props} />}
    </>
  );
};

export default Modal;
