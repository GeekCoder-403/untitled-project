import { Box } from '@mui/material';
import CustomTabs, { TabItem } from '../elements/Tabs';
import { useState } from 'react';
import ReusableTable from '../elements/Table';
import ReusableBarChart from '../elements/ReusableBarChart';

const tabs: TabItem[] = [
    { label: 'Table', value: 'table' },
    { label: 'Chart', value: 'chart' }
];

const columns = [
    { id: 'sno', label: 'S.No.', minWidth: 50 },
    { id: 'dataset', label: 'Data Set', minWidth: 150 },
    { id: 'platform', label: 'Platform', minWidth: 100 },
    { id: 'apiSubscription', label: 'No. of API Subscription', minWidth: 170, },
    { id: 'batchLoadSubscription', label: 'No. of Batch Load Subscription', minWidth: 200, },
];



const rows = [
    { sno: 1, dataset: 'accounts', platform: 'postgres', apiSubscription: 3, batchLoadSubscription: 32 },
    { sno: 2, dataset: 'atm', platform: 'postgres', apiSubscription: 20, batchLoadSubscription: 320 },
    { sno: 3, dataset: 'branches', platform: 'postgres', apiSubscription: 8, batchLoadSubscription: 33 },
    { sno: 4, dataset: 'cards', platform: 'postgres', apiSubscription: 8, batchLoadSubscription: 33 },
    { sno: 5, dataset: 'customers', platform: 'postgres', apiSubscription: 8, batchLoadSubscription: 33 },
];


const menuOptions = ["Edit", "Delete", "Archive"];


const TableWithChart = () => {
    const [activeTab, setActiveTab] = useState<string | number>('table');
    return (
        <>
            <Box className="w-full flex flex-col gap-4">
                <Box className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold capitalize text-gray-600">
                        Top 10 most accessed data product:
                    </h1>

                    <CustomTabs
                        tabs={tabs}
                        value={activeTab}
                        onChange={(_, newValue) => {
                            if (newValue !== null) {
                                setActiveTab(newValue);
                            }
                        }}
                    />
                </Box>

                <Box className="w-full">
                    {activeTab === 'table' && (
                        <ReusableTable
                            columns={columns}
                            rows={rows}
                            menuOptions={menuOptions}
                            handleSelect={(option, row) => console.log(option, row)}
                        />
                    )}

                    {activeTab === 'chart' && (
                        <Box className="w-full flex items-center justify-center">
                            <ReusableBarChart
                                dataset={[
                                    { product: 'accounts', apiSubscriptions: 30, batchLoadSubscriptions: 20 },
                                    { product: 'atm', apiSubscriptions: 40, batchLoadSubscriptions: 32 },
                                    { product: 'branches', apiSubscriptions: 45, batchLoadSubscriptions: 50 },
                                    { product: 'cards', apiSubscriptions: 50, batchLoadSubscriptions: 25 },
                                    { product: 'customers', apiSubscriptions: 49, batchLoadSubscriptions: 100 },
                                    { product: 'employees', apiSubscriptions: 60, batchLoadSubscriptions: 200 },
                                    { product: 'transactiondetails', apiSubscriptions: 70, batchLoadSubscriptions: 45 },
                                    { product: 'transactions', apiSubscriptions: 91, batchLoadSubscriptions: 75 },
                                    { product: 'transactionstatus', apiSubscriptions: 20, batchLoadSubscriptions: 10 },
                                    { product: 'totaltransactionspercustomer', apiSubscriptions: 10, batchLoadSubscriptions: 35 },
                                ]}
                                xAxisKey="product"
                                series={[
                                    { dataKey: 'apiSubscriptions', label: 'API Subscriptions' },
                                    { dataKey: 'batchLoadSubscriptions', label: 'Batch Load Subscriptions' },
                                ]}
                                height={400}
                                yAxisLabel="Subscriptions"
                                xAxisLabel="product"
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default TableWithChart