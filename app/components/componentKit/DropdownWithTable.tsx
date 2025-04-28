import React, { useState } from 'react'
import Dropdown from '../elements/Dropdown';
import { Box } from '@mui/material';
import ReusableTable from '../elements/Table';

const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' },
];

const columns = [
    { id: 'slno', label: 'Sl. no.', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'platform', label: 'Platform', minWidth: 150 },
    { id: 'status', label: 'Status', minWidth: 100, align: 'center' as const },
    { id: 'action', label: 'Action', minWidth: 50, align: 'center' as const },
];


const rows = [
    { slno: '1', name: 'test', platform: 'Subscription', status: 'pending' },
    { slno: '2', name: 'One', platform: 'Subscription', status: 'active' },
    { slno: '3', name: 'Two', platform: 'Subscription', status: 'inactive' },
    { slno: '4', name: 'Three', platform: 'Subscription', status: 'pending' },
    { slno: '5', name: 'Four', platform: 'Subscription', status: 'active' },
    { slno: '6', name: 'Five', platform: 'Subscription', status: 'inactive' },
    { slno: '7', name: 'Six', platform: 'Subscription', status: 'pending' },
    { slno: '8', name: 'Seven', platform: 'Subscription', status: 'active' },
    { slno: '9', name: 'Eight', platform: 'Subscription', status: 'inactive' },
    { slno: '10', name: 'Nine', platform: 'Subscription', status: 'pending' },
];


const DropdownWithTable = () => {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleSelectChange = (value: string | string[]) => {
        setSelectedValue(value as string);
    };

    return (
        <>
            <Dropdown
                id="allrequest"
                name="allrequest"
                label="allrequest"
                value={selectedValue}
                onChange={handleSelectChange}
                options={options}
                placeholder="All request"
                size="small"
            />
            <Box className="w-[50%]">
                <ReusableTable columns={columns} rows={rows} menuOptions={["Edit", "Delete", "Archive"]}
                    handleSelect={(option, row) => console.log(option, row)} />
            </Box>
        </>
    )
}

export default DropdownWithTable