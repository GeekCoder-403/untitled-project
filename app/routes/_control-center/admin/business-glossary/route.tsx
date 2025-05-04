import { Box, TextField, Typography } from "@mui/material";
import { Link, MetaFunction } from "@remix-run/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import PageHeader from "~/components/componentKit/PageHeader";
import Button from "~/components/elements/Button";
import CustomDialog from "~/components/elements/Dialog";
import ReusableTable from "~/components/elements/Table";
import LabeledTextField from "~/components/elements/TestField";

export const meta: MetaFunction = () => ([
    { title: "Business Glossary" },
    { name: "description", content: "Remix app development" },
]);

const route = () => {
    const [open, setOpen] = useState(false);
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');

    // ✅ Make rows a state
    const [rows, setRows] = useState([
        {
            slno: 1,
            term: 'transactioncount',
            definition: 'transactioncount A numeric field that stores the number of transactions that have been processed in a specific time period.'
        },
        {
            slno: 2,
            term: 'operating hours',
            definition: 'Operating Hours: A measure that indicates the total time an equipment or system has been in operation.'
        },
    ]);

    const columns = [
        { id: 'slno', label: 'S.No', minWidth: 50 },
        { id: 'term', label: 'Term', minWidth: 150 },
        { id: 'definition', label: 'Definition', minWidth: 300 },
        { id: 'action', label: 'Action', minWidth: 50, align: 'center' as const },
    ];
    return (
        <>
            <PageHeader
                actionLabel="Glossary"
                actionOnClick={() => setOpen(true)}
                actionIcon={<Plus className="w-4 h-4" />}
            />
            <Box className="p-12">
                <ReusableTable columns={columns} rows={rows} showFooter={false} menuOptions={["Edit", "Delete", "Archive"]}
                    handleSelect={(option, row) => console.log(option, row)} />
            </Box>
            <CustomDialog
                open={open}
                onClose={() => setOpen(false)}
                title="Add Business Glossary"
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <LabeledTextField
                        label="Term"
                        required
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <LabeledTextField
                        label="Definition"
                        required
                        multiline
                        minRows={3}
                        value={definition}
                        onChange={(e) => setDefinition(e.target.value)}
                        autoResize
                    />
                </Box>
            </CustomDialog>
        </>
    )
}

export default route