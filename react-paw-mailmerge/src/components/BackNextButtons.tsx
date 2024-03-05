import React from "react";
import { CurrentPage } from "../Helpers/CurrentPage";
import Button from "react-bootstrap/Button";

interface BackNextButtonsProps {
    currentPage: CurrentPage;
    setTab: (k:number) => void; 
}

const BackNextButtons: React.FC<BackNextButtonsProps> = ({currentPage, setTab}) => {
   function BackButton():JSX.Element {
        if(currentPage.hasPrev){
            return <Button type="button" className="me-2" onClick={() => setTab(currentPage.getPrev())}>Prev</Button>
        }
        return <></>;
    }

    function NextButton():JSX.Element{
        if(currentPage.hasNext){
            return <Button type="button" className="me-2" onClick={() => setTab(currentPage.getNext())}>Next</Button>
        }
        return <></>;
    }

    return(
        <div className="BackNextDiv">
            <BackButton></BackButton>
            <NextButton></NextButton>
        </div>
    )
}

export default BackNextButtons;