import { Box, InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "lucide-react";
import Button from "~/components/elements/Button";
import ReusableTable from "~/components/elements/Table";

const Rejected = () => {
    const columns = [
        { id: 'ruleType', label: 'Rule Type' },
        { id: 'domain', label: 'Domain' },
        { id: 'entity', label: 'Entity' },
        { id: 'attribute', label: 'Attribute' },
        { id: 'ruleName', label: 'Rule Name' },
        { id: 'ruleDescription', label: 'Rule Description' },
        { id: 'ruleDimension', label: 'Rule Dimension' },
        { id: 'status', label: 'Status' },
    ];
    const rows = [
        {
            id: 1,
            ruleType: 'Security Test',
            domain: 'Accounts',
            entity: 'Accounts',
            attribute: 'Account Number',
            ruleName: 'Mask Account Number',
            ruleDescription: 'Ensures account numbers are masked in logs.',
            ruleDimension: 'Security',
            status: 'Rejected',
        }
    ];

    return (
        <>
            <Box className='flex flex-col items-start gap-4 mt-4'>
                <TextField
                    placeholder="Search rule name"
                    variant="outlined"
                    size="small"
                    sx={{
                        width: '50%',
                        '& .MuiOutlinedInput-root': {
                            color: 'tertiary.main',
                            '& fieldset': {
                                borderColor: 'tertiary.main',
                            },
                            '&:hover fieldset': {
                                borderColor: 'tertiary.main',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'tertiary.main',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'tertiary.main',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon className='w-5 h-5 text-tertiary' />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box className='w-full'>
                    <ReusableTable
                        columns={columns}
                        rows={rows}
                        enableCheckbox
                        showFooter={false}
                    />
                </Box>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="outlined" sx={{ mr: 1 }}>Reject</Button>
                <Button variant="contained">Approve</Button>
            </Box>
        </>
    )
}

export default Rejected