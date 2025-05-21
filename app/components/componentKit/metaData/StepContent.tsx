import { Box, Typography, TextField, FormControlLabel, Switch, Chip, Paper } from "@mui/material";
import { Plus } from "lucide-react";
import Button from "~/components/elements/Button";
import IOSSwitch from "~/components/elements/IOSSwitch";

export const StepContent = ({
    step,
    dataGenEnabled,
    validationEnabled,
    setDataGenEnabled,
    setValidationEnabled
}: {
    step: number;
    dataGenEnabled: boolean;
    validationEnabled: boolean;
    setDataGenEnabled: (v: boolean) => void;
    setValidationEnabled: (v: boolean) => void;
}) => {
    switch (step) {
        case 0:
            return (
                <Box className="flex flex-col items-start gap-2">
                    <Typography variant="h5" sx={{ color: 'tertiary.main', paddingBottom: 2 }}>
                        Basic Details
                    </Typography>

                    <TextField
                        placeholder="Plan Name"
                        variant="outlined"
                        size="small"
                        sx={{
                            width: '100%',
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
                            '& .MuiInputLabel-root': {
                                color: 'tertiary.main',
                            },
                        }}
                    />

                    <Typography variant="h6" sx={{ color: 'tertiary.main' }}>Plan Configuration</Typography>

                    <FormControlLabel
                        control={
                            <IOSSwitch
                                checked={dataGenEnabled}
                                onChange={() => setDataGenEnabled(!dataGenEnabled)}
                            />
                        }
                        sx={{
                            color: 'tertiary.main',
                            '& .MuiFormControlLabel-label': { color: 'tertiary.main' }
                        }}
                        label="Enable Data Generation"
                    />

                    <Typography variant="body2" sx={{ color: 'tertiary.main' }}>
                        When enabled, data will be generated according to the plan configuration.
                    </Typography>

                    <FormControlLabel
                        control={
                            <IOSSwitch
                                checked={validationEnabled}
                                onChange={() => setValidationEnabled(!validationEnabled)}
                            />
                        }
                        sx={{

                            color: 'tertiary.main',
                            '& .MuiFormControlLabel-label': { color: 'tertiary.main' }
                        }}
                        label="Enable Validation"
                    />

                    <Typography variant="body2" sx={{ color: 'tertiary.main' }}>
                        When enabled, validation rules will be applied to the generated data.
                    </Typography>
                </Box>
            );
        case 1:
            return (
                <Box className="flex flex-col items-start gap-2">
                    <Typography variant="h5" sx={{ color: 'tertiary.main', paddingBottom: 2 }}>Tasks</Typography>
                    <Button variant="contained" startIcon={<Plus />} className="bg-tertiary">Add Task</Button>
                </Box>
            );
        case 2:
            return (
                <Box className="flex flex-col items-start gap-2">
                    <Typography variant="h5" sx={{ color: 'tertiary.main', paddingBottom: 2 }}>Relationships</Typography>
                    <Box className="flex gap-2">
                        <Button variant="contained" startIcon={<Plus />} className="bg-tertiary capitalize">relationship</Button>
                        <Button variant="contained" className="bg-secondary.main capitalize">example</Button>
                    </Box>
                </Box>
            );
        case 3:
            return (
                <Box className="flex flex-col items-start gap-2">
                    <Typography variant="h5" sx={{ color: 'tertiary.main', paddingBottom: 2 }}>Review & Execute</Typography>

                    <Box>
                        <Typography className=" text-tertiary" variant="h6">Plan Summary</Typography>
                        <Typography className=" text-tertiary"><strong>Name:</strong> my-plan</Typography>
                        <Typography className=" text-tertiary"><strong>Total Tasks:</strong> 0</Typography>
                        <Typography className=" text-tertiary"><strong>Total Relationships:</strong> 0</Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" className=" text-tertiary">Configuration</Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                            <Chip label="Data Generation: Enabled" color="success" size="small" />
                            <Chip label="Validation: Enabled" color="success" size="small" />
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" className=" text-tertiary">Tasks</Typography>
                        <Paper elevation={0} sx={{
                            backgroundColor: "#dff7fc",
                            border: "1px solid #b6ebf7",
                            padding: 2,
                            borderRadius: 1,
                        }}>
                            <Typography sx={{ color: "#004d61" }}>
                                No tasks defined. Add tasks in the Tasks section.
                            </Typography>
                        </Paper>
                    </Box>

                    <Box>
                        <Typography variant="h6" className=" text-tertiary">Validation</Typography>
                        <Paper elevation={0} sx={{
                            backgroundColor: "#dff7fc",
                            border: "1px solid #b6ebf7",
                            padding: 2,
                            borderRadius: 1,
                        }}>
                            <Typography sx={{ color: "#004d61" }}>
                                Validation is enabled but no validation rules have been defined yet.
                            </Typography>
                        </Paper>
                    </Box>

                    <Box className="flex gap-2">
                        <Button variant="contained" className="bg-primary capitalize">save</Button>
                        <Button variant="contained" className="bg-red-500 capitalize">delete data</Button>
                        <Button variant="contained" className="bg-green-500 capitalize">execute</Button>
                    </Box>
                </Box>
            );
        default:
            return null;
    }
};
