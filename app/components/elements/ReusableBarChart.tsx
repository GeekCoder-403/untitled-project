import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export interface SeriesItem {
    dataKey: string;
    label: string;
    color?: string;
}

export interface BarChartProps {
    dataset: Record<string, any>[];
    xAxisKey: string;
    series: SeriesItem[];
    height?: number;
    yAxisLabel?: string;
    xAxisLabel?: string;
}

const ReusableBarChart: React.FC<BarChartProps> = ({
    dataset,
    xAxisKey,
    series,
    height = 300,
    yAxisLabel = '',
    xAxisLabel = '',
}) => {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: xAxisKey,
                    label: xAxisLabel,
                    labelStyle: {
                        fill: '#6B7280',
                        fontSize: 15,
                        fontWeight: 500,
                    },
                    tickLabelStyle: {
                        fill: '#6B7280',
                        fontSize: 12,
                    },
                },
            ]}
            series={series}
            yAxis={[
                {
                    label: yAxisLabel,
                    labelStyle: {
                        fill: '#6B7280',
                        fontSize: 15,
                        fontWeight: 500,
                    },
                    tickLabelStyle: {
                        fill: '#6B7280',
                        fontSize: 12,
                    },
                },
            ]}
            height={height}
            slotProps={{
                barLabel: {
                    style: {
                        fill: '#6B7280',
                        fontSize: 14,
                        fontWeight: 500,
                    },
                },
                legend: {
                    labelStyle: {
                        fill: '#6B7280',
                        fontSize: 14,
                        fontWeight: 500,
                    },
                },
            }}

        />
    );
};

export default ReusableBarChart;
