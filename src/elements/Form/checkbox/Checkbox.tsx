import { ChangeEvent } from "react";
import "./Checkbox.css";

interface ICheckboxProps {
    id: string;
    label: string;
    value: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({id, label, value = false, onChange}: ICheckboxProps){
    return (
        <div>
            <label className="container">{label}
                <input required id={id} type="checkbox" checked={value} onChange={onChange}/>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}