import { Box } from "@mui/material";
import { MetaFunction } from "@remix-run/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import PageHeader from "~/components/componentKit/PageHeader";
import CustomDialog from "~/components/elements/Dialog";
import ReusableTable from "~/components/elements/Table";
import LabeledTextField from "~/components/elements/TestField";

import glossaryData from "~/data/businessGlossary.json";
import { BusinessGlossaryItem } from "~/utils/interfaceCollection/ExampleInterface";

export const meta: MetaFunction = () => ([
    { title: "Business Glossary" },
    { name: "description", content: "Remix app development" },
]);

const route = () => {
    const [open, setOpen] = useState(false);
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');

    const rows = (glossaryData as BusinessGlossaryItem[]).map((item, index) => ({
        id: index + 1,
        term: item.term,
        glossary: item.definition,
        definition: item.definition,
    }));

    const columns = [
        { id: 'id', label: 'S.No', minWidth: 50 },
        { id: 'term', label: 'Term', minWidth: 200 },
        { id: 'glossary', label: 'Glossary', minWidth: 400 },
        { id: 'action', label: 'Action', minWidth: 100, align: 'center' as const },
    ];

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

export default route;
