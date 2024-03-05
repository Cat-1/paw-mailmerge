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
            const prev = currentPage.index - 1;
            return <Button type="button" className="me-2" onClick={() => setTab(prev)}>Prev</Button>
        }
        return <></>;
    }

    function NextButton():JSX.Element{
        if(currentPage.hasNext){
            const next = currentPage.index + 1;
            return <Button type="button" className="me-2" onClick={() => setTab(next)}>Next</Button>
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