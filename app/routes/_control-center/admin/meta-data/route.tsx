import {
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Switch,
    TextField,
    FormControlLabel,
    Grid2,
    InputAdornment,
    Chip,
    Paper
} from "@mui/material";
import { Plus } from "lucide-react";
import { useState } from "react";
import Button from "~/components/elements/Button";

const steps = ["Basic Details", "Tasks", "Relationships", "Review & Execute"];

export default function CreatePlan() {
    const [activeStep, setActiveStep] = useState(0);
    const [planName, setPlanName] = useState("");
    const [dataGenEnabled, setDataGenEnabled] = useState(true);
    const [validationEnabled, setValidationEnabled] = useState(true);

    const handleNext = () => {
        if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (activeStep > 0) setActiveStep((prev) => prev - 1);
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
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

                            <Typography variant="h6" sx={{ color: 'tertiary.main' }}>
                                Plan Configuration
                            </Typography>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={dataGenEnabled}
                                        onChange={() => setDataGenEnabled(!dataGenEnabled)}
                                    />
                                }
                                sx={{
                                    color: 'tertiary.main',
                                    '& .MuiFormControlLabel-label': {
                                        color: 'tertiary.main',
                                    },
                                }}
                                label="Enable Data Generation"
                            />

                            <Typography variant="body2" sx={{ color: 'tertiary.main' }}>
                                When enabled, data will be generated according to the plan configuration.
                            </Typography>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={validationEnabled}
                                        onChange={() => setValidationEnabled(!validationEnabled)}
                                    />
                                }
                                sx={{
                                    color: 'tertiary.main',
                                    '& .MuiFormControlLabel-label': {
                                        color: 'tertiary.main',
                                    },
                                }}
                                label="Enable Validation"
                            />

                            <Typography variant="body2" sx={{ color: 'tertiary.main' }}>
                                When enabled, validation rules will be applied to the generated data.
                            </Typography>
                        </Box>

                    </>
                );
            case 1:
                return (
                    <>
                        <Box className="flex flex-col items-start gap-2">
                            <Typography variant="h5" sx={{ color: 'tertiary.main', paddingBottom: 2 }}>
                                Tasks
                            </Typography>
                            <Button variant="contained" startIcon={<Plus />} className="bg-tertiary">
                                Add Task
                            </Button>
                        </Box>
                    </>
                );
            case 2:
                return (
                    <>
                        <Box className="flex flex-col items-start gap-2">
                            <Typography variant="h5" sx={{ color: 'tertiary.main', paddingBottom: 2 }}>
                                Relationships
                            </Typography>
                            <Box className="flex gap-2">
                                <Button variant="contained" startIcon={<Plus />} className="bg-tertiary capitalize">
                                    relationship
                                </Button>
                                <Button variant="contained" className="bg-secondary.main capitalize">
                                    example
                                </Button>
                            </Box>
                        </Box>
                    </>
                );
            case 3:
                return (
                    <>
                        <Box className="flex flex-col items-start gap-2">
                            <Typography variant="h5" sx={{ color: 'tertiary.main', paddingBottom: 2 }}>
                                Review & Execute
                            </Typography>
                            <Box >
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
                                {/* Tasks Section */}
                                <Typography variant="h6" className=" text-tertiary">
                                    Tasks
                                </Typography>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor: "#dff7fc", // light blue
                                        border: "1px solid #b6ebf7",
                                        padding: 2,
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography sx={{ color: "#004d61" }}>
                                        No tasks defined. Add tasks in the Tasks section.
                                    </Typography>
                                </Paper>
                            </Box>

                            <Box>
                                {/* Validation Section */}
                                <Typography variant="h6" className=" text-tertiary">
                                    Validation
                                </Typography>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor: "#dff7fc",
                                        border: "1px solid #b6ebf7",
                                        padding: 2,
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography sx={{ color: "#004d61" }}>
                                        Validation is enabled but no validation rules have been defined yet.
                                    </Typography>
                                </Paper>
                            </Box>
                            <Box className="flex gap-2">
                                <Button variant="contained" className="bg-primary capitalize">
                                    save
                                </Button>
                                <Button variant="contained" className="bg-red-500 capitalize">
                                    delete data
                                </Button>
                                <Button variant="contained" className="bg-green-500 capitalize">
                                    execte
                                </Button>
                            </Box>
                        </Box >
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Box className="h-full overflow-auto " sx={{ padding: 4 }}>
            <Box className=" flex items-center justify-between mb-4">
                <Typography variant="h5" className="text-tertiary">
                    Create new plan
                </Typography>

                {/* Progress Bar */}
                <Box sx={{ width: "50%" }}>
                    <Box
                        sx={{
                            height: 12,
                            borderRadius: 5,
                            backgroundColor: "#e0e0e0",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                width: `${((activeStep + 1) / steps.length) * 100}%`,
                                backgroundColor: "primary.main",
                                transition: "width 0.3s ease",
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 12, md: 4 }} className='p-4 bg-white rounded-md shadow-md h-full'>
                    <Stepper
                        activeStep={activeStep}
                        orientation="vertical"
                        connector={<></>}
                    >
                        {steps.map((label, index) => {
                            const isActive = index === activeStep;

                            return (
                                <Step
                                    key={label}
                                    completed={false}
                                    onClick={() => setActiveStep(index)}
                                    sx={{
                                        cursor: "pointer",
                                        backgroundColor: isActive ? "secondary.main" : "",
                                        color: isActive ? "primary.main" : "",
                                        borderRadius: 1,
                                        px: 2,
                                        py: 1,
                                        mb: 1,
                                        transition: "background-color 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: "secondary.main",
                                        },
                                        "& .MuiStepLabel-label": {
                                            color: isActive ? "primary.main" : "neutral.main",
                                        },
                                        "& .MuiStepIcon-root": {
                                            color: isActive ? "primary.main" : "neutral.main",
                                        },
                                    }}
                                >
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                </Grid2>

                <Grid2 size={{ xs: 12, sm: 12, md: 8 }} className='p-4 bg-white rounded-md shadow-md h-full'>
                    {renderStepContent(activeStep)}

                    <Box className="flex items-center justify-between mt-4">
                        <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
                            Back
                        </Button>
                        <Button variant="contained" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                    {/* </Box> */}
                </Grid2>
            </Grid2>
        </Box>
    );
}
