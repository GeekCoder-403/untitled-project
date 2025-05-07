// This example page is for showing how the multiple apis is going to call 
// This page will be removed in future
// import { Box, Typography } from "@mui/material";
// import { MetaFunction } from "@remix-run/react";
// import { useState } from "react";
// import { postWithBodyExample, updateWithBodyExample, deleteWithBodyExample } from "~/services/Feature/feature.mutation";
// import { MessageResult } from "~/utils/interfaceCollection/ClientTypeInterfaces";

// export const meta: MetaFunction = () => ([
//     { title: "Home | Data Pipeline Engine" },
//     { name: "description", content: "Remix app development" },
// ]);


// const Route = () => {
//     const [response, setResponse] = useState<MessageResult | null>(null);

//     const { mutate: postMutate } = postWithBodyExample({
//         onSuccess: (data) => {
//             setResponse(data);

//         },
//         onError: (error) => {
//             console.error("Error:", error);
//         },
//     });

//     // PUT Mutation
//     const { mutate: putMutate } = updateWithBodyExample({
//         onSuccess: (data) => {
//             setResponse(data);
//         },
//         onError: (error) => {
//             console.error("Error:", error);
//         },
//     });

//     // DELETE Mutation
//     const { mutate: deleteMutate } = deleteWithBodyExample({
//         onSuccess: (data) => {
//             setResponse(data);
//         },
//         onError: (error) => {
//             console.error("Error:", error);
//         },
//     });

//     const handlePostClick = () => {
//         postMutate({ name: "Samsung" });
//     };

//     const handlePutClick = () => {
//         putMutate({ name: "Updated Samsung" });
//     };

//     const handleDeleteClick = () => {
//         deleteMutate({ name: "Samsung" });
//     };

//     return (
//         <Box sx={{ padding: 2 }}>
//             <Typography className="text-xl p-4 text-red-400 flex items-center justify-center capitalize">
//                 No item found
//             </Typography>

//             {/* Button to trigger POST */}
//             <button
//                 onClick={handlePostClick}
//                 className="px-4 py-2 bg-blue-500 text-white rounded m-2"
//             >
//                 Submit Data (POST)
//             </button>

//             {/* Button to trigger PUT */}
//             <button
//                 onClick={handlePutClick}
//                 className="px-4 py-2 bg-green-500 text-white rounded m-2"
//             >
//                 Update Data (PUT)
//             </button>

//             {/* Button to trigger DELETE */}
//             <button
//                 onClick={handleDeleteClick}
//                 className="px-4 py-2 bg-red-500 text-white rounded m-2"
//             >
//                 Delete Data (DELETE)
//             </button>

//             {/* Displaying Response */}
//             {response && (
//                 <Box className="mt-4 text-gray-600">
//                     <h2>Response:</h2>
//                     <pre>{JSON.stringify(response, null, 2)}</pre>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default Route;

