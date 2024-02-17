import React from "react";
import Button from "react-bootstrap/Button"
import { OpenTextTab } from "../../Helpers/OpenNewTabFunctions";

interface TableRowProps {
    rowData: Record<string, any>;
    header: string[];
    maxColumnCount: number;
}

const TableRow: React.FC<TableRowProps> = ({rowData, header, maxColumnCount}) => {

    return (
        <tr key={JSON.stringify(rowData)}>
            {header
            .slice(0, maxColumnCount)
            .map(
                (colName) => (<td key={colName}>{rowData[colName]}</td>)
                )}
            <td>
                <Button type='button' onClick={() => {OpenTextTab(JSON.stringify(rowData))}}>View Result</Button>
            </td>
        </tr>
    )
}

export default TableRow;