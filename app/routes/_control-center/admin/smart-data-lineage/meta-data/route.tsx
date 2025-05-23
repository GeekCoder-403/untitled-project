import { Box, Typography, Grid2 } from "@mui/material";
import { useState } from "react";
import { StepContent } from "~/components/componentKit/metaData/StepContent";
import Button from "~/components/elements/Button";
import { StepperNavigation } from "~/components/elements/StepperNavigation";

const steps = ["Basic Details", "Tasks", "Relationships", "Review & Execute"];

export default function CreatePlan() {
    const [activeStep, setActiveStep] = useState(0);
    const [dataGenEnabled, setDataGenEnabled] = useState(true);
    const [validationEnabled, setValidationEnabled] = useState(true);

    const handleNext = () => {
        if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (activeStep > 0) setActiveStep((prev) => prev - 1);
    };

    return (
        <Box className="h-full overflow-auto" sx={{ padding: 4 }}>
            <Box className="flex items-center justify-between mb-4">
                <Typography variant="h5" className="text-tertiary">
                    Create new plan
                </Typography>

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
                    <StepperNavigation steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 12, md: 8 }} className='p-4 bg-white rounded-md shadow-md h-full'>
                    <StepContent
                        step={activeStep}
                        dataGenEnabled={dataGenEnabled}
                        validationEnabled={validationEnabled}
                        setDataGenEnabled={setDataGenEnabled}
                        setValidationEnabled={setValidationEnabled}
                    />

                    <Box className="flex items-center justify-between mt-4">
                        <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>Back</Button>
                        <Button variant="contained" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}
