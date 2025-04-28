import { Box } from '@mui/material';
import CustomTabs, { TabItem } from '../elements/Tabs';
import { useState } from 'react';
import ReusableTable from '../elements/Table';
import ReusableBarChart from '../elements/ReusableBarChart';

const tabs: TabItem[] = [
    { label: 'ALL TIME', value: 'alltime' },
    { label: 'YEAR', value: 'year' },
    { label: 'MONTH', value: 'month' },
    { label: 'WEEK', value: 'week' }
];
const DataTab = () => {
    const [activeTab, setActiveTab] = useState<string | number>('alltime');
    return (
        <>
            <CustomTabs
                tabs={tabs}
                value={activeTab}
                onChange={(_, newValue) => {
                    if (newValue !== null) {
                        setActiveTab(newValue);
                    }
                }}
            />
            <Box className="w-full">
                {activeTab === 'alltime' && (
                    <Box className="text-start text-lg font-semibold text-gray-700">
                        alltime
                    </Box>
                )}
                {activeTab === 'year' && (
                    <Box className="text-start text-lg font-semibold text-gray-700">
                        year
                    </Box>
                )}
                {activeTab === 'month' && (
                    <Box className="text-start text-lg font-semibold text-gray-700">
                        month
                    </Box>
                )}
                {activeTab === 'week' && (
                    <Box className="text-start text-lg font-semibold text-gray-700">
                        week
                    </Box>
                )}
            </Box>
        </>
    )
}

export default DataTab