import React from "react";

interface TableHeadProps {
    colNames: string[];
}

const TableHead: React.FC<TableHeadProps> = ({colNames}) => {
    return (
        <thead>
            <tr key='table-head'>
                {colNames.map((colName) => (<th key={colName}>{colName}</th>))}
                <th>Action</th>
            </tr>
        </thead>
    )
}

export default TableHead;