import { useRef, useState } from "react";
import { Button, Modal } from "../../elements";
import AddPostForm from "./AddPostForm";
import { IPostProps } from "./Post";

function AddPostBtn({savePost}: {savePost: (newPost: IPostProps) => void}) {
    const [show, setShow] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);

    const handleAdd = () => {
        // Validate the form before saving the post
        if (formRef.current?.checkValidity()) {
          let inputs: any = formRef.current.elements;
          const newPost = {
              title: inputs.title.value,
              description: inputs.desc.value,
              image: {
                src: "https://images.unsplash.com/photo-1566416440105-6c36b6919a2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
                alt: "zaza"
              },
              location: {
                city: inputs.City.value,
                country: inputs.Country.value
              },
              sector: inputs.Sector.value,
              id: ""
          };
          handleClose();
          savePost(newPost);
          setIsFormValid(true); 
        } else {
          setIsFormValid(false);
        }
      };

	const handleOpen = () => {
		setShow(true);
        setIsFormValid(true);
	}
	
	const handleClose = () => {
		setShow(false);
        setIsFormValid(true);
	}

    return (
        <>    
          <Button css="blue" label="Add New Job" clickHandler={handleOpen} />
    
          <Modal title="Add New Job Post" show={show}>
            {/* Pass the formRef to the child component */}
            <AddPostForm formRef={formRef} />
            

            <div className="modal-footer">
            {!isFormValid && <div className="error-message">Please fill/select all the required fields.</div>}

              <Button label="Cancel" clickHandler={handleClose} css="mr-10 button-secondary" />
              <Button css="blue" label="Add New Job" clickHandler={handleAdd} />
            </div>
          </Modal>
        </>
      );
}

export default AddPostBtn;