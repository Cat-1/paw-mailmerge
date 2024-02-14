import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import Pagination from 'react-bootstrap/Pagination';

interface TableOutputProps {
    header: string[];
    data: Record<string, any>[];
    template: string;
}

const TableOutput: React.FC<TableOutputProps> = ({header, data, template}) => {
    // pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const ItemsPerPage = 10;
    const indexOfLastItem = currentPage * ItemsPerPage;
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginationItems = [];
    for (let pageNum = 1; pageNum  <= Math.ceil(data.length / ItemsPerPage); pageNum++) {
        paginationItems.push(
            <Pagination.Item key={pageNum} active={pageNum === currentPage} onClick={() => handlePageChange(pageNum)}>
                {pageNum}
            </Pagination.Item>,
        )
    }

    // limit the number of columns displayed
    const MaxColumnCount = 5;
    const colNamesTruncated = header.slice(0, MaxColumnCount)
    // TODO: filter out _parsed_extras
    
    return (
        <div>
            <Table striped bordered hover>
                <TableHead colNames={colNamesTruncated}/>
                <tbody>
                    {currentItems.map((item, index) => (<TableRow key={index} colNames={colNamesTruncated} rowData={item}/>))}
                </tbody>
            </Table>
            <Pagination>
                {paginationItems}
            </Pagination>
        </div>
    )
}

export default TableOutput;
