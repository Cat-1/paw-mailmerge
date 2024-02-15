import React from "react";
import Button from "react-bootstrap/Button"

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
                <Button type='button'>View Result</Button>
            </td>
        </tr>
    )
}

export default TableRow;