import React from "react";
import Button from "react-bootstrap/Button"

interface TableRowProps {
    rowData: Record<string, any>;
    index: number;
    keys: string[];
}
const TableRow: React.FC<TableRowProps> = ({rowData, index, keys}) => {

    return (
        <tr key={index}>
            {keys.map(
                (key) => (<td key={key}>{rowData[key]}</td>)
                )}
            <td>
                <Button type='button'>View Result</Button>
            </td>
        </tr>
    )
}

export default TableRow;