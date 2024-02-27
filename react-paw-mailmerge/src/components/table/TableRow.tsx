import React from "react";
import Button from "react-bootstrap/Button"
import { OpenTextTab } from "../../Helpers/OpenNewTabFunctions";
import { DoMailMerge } from "../../Helpers/CsvFunctions";

interface TableRowProps {
    rowData: Record<string, any>;
    header: string[];
    maxColumnCount: number;
    template: string;
}

const TableRow: React.FC<TableRowProps> = ({rowData, header, maxColumnCount, template}) => {
    const mailMergeOutput = DoMailMerge(rowData, template);
    const handleViewResult = () => {
        OpenTextTab(mailMergeOutput.message);
    }

    const errorAttributes = mailMergeOutput.errors.length > 0 ? {variant: 'danger', title: "Contains Null Fields"} : {};
    console.log(errorAttributes);
    return (
        <tr key={JSON.stringify(rowData)}>
            {header
            .slice(0, maxColumnCount)
            .map(
                (colName) => (<td key={colName}>{rowData[colName]}</td>)
                )}
            <td>
            <Button type="button" {...errorAttributes} onClick={handleViewResult}>View Result</Button>
            </td>
        </tr>
    )
}

export default TableRow;