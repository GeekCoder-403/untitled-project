import {
    Box,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import Button from "~/components/elements/Button";
import CustomDialog from "~/components/elements/Dialog";
import ReusableTable from "~/components/elements/Table";
import LabeledTextField from "~/components/elements/TestField";
import { getAllPipelineDetails, getRulesById } from "~/services/DataPipeline/dataPipeline.query";
import { useUpdateRules } from "~/services/DataPipeline/dataPipeline.mutation";
import { Rule } from "~/utils/interfaceCollection/DataPipelineInterfaces";

const All = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { data, isLoading, isError, refetch } = getAllPipelineDetails();
    const updateMutation = useUpdateRules();

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState<Omit<Rule, 'id' | '_rid' | '_self' | '_etag' | '_attachments' | '_ts' | 'createdAt'>>({
        ruleType: "",
        domain: "",
        entity: "",
        attribute: "",
        ruleName: "",
        ruleDescription: "",
        ruleDimension: "",
        status: "Pending",
    });

    const handleDialogClose = () => {
        setOpen(false);
        setEditingId(null);
    };

    const { mutate: update } = useUpdateRules({
        onSuccess: () => {
            handleDialogClose();
            enqueueSnackbar("Rule updated successfully", { variant: "success" });
            refetch();
        },
        onError: () => {
            enqueueSnackbar("Error updating rule", { variant: "error" });
        },
    });

    const handleSubmit = async () => {
        if (!editingId) return;

        try {
            await updateMutation.mutateAsync({ id: editingId, ...formData });
            enqueueSnackbar("Rule updated successfully", { variant: "success" });
            handleDialogClose();
            refetch();
        } catch (error) {
            enqueueSnackbar("Failed to update rule", { variant: "error" });
        }
    };

    const handleEdit = async (row: Rule) => {
        try {
            const rule = await getRulesById(row.id);
            setEditingId(rule.id);
            setFormData({
                ruleType: rule.ruleType,
                domain: rule.domain,
                entity: rule.entity,
                attribute: rule.attribute,
                ruleName: rule.ruleName,
                ruleDescription: rule.ruleDescription,
                ruleDimension: rule.ruleDimension,
                status: rule.status,
            });
            setOpen(true);
        } catch {
            enqueueSnackbar("Error loading rule details", { variant: "error" });
        }
    };

    const handleStatusUpdate = async (row: Rule, newStatus: Rule["status"]) => {
        if (row.status === newStatus) {
            enqueueSnackbar(`Already ${newStatus}`, { variant: "info" });
            return;
        }
        try {
            await updateMutation.mutateAsync({ id: row.id, status: newStatus });
            enqueueSnackbar(`Status updated to ${newStatus}`, { variant: "success" });
            refetch();
        } catch {
            enqueueSnackbar("Failed to update status", { variant: "error" });
        }
    };

    const columns = [
        { id: "ruleType", label: "Rule Type" },
        { id: "domain", label: "Domain" },
        { id: "entity", label: "Entity" },
        { id: "attribute", label: "Attribute" },
        { id: "ruleName", label: "Rule Name" },
        { id: "ruleDescription", label: "Rule Description" },
        { id: "ruleDimension", label: "Rule Dimension" },
        { id: "status", label: "Status" },
        { id: "action", label: "Action", minWidth: 100, align: "center" as const },
    ];

    const rows = useMemo(() => {
        if (!data?.data) return [];
        return data.data.map((item) => ({
            ...item,
        }));
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
            <Box className="flex flex-col items-start gap-4 mt-4">
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

                <Box className="w-full">
                    <ReusableTable
                        columns={columns}
                        rows={rows}
                        enableCheckbox
                        showFooter={false}
                        menuOptions={[
                            { label: "Edit", action: handleEdit },
                            { label: "Approved", action: (row) => handleStatusUpdate(row, "Approved") },
                            { label: "Rejected", action: (row) => handleStatusUpdate(row, "Rejected") },
                        ]}
                    />
                </Box>
            </Box>

            <CustomDialog
                open={open}
                onClose={handleDialogClose}
                title={editingId ? "Edit Rule" : "Add Rule"}
                onSubmit={handleSubmit}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <LabeledTextField
                        label="Rule Type"
                        required
                        value={formData.ruleType || ""}
                        onChange={(e) => setFormData({ ...formData, ruleType: e.target.value })}
                    />
                    <LabeledTextField
                        label="Domain"
                        required
                        value={formData.domain || ""}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    />
                    <LabeledTextField
                        label="Entity"
                        required
                        value={formData.entity || ""}
                        onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                    />
                    <LabeledTextField
                        label="Attribute"
                        required
                        value={formData.attribute || ""}
                        onChange={(e) => setFormData({ ...formData, attribute: e.target.value })}
                    />
                    <LabeledTextField
                        label="Rule Name"
                        required
                        value={formData.ruleName || ""}
                        onChange={(e) => setFormData({ ...formData, ruleName: e.target.value })}
                    />
                    <LabeledTextField
                        label="Description"
                        required
                        multiline
                        minRows={3}
                        value={formData.ruleDescription || ""}
                        onChange={(e) => setFormData({ ...formData, ruleDescription: e.target.value })}
                        autoResize
                    />
                    <LabeledTextField
                        label="Dimension"
                        required
                        value={formData.ruleDimension || ""}
                        onChange={(e) => setFormData({ ...formData, ruleDimension: e.target.value })}
                    />
                </Box>
            </CustomDialog>
        </>
    );
};

export default All;
