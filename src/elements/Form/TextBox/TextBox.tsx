import { ChangeEvent } from "react";
import "./TextBox.css";

interface ITextBoxProps {
    placeholder: string, 
    css?: string, 
    name?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}


export default function TextBox({placeholder, css, name, onChange}: ITextBoxProps){
    
    return (
        <input 
            required
            type="text" 
            placeholder={placeholder} 
            className={`textbox ${css}`}
            name={name}
            onChange={onChange}
        />
    )
}