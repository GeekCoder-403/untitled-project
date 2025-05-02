import * as React from 'react';
import { Tabs, TabsList, Tab } from '@mui/base';

export interface TabItem {
    label: number | string;
    value: number | string;
}

interface CustomTabsProps {
    tabs: TabItem[];
    value: number | string;
    onChange: (event: React.SyntheticEvent | null, newValue: number | string | null) => void;
    className?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, value, onChange, className = '' }) => {
    return (
        <Tabs
            value={value}
            onChange={onChange}
            className={`2xl:w-[30%] lg:w-[35%] md:w-[40%] w-full border ${className}`}
        >
            <TabsList className="flex items-center justify-center content-between min-w-tabs-list">
                {tabs.map((tab) => (
                    <Tab
                        key={tab.value}
                        value={tab.value}
                        slotProps={{
                            root: ({ selected, disabled }) => ({
                                className: `
                                    font-sans 
                                    ${selected ? 'text-white bg-primary' : 'text-[#85bec3] focus:text-white hover:bg-[#85bec3] hover:text-white'} 
                                    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} 
                                    text-xs text-nowrap font-semibold w-full py-2 px-6 m-0.5 flex justify-center uppercase rounded-sm
                                `,
                            }),
                        }}
                    >
                        {tab.label}
                    </Tab>
                ))}
            </TabsList>
        </Tabs>
    );
};

export default CustomTabs;
