import './button.css';

const Button = (props) => {
  return (
    <button
      className={`button ${props.hover && 'button__hover'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
