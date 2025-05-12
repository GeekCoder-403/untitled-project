import {
    Box,
    Grid2,
    Typography,
} from '@mui/material';
import { Link } from '@remix-run/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import All from '~/components/componentKit/dataPipeLineEngine/All';
import Approved from '~/components/componentKit/dataPipeLineEngine/Approved';
import PendingReview from '~/components/componentKit/dataPipeLineEngine/PendingReview';
import Rejected from '~/components/componentKit/dataPipeLineEngine/Rejected';
import AutocompleteDropdown from '~/components/elements/AutoComplete';
import Button from '~/components/elements/Button';
import CustomTabs from '~/components/elements/Tabs';

const route = () => {
    const [view, setView] = useState<'all' | 'pending review' | 'approved' | 'rejected'>('all');

    const [selectedRuleType, setSelectedRuleType] = useState<{ value: string; label: string } | null>(null);
    const [selectedSource, setSelectedSource] = useState<{ value: string; label: string } | null>(null);
    const [selectedTarget, setSelectedTarget] = useState<{ value: string; label: string } | null>(null);

    const ruleTypeOptions = [
        { value: "unit", label: "Unit Testing" },
        { value: "privacy", label: "Privacy Testing" },
        { value: "security", label: "Security Testing" },
    ];

    const sourceOptions = [
        { value: 'loans', label: 'Loans' },
        { value: 'accounts', label: 'Accounts' },
        { value: 'transactions', label: 'Transactions' },
    ];

    const targetOptions = [
        { value: 'grossBalance', label: 'Original Gross Book Balance' },
        { value: 'deferredBalance', label: 'Deferred Balance' },
        { value: 'amortization', label: 'Amortization Schedule' },
    ];

    return (
        <Box className="h-full overflow-auto chat-scrollbar">
            <Grid2 container spacing={2} sx={{ padding: 2 }} >
                <Grid2 size={{ xs: 12, sm: 12, md: 4 }} className='p-4 bg-white rounded-md shadow-md h-full'>
                    <Typography variant="h6" gutterBottom className='text-tertiary'>
                        Select Source & Target
                    </Typography>

                    <Box className='mb-2 flex flex-col items-start gap-2 w-full'>
                        <Typography variant="body1" sx={{ color: "neutral.main" }}>Test cases</Typography>
                        <AutocompleteDropdown
                            id="rule-type"
                            name="ruleType"
                            value={selectedRuleType}
                            onChange={setSelectedRuleType}
                            placeholder="Choose your test cases"
                            options={ruleTypeOptions}
                            size="small"
                            sx={{ width: '100%' }}
                        />
                    </Box>

                    <Box className='mb-2 flex flex-col items-start gap-2 w-full'>
                        <Typography variant="body1" sx={{ color: "neutral.main" }}>Source</Typography>
                        <AutocompleteDropdown
                            id="source-type"
                            name="sourceType"
                            value={selectedSource}
                            onChange={setSelectedSource}
                            placeholder="Choose your source"
                            options={sourceOptions}
                            size="small"
                            sx={{ width: '100%' }}
                        />
                    </Box>

                    <Box className='mb-2 flex flex-col items-start gap-2 w-full'>
                        <Typography variant="body1" sx={{ color: "neutral.main" }}>Target</Typography>
                        <AutocompleteDropdown
                            id="target-type"
                            name="targetType"
                            value={selectedTarget}
                            onChange={setSelectedTarget}
                            placeholder="Choose your target"
                            options={targetOptions}
                            size="small"
                            sx={{ width: '100%' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 2 }}>
                        <Button
                            variant="outlined"
                            sx={{ color: "primary.main" }}
                        >
                            Clear All
                        </Button>
                    </Box>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 12, md: 8 }} className='p-4 bg-white rounded-md shadow-md h-full'>
                    <Box className='flex items-center justify-between pb-2'>
                        <Typography variant="h6" gutterBottom className='text-tertiary'>
                            Test Cases
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Link to={`/admin/home-admin/data-pipeline-engine/add`}>
                                <Button variant="outlined" sx={{ mr: 1 }}>Suggest Test Cases</Button>
                            </Link>
                            <Link to={`/admin/home-admin/data-pipeline-engine/add`}>
                                <Button variant="contained" startIcon={<Plus className="w-5 h-5" />}>Add BRD</Button>
                            </Link>
                        </Box>
                    </Box>

                    <Box>
                        <CustomTabs
                            tabs={[
                                { label: "all", content: <All /> },
                                { label: "pending review", content: <PendingReview /> },
                                { label: "approved", content: <Approved /> },
                                { label: "rejected", content: <Rejected /> },
                            ]}
                        />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default route;
