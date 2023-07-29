import { ReactNode } from "react";
import "./Modal.css";

interface IModalProps {
    children: ReactNode, 
    title: string, 
    show: boolean
}

function Modal({children, title, show}: IModalProps){
    if(!show){
        return null;
    }
    return (
        <div className="modal-mask">
            <div className="modal">
                <header>{title}</header>
                {children}
            </div>
        </div>
    )
}

export default Modal;