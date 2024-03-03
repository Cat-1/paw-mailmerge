import React from "react";
import { CsvResult, DoMailMerge } from "../Helpers/CsvFunctions";
import TableOutput from "./table/TableOutput";
import { ZipAndDownload } from "../Helpers/ZipFunctions";
import Button from "react-bootstrap/Button"

interface ViewOutputProps {
    parsedData: CsvResult | null;
    template: string;
}

const ViewOutput: React.FC<ViewOutputProps> = ({parsedData, template}) => {
    const handleDownloadAll = () => {
        if (parsedData !== null) {
            ZipAndDownload(parsedData.data.map((row) => DoMailMerge(row, template)));
        }
    }

    if (parsedData === null || template.length === 0) {
        return (
            <div>
                <p>To view mail merge results here, please complete the following task(s).</p>
                <ul>
                    {parsedData === null && <li>Upload a CSV file.</li>}
                    {template.length === 0 && <li>Compose a non-empty template.</li>}
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Mail Merge Output</h1>
                <TableOutput header={parsedData.header} data={parsedData.data} template={template}/>
                <Button onClick={handleDownloadAll}>Download All</Button>
            </div>
        )
    }
}

export default ViewOutput