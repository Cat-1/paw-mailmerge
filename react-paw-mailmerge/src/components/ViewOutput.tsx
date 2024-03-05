import React from "react";
import { CsvResult, DoMailMerge } from "../Helpers/CsvFunctions";
import TableOutput from "./table/TableOutput";
import { ZipAndDownload } from "../Helpers/ZipFunctions";
import Button from "react-bootstrap/Button";
import BackNextButtons from './BackNextButtons';
import { CurrentPage } from "../Helpers/CurrentPage";

interface ViewOutputProps {
    parsedData: CsvResult | null;
    template: string;
    setTab: (k:number) => void;
    currentPage: CurrentPage;
}

const ViewOutput: React.FC<ViewOutputProps> = ({parsedData, template, currentPage, setTab}) => {
    const handleDownloadAll = () => {
        if (parsedData !== null) {
            ZipAndDownload(parsedData.data.map((row) => DoMailMerge(row, template)));
        }
    }

    if (parsedData === null) {
        return (
            <div>
                <p>Please upload a CSV file to view results here.</p>
                <BackNextButtons currentPage={currentPage} setTab={setTab}></BackNextButtons>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Mail Merge Output</h1>
                <TableOutput header={parsedData.header} data={parsedData.data} template={template}/>
                <Button onClick={handleDownloadAll}>Download All</Button>
                <BackNextButtons currentPage={currentPage} setTab={setTab}></BackNextButtons>
            </div>
        )
    }
}

export default ViewOutput