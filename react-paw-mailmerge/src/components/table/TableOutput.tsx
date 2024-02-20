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

const MaxColumnCount = 5;  // limits the number of columns displayed
const ItemsPerPage = 10;

const TableOutput: React.FC<TableOutputProps> = ({header, data, template}) => {
    // pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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

    return (
        <div>
            <Table striped bordered hover>
                <TableHead header={header} maxColumnCount={MaxColumnCount}/>
                <tbody>
                    {currentItems.map(
                        (item, index) => (<TableRow key={index} header={header} rowData={item} maxColumnCount={MaxColumnCount}/>)
                        )}
                </tbody>
            </Table>
            <Pagination>
                {paginationItems}
            </Pagination>
        </div>
    )
}

export default TableOutput;
