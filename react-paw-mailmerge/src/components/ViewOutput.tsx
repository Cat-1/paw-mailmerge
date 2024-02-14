import React from "react";
import { CsvResult } from "../Helpers/CsvFunctions";
import TableOutput from "./table/TableOutput";

interface ViewOutputProps {
    parsedData: CsvResult | null;
    template: string;
}

const ViewOutput: React.FC<ViewOutputProps> = ({parsedData, template}) => {
    if (parsedData === null) {
        return (
            <p>Please upload a CSV file to view results here.</p>
        )
    } else {
        return (
            <div>
                <h1>Mail Merge Output</h1>
                <TableOutput header={parsedData.header} data={parsedData.data} template={template}/>
            </div>
        )
    }
}

export default ViewOutput