import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import * as React from 'react';
import ReusableMenu from './Menu';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => string;
}

interface ReusableTableProps {
    columns: Column[];
    rows: any[];
    menuOptions?: string[];
    handleSelect?: (option: string, row: any) => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({ columns, rows, menuOptions, handleSelect }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: 'none',
            padding: '0',
            borderRadius: '0',
            border: '1px solid #6b7280',
        }}>
            <TableContainer
                sx={{
                    maxHeight: 440,
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{
                                        minWidth: column.minWidth,
                                        backgroundColor: '#85bec3',
                                        color: 'black',
                                        borderBottom: '1px solid #6b7280',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, rowIndex) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === 'action') {
                                            return (
                                                <TableCell key={`${rowIndex}-${column.id}`} align="center" sx={{ color: 'black' }}>
                                                    {menuOptions ? (
                                                        <ReusableMenu
                                                            options={menuOptions}
                                                            onSelect={(option) => handleSelect && handleSelect(option, row)}
                                                        />
                                                    ) : (
                                                        <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>No actions</span>
                                                    )}
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={`${rowIndex}-${column.id}`} align={column.align} sx={{ color: 'black' }}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    backgroundColor: "#ffffff",
                    borderTop: "1px solid #e0e0e0",
                    color: "#000000",
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                        color: "#000000",
                    },
                    '.MuiInputBase-root': {
                        color: "#000000",
                    },
                    '.MuiSvgIcon-root': {
                        color: "#000000",
                    },
                }}
            />
        </Paper>
    );
};

export default ReusableTable;
