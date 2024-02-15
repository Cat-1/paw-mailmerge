import React from "react";

interface TableHeadProps {
    header: string[];
    maxColumnCount: number;
}

const TableHead: React.FC<TableHeadProps> = ({header, maxColumnCount}) => {
    return (
        <thead>
            <tr key='table-head'>
                {header
                .slice(0, maxColumnCount)
                .map(
                    (colName) => (<th key={colName}>{colName}</th>)
                    )}
                <th>Action</th>
            </tr>
        </thead>
    )
}

export default TableHead;