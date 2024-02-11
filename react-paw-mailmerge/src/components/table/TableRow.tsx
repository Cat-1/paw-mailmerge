import React from "react";
import Button from "react-bootstrap/Button"

interface TableRowProps {
    rowData: Record<string, any>;
    colNames: string[];
}

const TableRow: React.FC<TableRowProps> = ({rowData, colNames}) => {

    return (
        <tr key={JSON.stringify(rowData)}>
            {colNames.map(
                (colName) => (<td key={colName}>{rowData[colName]}</td>)
                )}
            <td>
                <Button type='button'>View Result</Button>
            </td>
        </tr>
    )
}

export default TableRow;