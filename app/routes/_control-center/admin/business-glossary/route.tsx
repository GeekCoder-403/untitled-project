import { Box } from "@mui/material";
import { MetaFunction } from "@remix-run/react";
import { Plus } from "lucide-react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import PageHeader from "~/components/componentKit/PageHeader";
import CustomDialog from "~/components/elements/Dialog";
import ReusableTable from "~/components/elements/Table";
import LabeledTextField from "~/components/elements/TestField";
import { createGlossary } from "~/services/Feature/feature.mutation";

import { getGlossaryDetails } from "~/services/Feature/feature.query";

export const meta: MetaFunction = () => ([
    { title: "Business Glossary" },
    { name: "description", content: "Remix app development" },
]);

const route = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [term, setTerm] = useState('');
    const [description, setDescription] = useState('');
    // get api calling
    const { data: itemResponse, isLoading: itemLoading, error: itemError } = getGlossaryDetails();

    const rows = (itemResponse ?? []).map((item, index) => ({
        id: index + 1,
        term: item.term,
        glossary: item.description,
    }));


    const columns = [
        { id: 'id', label: 'S.No', minWidth: 50 },
        { id: 'term', label: 'Term', minWidth: 200 },
        { id: 'glossary', label: 'Glossary', minWidth: 400 },
        { id: 'action', label: 'Action', minWidth: 100, align: 'center' as const },
    ];

    if (itemLoading) return <Box sx={{ padding: 2, textAlign: 'center', color: 'secondary.main' }}>Loading...</Box>;
    if (itemError) return <Box sx={{ padding: 2 }}>Error loading details.</Box>;

    // Create API
    const { mutate } = createGlossary({
        onSuccess: () => {
            setOpen(false);
            setTerm('');
            setDescription('');
            enqueueSnackbar('Glossary created successfully', { variant: 'success' });
        },
        onError: (error) => {
            enqueueSnackbar('Error creating glossary', { variant: 'error' });
        },
    });

    const handleSubmit = () => {
        mutate({
            term,
            description
        });
    };



    return (
        <>
            <PageHeader
                actionLabel="Glossary"
                actionOnClick={() => setOpen(true)}
                actionIcon={<Plus className="w-4 h-4" />}
            />
            <Box className="p-12">
                <ReusableTable
                    columns={columns}
                    rows={rows}
                    showFooter={false}
                    menuOptions={["Edit", "Delete", "Archive"]}
                />
            </Box>
            <CustomDialog
                open={open}
                onClose={() => setOpen(false)}
                title="Add Business Glossary"
                onSubmit={handleSubmit}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <LabeledTextField
                        label="Term"
                        required
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <LabeledTextField
                        label="Description"
                        required
                        multiline
                        minRows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        autoResize
                    />
                </Box>

            </CustomDialog>
        </>
    )
}

export default route;
