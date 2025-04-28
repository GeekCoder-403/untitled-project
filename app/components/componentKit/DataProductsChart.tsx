import ReusableBarChart, { SeriesItem } from "../elements/ReusableBarChart";


const dataProductDataset = [
    { product: 'accounts', apiSubscriptions: 30, batchLoadSubscriptions: 20 },
    { product: 'atm', apiSubscriptions: 40, batchLoadSubscriptions: 32 },
    { product: 'branches', apiSubscriptions: 45, batchLoadSubscriptions: 50 },
    { product: 'cards', apiSubscriptions: 50, batchLoadSubscriptions: 25 },
    { product: 'customers', apiSubscriptions: 49, batchLoadSubscriptions: 100 },
    { product: 'employees', apiSubscriptions: 60, batchLoadSubscriptions: 200 },
    { product: 'transactiondetails', apiSubscriptions: 70, batchLoadSubscriptions: 45 },
    { product: 'transactions', apiSubscriptions: 91, batchLoadSubscriptions: 75 },
    { product: 'transactionstatus', apiSubscriptions: 20, batchLoadSubscriptions: 10 },
    { product: 'total_transactions_per_customer', apiSubscriptions: 10, batchLoadSubscriptions: 35 },
];

const series: SeriesItem[] = [
    { dataKey: 'apiSubscriptions', label: 'API Subscriptions' },
    { dataKey: 'batchLoadSubscriptions', label: 'Batch Load Subscriptions' },
];

export default function DataProductsChart() {
    return (
        <ReusableBarChart
            dataset={dataProductDataset}
            xAxisKey="product"
            series={series}
            height={350}
            yAxisLabel="Subscription Count"
        />
    );
}
