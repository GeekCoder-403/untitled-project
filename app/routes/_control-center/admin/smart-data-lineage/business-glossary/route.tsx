import { Box } from "@mui/material";
import { MetaFunction } from "@remix-run/react";
import { Pencil, Plus, Trash } from "lucide-react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import PageHeader from "~/components/componentKit/PageHeader";
import CustomDialog from "~/components/elements/Dialog";
import ReusableTable from "~/components/elements/Table";
import LabeledTextField from "~/components/elements/TestField";
import {
    createGlossary,
    deleteGlossary,
    updateGlossary,
} from "~/services/BusinessGlossary/businessGlossary.mutation";
import {
    getAllDetails,
    getDetailsById,
} from "~/services/BusinessGlossary/businessGlossary.query";

export const meta: MetaFunction = () => [
    { title: "Business Glossary" },
    { name: "description", content: "Remix app development" },
];

type GlossaryItem = {
    _id: string;
    term: string;
    description: string;
};

const GlossaryRoute = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [term, setTerm] = useState("");
    const [description, setDescription] = useState("");

    const { data: glossaryData, isLoading: itemLoading, error: itemError, refetch } = getAllDetails();

    const { mutate: create } = createGlossary({
        onSuccess: () => {
            handleDialogClose();
            enqueueSnackbar("Glossary created successfully", { variant: "success" });
            refetch();
        },
        onError: () => {
            enqueueSnackbar("Error creating glossary", { variant: "error" });
        },
    });

    const { mutate: update } = updateGlossary({
        onSuccess: () => {
            handleDialogClose();
            enqueueSnackbar("Glossary updated successfully", { variant: "success" });
            refetch();
        },
        onError: () => {
            enqueueSnackbar("Error updating glossary", { variant: "error" });
        },
    });

    const { mutate: remove } = deleteGlossary({
        onSuccess: () => {
            enqueueSnackbar("Glossary deleted", { variant: "success" });
            refetch();
        },
        onError: () => {
            enqueueSnackbar("Error deleting glossary", { variant: "error" });
        },
    });

    const handleDialogClose = () => {
        setOpen(false);
        setEditingId(null);
        setTerm("");
        setDescription("");
    };

    const handleEdit = async (id: string) => {
        try {
            const data = await getDetailsById(id);
            const glossary = data.term;
            setEditingId(id);
            setTerm(glossary.term ?? "");
            setDescription(glossary.description ?? "");
            setOpen(true);
        } catch {
            enqueueSnackbar("Error loading glossary details", { variant: "error" });
        }
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this glossary item?")) {
            remove(id);
        }
    };

    const handleSubmit = () => {
        const payload = {
            term: term.trim(),
            description: description.trim(),
        };

        if (editingId) {
            update({ id: editingId, ...payload });
        } else {
            create(payload);
        }
    };

    const handleAddNew = () => {
        setEditingId(null);
        setTerm("");
        setDescription("");
        setOpen(true);
    };

    const rows =
        Array.isArray(glossaryData?.term) && glossaryData.term.length > 0
            ? glossaryData.term.map((item: GlossaryItem, index: number) => ({
                id: index + 1,
                _id: item._id,
                term: item.term,
                glossary: item.description,
            }))
            : [];

    const columns = [
        { id: "id", label: "S.No", minWidth: 50 },
        { id: "term", label: "Term", minWidth: 200 },
        { id: "glossary", label: "Glossary", minWidth: 400 },
        { id: "action", label: "Action", minWidth: 100, align: "center" as const },
    ];

    return (
        <>
            <PageHeader
                actionLabel="Glossary"
                actionOnClick={handleAddNew}
                actionIcon={<Plus className="w-4 h-4" />}
            />

            <Box className="p-12">
                {itemLoading ? (
                    <Box sx={{ textAlign: "center", py: 10 }}>Loading...</Box>
                ) : itemError ? (
                    <Box sx={{ textAlign: "center", py: 10, color: "error.main" }}>
                        Error loading glossary terms.
                    </Box>
                ) : rows.length > 0 ? (
                    <ReusableTable
                        columns={columns}
                        rows={rows}
                        showFooter={false}
                        menuOptions={[
                            {
                                label: "Edit",
                                icon: <Pencil size={16} />,
                                action: (row) => handleEdit(row._id),
                            },
                            {
                                label: "Delete",
                                icon: <Trash size={16} />,
                                action: (row) => handleDelete(row._id),
                            },
                        ]}
                    />
                ) : (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 10,
                            color: "text.secondary",
                            fontSize: "1.2rem",
                        }}
                    >
                        No glossary terms found. Click “Glossary” to add one.
                    </Box>
                )}
            </Box>

            <CustomDialog
                open={open}
                onClose={handleDialogClose}
                title={editingId ? "Edit Glossary Term" : "Add Glossary Term"}
                onSubmit={handleSubmit}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
    );
};

export default GlossaryRoute;
