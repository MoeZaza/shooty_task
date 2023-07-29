
import "./Button.css";

interface IButtonProps {
    disabled?: boolean;
    clickHandler: () => void;
    label: string;
    css?: string;
}

function Button(props: IButtonProps){
    return (
        <button 
            className={`button ${props.disabled ? "btn-disabled" : ""} ${props.css}`}
            onClick={props.clickHandler}
        >
            {props.label}
        </button>
    )
}

export default Button;