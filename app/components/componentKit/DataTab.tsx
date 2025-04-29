import { Box } from '@mui/material';
import CustomTabs, { TabItem } from '../elements/Tabs';
import { useState, useEffect } from 'react';
import { format } from 'date-fns'; // simple date formatting

const tabs: TabItem[] = [
    { label: 'ALL TIME', value: 'alltime' },
    { label: 'YEAR', value: 'year' },
    { label: 'MONTH', value: 'month' },
    { label: 'WEEK', value: 'week' },
];

const DataTab = () => {
    const [activeTab, setActiveTab] = useState<string | number>('alltime');
    const now = new Date();

    const getFormattedDate = () => {
        switch (activeTab) {
            case 'alltime':
                return format(now, 'PPpp');
            case 'year':
                return format(now, 'yyyy');
            case 'month':
                return format(now, 'LLLL');
            case 'week':
                const dayName = format(now, 'EEEE');
                const startOfYear = new Date(now.getFullYear(), 0, 1);
                const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
                const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
                return `${dayName}, Week ${weekNumber}`;
            default:
                return '';
        }
    };


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
                <Box className="text-start text-lg font-semibold text-gray-700 p-4">
                    {getFormattedDate()}
                </Box>
            </Box>
        </>
    );
};

export default DataTab;
