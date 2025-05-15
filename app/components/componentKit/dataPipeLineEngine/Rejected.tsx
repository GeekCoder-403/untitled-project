import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { SearchIcon } from "lucide-react";
import { useMemo } from "react";
import Button from "~/components/elements/Button";
import ReusableTable from "~/components/elements/Table";
import { getAllPipelineDetails } from "~/services/DataPipeline/dataPipeline.query";

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
        // { id: "action", label: "Action", minWidth: 100, align: "center" as const },
    ];
    const { data, isLoading, isError } = getAllPipelineDetails("Rejected");

    const rows = useMemo(() => {
        return data?.data.map((item, idx) => ({
            id: item.id,
            ruleType: item.ruleType,
            domain: item.domain,
            entity: item.entity,
            attribute: item.attribute,
            ruleName: item.ruleName,
            ruleDescription: item.ruleDescription,
            ruleDimension: item.ruleDimension,
            status: item.status,
        })) ?? [];
    }, [data]);

    if (isLoading) return <Typography className="text-center p-10 text-tertiary">Loading...</Typography>;
    if (isError) return <Typography color="error" className="text-center p-10">Failed to load data.</Typography>;
    if (!rows.length) {
        return (
            <Box className="flex flex-col items-center justify-center h-64 gap-4">
                <Typography variant="h6" color="text.secondary">
                    No rules available.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Click on "Add" to create a new rule.
                </Typography>
                <Button variant="outlined">Add Rule</Button>
            </Box>
        );
    }

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
                        menuOptions={[
                            {
                                label: "Edit",
                                action: (row: any) => {
                                    console.log("Edit clicked", row);
                                }
                            },
                            {
                                label: "Approved",
                                action: (row: any) => {
                                    console.log("Approve clicked", row);
                                }
                            },
                            {
                                label: "Rejected",
                                action: (row: any) => {
                                    console.log("Reject clicked", row);
                                }
                            },
                        ]}
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