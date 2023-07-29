import { useState } from "react";
import { ReactComponent as ViewIcon } from "../../assets/view-svgrepo-com.svg";
import { Button, Modal } from "../../elements";
import { IPostProps } from "./Post";
import { LOCALES } from "../../constants";

function  PostViewer(props: IPostProps){
    const [show, setShow] = useState(false);
    const handleOpen = () =>{
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    return (
        <>
            <ViewIcon 
                width={"30px"} 
                height={"30px"} 
                onClick={handleOpen}
            />
            <Modal title={props.title} show={show}>
                <div className="flex h-center">
                    <div className="thumb mr-10">
                        <img 
                            className="rounded"
                            src={props.image.src}
                            alt={props.image.alt}
                        />
                    </div>

                    <div>
                        <div>
                            <span>Location: </span> 
                            <span>{LOCALES[props.location.city as keyof typeof LOCALES]}, {LOCALES[props.location.country as keyof typeof LOCALES]} </span>
                        </div>
                        <div>Occupation: {LOCALES[props.sector as keyof typeof LOCALES]} </div>
                        <div>Roles:- </div>
                        <div>{props.description}</div>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button label="Close" clickHandler={handleClose} />
                </div>
            </Modal>
        </>
    )
}
export default PostViewer;