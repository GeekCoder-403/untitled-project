import {
    Box,
    Checkbox,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
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
    enableCheckbox?: boolean;
    onRowSelectChange?: (selectedRows: any[]) => void;
    showFooter?: boolean; // ✅ NEW prop
}

const ReusableTable: React.FC<ReusableTableProps> = ({
    columns,
    rows,
    menuOptions,
    handleSelect,
    enableCheckbox = false,
    onRowSelectChange,
    showFooter = true // ✅ default true
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
            setSelectedRows(newSelected);
            onRowSelectChange && onRowSelectChange(newSelected);
        } else {
            setSelectedRows([]);
            onRowSelectChange && onRowSelectChange([]);
        }
    };

    const handleRowCheckboxChange = (row: any) => {
        const isSelected = selectedRows.some((r) => r === row);
        let newSelected: any[];
        if (isSelected) {
            newSelected = selectedRows.filter((r) => r !== row);
        } else {
            newSelected = [...selectedRows, row];
        }
        setSelectedRows(newSelected);
        onRowSelectChange && onRowSelectChange(newSelected);
    };

    const isRowSelected = (row: any) => selectedRows.some((r) => r === row);

    return (
        <Paper sx={{
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: 'none',
            padding: '0',
            borderRadius: '0',
            border: '1px solid #6b7280',
        }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {enableCheckbox && (
                                <TableCell
                                    padding="checkbox"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: 'primary.main',
                                        borderBottom: '1px solid #6b7280',
                                        borderRight: '1px solid #6b7280',
                                    }}
                                >
                                    <Checkbox
                                        color="primary"
                                        indeterminate={
                                            selectedRows.length > 0 &&
                                            selectedRows.length < rowsPerPage &&
                                            selectedRows.length < rows.length
                                        }
                                        checked={
                                            rows.length > 0 &&
                                            selectedRows.length === Math.min(rowsPerPage, rows.length - page * rowsPerPage)
                                        }
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all rows',
                                        }}
                                    />
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{
                                        minWidth: column.minWidth,
                                        backgroundColor: enableCheckbox ? 'white' : 'neutral.main',
                                        color: enableCheckbox ? 'primary.main' : 'black',
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
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={rowIndex}
                                    selected={enableCheckbox ? isRowSelected(row) : false}
                                >
                                    {enableCheckbox && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isRowSelected(row)}
                                                onChange={() => handleRowCheckboxChange(row)}
                                            />
                                        </TableCell>
                                    )}

                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === 'action') {
                                            return (
                                                <TableCell
                                                    key={`${rowIndex}-${column.id}`}
                                                    align="center"
                                                    sx={{
                                                        color: 'black',
                                                        borderRight: '1px solid #6b7280',
                                                    }}
                                                >
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
                                                <TableCell
                                                    key={`${rowIndex}-${column.id}`}
                                                    align={column.align}
                                                    sx={{ color: 'black', borderRight: '1px solid #6b7280' }}
                                                >
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

            {/* ✅ Optional footer */}
            {showFooter && (
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
            )}
        </Paper>
    );
};

export default ReusableTable;
