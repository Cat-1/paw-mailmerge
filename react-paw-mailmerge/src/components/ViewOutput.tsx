import React from "react";
import { CsvResult } from "../Helpers/CsvFunctions";
import TableOutput from "./table/TableOutput";

interface ViewOutputProps {
    parsedData: CsvResult  | null;
    template: string | null;
}

const ViewOutput: React.FC<ViewOutputProps> = ({parsedData, template}) => {

    return (
        <div>
            <h1>Mail Merge Output</h1>
            <TableOutput data={fakeData} template={template}/>
        </div>
    )
}

export default ViewOutput