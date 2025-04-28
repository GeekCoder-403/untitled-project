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
            className={`2xl:w-[30%] lg:w-[35%] md:w-[40%] w-full ${className}`}
        >
            <TabsList className=" border border-gray-400 bg-white flex items-center justify-center content-between min-w-tabs-list shadow-lg">
                {tabs.map((tab) => (
                    <Tab
                        key={tab.value}
                        value={tab.value}
                        slotProps={{
                            root: ({ selected, disabled }) => ({
                                className: `
                                    font-sans 
                                    ${selected ? 'text-white bg-[#85bec3]' : 'text-[#85bec3] focus:text-white hover:bg-[#85bec3] hover:text-white'} 
                                    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} 
                                    text-xs font-semibold w-full p-2 m-1 flex justify-center uppercase
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
