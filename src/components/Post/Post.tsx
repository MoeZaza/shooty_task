import { ReactComponent as DeleteIcon } from "../../assets/delete-svgrepo-com.svg";

import "./Post.css";
import PostViewer from "./PostViewer";
import { LOCALES } from "../../constants";

export interface IPostProps {
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
    };
    location: {
        city: string;
        country: string;
    };
    sector: string;
    id: string;
}

export interface IPostListener {
    onDelete: (postId: string) => void;
}

export default function Post(props: IPostProps & IPostListener){
   
    const handleDelete = (postId: string) => () => {
        props.onDelete(postId);
    }
    return (
        <div className="flex post">
            <div className="thumb mr-10">
                <img 
                    src={props.image.src}
                    alt={props.image.alt}
                />
            </div>
            <div className="grow-1">
                <div className="flex h-center">
                    <h3 className="grow-1">
                        {props.title}
                    </h3>
                    <PostViewer {...props} />
                    <DeleteIcon 
                        onClick={handleDelete(props.id)} 
                        width={"30px"} 
                        height={"30px"}
                    />
                </div>
                <p>{LOCALES[props.location.city as keyof typeof LOCALES]}, {LOCALES[props.location.country as keyof typeof LOCALES]}</p>
                <p>{LOCALES[props.sector as keyof typeof LOCALES]}</p>
                <p>{props.description}</p>
            </div>

            
        </div>
    )
}