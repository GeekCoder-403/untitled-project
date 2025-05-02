import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import * as React from 'react';
import ReusableMenu from './Menu';
import { useState } from 'react';

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1);
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
                                        backgroundColor: 'secondary.main',
                                        color: 'black',
                                        borderBottom: '1px solid #6b7280',
                                        borderRight: '1px solid #6b7280',
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex} >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === 'action') {
                                            return (
                                                <TableCell key={`${rowIndex}-${column.id}`} align="center" sx={{ color: 'black', borderRight: '1px solid #6b7280' }}>
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
                                                <TableCell key={`${rowIndex}-${column.id}`} align={column.align} sx={{ color: 'black', borderRight: '1px solid #6b7280' }}>
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

            <Box className="flex items-center justify-between px-6 py-4">
                <Typography className="text-gray-800">
                    {page * rowsPerPage + 1}-{Math.min(page * rowsPerPage + rowsPerPage, rows.length)}/{rows.length} results
                </Typography>
                <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)}
                    page={page + 1}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                />
            </Box>

        </Paper>
    );
};

export default ReusableTable;
