import { Stepper, Step, StepLabel } from "@mui/material";

export const StepperNavigation = ({ steps, activeStep, setActiveStep }: {
    steps: string[];
    activeStep: number;
    setActiveStep: (step: number) => void;
}) => (
    <Stepper activeStep={activeStep} orientation="vertical" connector={<></>}>
        {steps.map((label, index) => {
            const isActive = index === activeStep;

            return (
                <Step
                    key={label}
                    completed={false}
                    onClick={() => setActiveStep(index)}
                    sx={{
                        cursor: "pointer",
                        backgroundColor: isActive ? "#e6fbf7" : "",
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        mb: 1,
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                            backgroundColor: "#e6fbf7",
                        },
                        "& .MuiStepLabel-label": {
                            color: "neutral.main",
                        },
                        "& .MuiStepLabel-label.Mui-active": {
                            color: "#85bec3",
                        },
                        "& .MuiStepIcon-root": {
                            color: isActive ? "#85bec3" : "neutral.main",
                        },
                    }}
                >
                    <StepLabel>{label}</StepLabel>
                </Step>
            );
        })}
    </Stepper>
);
