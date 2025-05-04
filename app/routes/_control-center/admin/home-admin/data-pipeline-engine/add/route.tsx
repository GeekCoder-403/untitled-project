import {
    Box,
    Typography,
    Paper,
    InputAdornment,
} from '@mui/material';
import ReusableButtonGroup from '~/components/elements/ButtonGroup';
import Button from '~/components/elements/Button';
import { useState, useRef } from 'react';
import { ArrowUpToLine, MoveLeft } from 'lucide-react';
import { Link, useNavigate } from '@remix-run/react';
import AutocompleteDropdown from '~/components/elements/AutoComplete';
import LoadingBar from 'react-top-loading-bar';
import { useSnackbar } from 'notistack';

const TestCaseUploadRoute = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedView, setSelectedView] = useState('configure-context');
    const [selectedRuleType, setSelectedRuleType] = useState<{ value: string; label: string } | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const loadingBarRef = useRef<any>(null);
    const navigate = useNavigate();

    const ruleTypeOptions = [
        { value: "unit", label: "Unit Testing" },
        { value: "privacy", label: "Privacy Testing" },
        { value: "security", label: "Security Testing" },
    ];

    const buttonOptions = [
        { label: 'Configure Context', value: 'configure-context' },
        { label: 'Configure', value: 'configure-xyz' },
        { label: 'Execution Status', value: 'execution-status' }
    ];

    const handleFileUpload = (uploadedFile: File) => {
        if (uploadedFile.type !== 'application/pdf') {
            enqueueSnackbar('Please upload a valid PDF file.', { variant: 'error' });
            return;
        }

        setFile(uploadedFile);

        loadingBarRef.current.continuousStart();

        setTimeout(() => {
            loadingBarRef.current.complete();
            enqueueSnackbar('File uploaded successfully!', { variant: 'success' });

            setTimeout(() => {
                navigate('/admin/home-admin/data-pipeline-engine');
            }, 1000);
        }, 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
    };

    const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    return (
        <Box className="p-4">
            <LoadingBar color="primary" ref={loadingBarRef} height={3} />
            <Box className="flex items-center gap-2 mb-4">
                <Link to={`/admin/home-admin/data-pipeline-engine`}>
                    <MoveLeft className="text-tertiary mr-2 cursor-pointer w-6 h-6" />
                </Link>
                <Typography variant="h5" className="text-tertiary font-base">
                    Suggest Test Cases
                </Typography>
            </Box>
            <Box className='w-full overflow-x-auto '>
                <ReusableButtonGroup
                    buttons={buttonOptions}
                    selected={selectedView}
                    onChange={setSelectedView}
                />
            </Box>

            <Box className='flex flex-col items-start gap-2 w-full mt-4'>
                <Typography variant="body1" sx={{ color: "neutral.main" }}>Test cases</Typography>
                <AutocompleteDropdown
                    id="rule-type"
                    name="ruleType"
                    value={selectedRuleType}
                    onChange={setSelectedRuleType}
                    placeholder="Choose your test cases"
                    options={ruleTypeOptions}
                    size="small"
                    sx={{ width: '40%' }}
                />
            </Box>
            <Paper
                variant="outlined"
                sx={{
                    mt: 2,
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    height: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'center',
                    px: 2,
                    backgroundColor: '#f5f5f5',
                }}
                onDrop={handleDragDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <ArrowUpToLine className='w-8 h-8 text-secondary mb-2' />
                <Typography className="text-secondary">Drag and drop a PDF file here to upload</Typography>
                <Typography className="text-secondary py-2">(or)</Typography>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 1 }}
                >
                    Choose File
                    <input
                        type="file"
                        hidden
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </Button>
            </Paper>
        </Box>
    );
};

export default TestCaseUploadRoute;
