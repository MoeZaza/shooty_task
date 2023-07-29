import Button from "../Button/Button";
import "./PaginationBar.css";

interface IPaginationProps {
    moveNext: () => void;
    movePrev: () => void;
    total: number;
    activeIndex: number;
}

function Pagination(props: IPaginationProps){
    let isPrevDisabled = props.activeIndex === 1;
    let isNextDisabled = props.activeIndex === props.total ||  props.total === 0;
    return (
        <div className="page-bar">
            
            <Button css="mr-10" clickHandler={props.movePrev} label="Previous" disabled={isPrevDisabled} />
            
            <span className="mr-10">Page {props.activeIndex} of {props.total > 0 ? props.total : 1} </span>
            
            <Button css="mr-10" clickHandler={props.moveNext} label="Next" disabled={isNextDisabled} />
            
        </div>
    );
}
export default Pagination;