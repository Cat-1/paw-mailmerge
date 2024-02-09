import React from "react";

interface TableRowProps {
    rowData: Record<string, any>;
    index: number;
    keys: string[];
}
const TableRow: React.FC<TableRowProps> = ({rowData, index, keys}) => {

    return (
        <tr key={index}>
            {keys.map((key) => (<td key={key}>{rowData[key]}</td>))}
            <td>
                <button>View Result</button>
            </td>
        </tr>
    )
}

export default TableRow;