import {
    Box,
    Grid2,
    Typography,
    TextField,
    InputAdornment
} from '@mui/material';
import { Link } from '@remix-run/react';
import { Plus, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import AutocompleteDropdown from '~/components/elements/AutoComplete';
import Button from '~/components/elements/Button';
import ReusableButtonGroup from '~/components/elements/ButtonGroup';
import ReusableTable from '~/components/elements/Table';

const route = () => {
    const [view, setView] = useState<'all' | 'pending review' | 'approved' | 'rejected'>('all');

    const [selectedRuleType, setSelectedRuleType] = useState<{ value: string; label: string } | null>(null);
    const [selectedSource, setSelectedSource] = useState<{ value: string; label: string } | null>(null);
    const [selectedTarget, setSelectedTarget] = useState<{ value: string; label: string } | null>(null);


    const ruleTypeOptions = [
        { value: "unit", label: "Unit Testing" },
        { value: "privacy", label: "Privacy Testing" },
        { value: "security", label: "Security Testing" },
    ];

    const sourceOptions = [
        { value: 'loans', label: 'Loans' },
        { value: 'accounts', label: 'Accounts' },
        { value: 'transactions', label: 'Transactions' },
    ];

    const targetOptions = [
        { value: 'grossBalance', label: 'Original Gross Book Balance' },
        { value: 'deferredBalance', label: 'Deferred Balance' },
        { value: 'amortization', label: 'Amortization Schedule' },
    ];

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
            ruleType: 'GenAI Suggested Rule',
            domain: 'Loan',
            entity: 'Loans',
            attribute: 'Original Gross Book Balance',
            ruleName: 'Original Gross Book Balance Currency Format Validation',
            ruleDescription: 'Should adhere to the standard currency format...',
            ruleDimension: 'Format',
            status: 'Pending',
        },
        {
            ruleType: 'GenAI Suggested Rule',
            domain: 'Loan',
            entity: 'Loans',
            attribute: 'Original Gross Book Balance',
            ruleName: 'Deferred Balance Integration',
            ruleDescription: 'Ensure correct integration of Deferred Balance...',
            ruleDimension: 'Integrity',
            status: 'Pending',
        },
    ];
    return (
        <Box className="h-full overflow-auto chat-scrollbar">
            <Grid2 container spacing={2} sx={{ padding: 2 }} >
                <Grid2 size={{ xs: 12, sm: 12, md: 4 }} className='p-4 bg-white rounded-md shadow-md h-full'>
                    <Typography variant="h6" gutterBottom className='text-tertiary'>
                        Select Source & Target
                    </Typography>

                    <Box className='mb-2 flex flex-col items-start gap-2 w-full'>
                        <Typography variant="body1" sx={{ color: "neutral.main" }}>Test cases</Typography>
                        <AutocompleteDropdown
                            id="rule-type"
                            name="ruleType"
                            value={selectedRuleType}
                            onChange={setSelectedRuleType}
                            placeholder="Choose your test cases"
                            options={ruleTypeOptions}
                            size="small"
                            sx={{ width: '100%' }}
                        />
                    </Box>

                    <Box className='mb-2 flex flex-col items-start gap-2 w-full'>
                        <Typography variant="body1" sx={{ color: "neutral.main" }}>Source</Typography>
                        <AutocompleteDropdown
                            id="source-type"
                            name="sourceType"
                            value={selectedSource}
                            onChange={setSelectedSource}
                            placeholder="Choose your source"
                            options={sourceOptions}
                            size="small"
                            sx={{ width: '100%' }}
                        />
                    </Box>

                    <Box className='mb-2 flex flex-col items-start gap-2 w-full'>
                        <Typography variant="body1" sx={{ color: "neutral.main" }}>Taret</Typography>
                        <AutocompleteDropdown
                            id="target-type"
                            name="targetType"
                            value={selectedTarget}
                            onChange={setSelectedTarget}
                            placeholder="Choose your target"
                            options={targetOptions}
                            size="small"
                            sx={{ width: '100%' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 2 }}>
                        <Button
                            variant="outlined"
                            sx={{
                                color: "primary.main",
                            }}
                        >
                            Clear All
                        </Button>
                    </Box>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 12, md: 8 }} className='p-4 bg-white rounded-md shadow-md h-full'>
                    <Box className='flex items-center justify-between pb-2'>
                        <Typography variant="h6" gutterBottom className='text-tertiary'>
                            Test Cases
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Link to={`/admin/home-admin/data-pipeline-engine/add`}>
                                <Button variant="outlined" sx={{ mr: 1 }}>Suggest Test Cases</Button>
                            </Link>
                            <Link to={`/admin/home-admin/data-pipeline-engine/add`}>
                                <Button variant="contained" startIcon={<Plus className="w-5 h-5" />}>Add BRD</Button>
                            </Link>
                        </Box>
                    </Box>
                    <Box className='w-full overflow-x-auto '>
                        <ReusableButtonGroup
                            buttons={[
                                { label: 'All', value: 'all' },
                                { label: 'Pending Review', value: 'pending review' },
                                { label: 'Approved', value: 'approved' },
                                { label: 'Rejected', value: 'rejected' },
                            ]}
                            selected={view}
                            onChange={(value) => setView(value)}
                        />
                    </Box>
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

                </Grid2>
            </Grid2>
        </Box>
    );
};

export default route;

