import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CustomTabs from '~/components/elements/Tabs';

const tabs = [
    { label: 'ALL TIME', value: 'alltime' },
    { label: 'YEAR', value: 'year' },
    { label: 'MONTH', value: 'month' },
    { label: 'WEEK', value: 'week' },
];

const DataTab = () => {
    const now = new Date();

    const getFormattedDate = (label: string) => {
        switch (label) {
            case 'ALL TIME':
                return format(now, 'PPpp');
            case 'YEAR':
                return format(now, 'yyyy');
            case 'MONTH':
                return format(now, 'LLLL');
            case 'WEEK':
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
            <Box className='text-tertiary'>
                <CustomTabs
                    tabs={[
                        { label: 'ALL TIME', content: <>{getFormattedDate('ALL TIME')}</> },
                        { label: 'YEAR', content: <>{getFormattedDate('YEAR')}</> },
                        { label: 'MONTH', content: <>{getFormattedDate('MONTH')}</> },
                        { label: 'WEEK', content: <>{getFormattedDate('WEEK')}</> },
                    ]}
                />
            </Box>
        </>
    );
};

export default DataTab;
