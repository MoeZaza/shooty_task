import { ChangeEvent } from "react";
import { LOCALES } from "../../../constants";
import "./Select.css";

interface ISelectProps {
    options: string[], 
    name?: string, 
    css?: string,
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

function Select({options, name, css = "", onChange}: ISelectProps) {
    return (
        <select required name={name} className={`select-opt ${css}`} onChange={onChange}>
            <option value="" disabled selected hidden>{name}</option>
            {options.map((opt: string)=>{
                return (
                <option value={opt} key={opt} >
                    {LOCALES[opt as keyof typeof LOCALES]}
                </option>
                )
            })}
        </select>
    )
}

export default Select;