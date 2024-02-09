import React from "react";

interface TableHeadProps {
    keys: string[];
}
const TableHead: React.FC<TableHeadProps> = ({keys}) => {
    return (
        <tr key='table-head'>
            {keys.map((key) => (<th key={key}>{key}</th>))}
            <th>Action</th>
        </tr>
    )
}

export default TableHead;