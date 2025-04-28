import { Box, Grid2 } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useState } from "react";
import DataTab from "~/components/componentKit/DataTab";
import DropdownWithTable from "~/components/componentKit/DropdownWithTable";
import FeatureCard from "~/components/componentKit/FeatureCard";
import TableWithChart from "~/components/componentKit/TableWithChart";
import Dropdown from "~/components/elements/Dropdown";
import ReusableBarChart from "~/components/elements/ReusableBarChart";
import ReusableTable from "~/components/elements/Table";
import CustomTabs, { TabItem } from "~/components/elements/Tabs";

const cardData = [
    {
        title: "Product Attribute",
        description: "Industry proven domain-based data entities for analytical & reporting use cases.",
        image: "/icons/Database.svg",
    },
    {
        title: "Data Pipeline Engine",
        subTitle: "Powered by Gen AI",
        description: "Metadata based framework to ingest and process data into any client platform requirement.",
        image: "/icons/Activity.svg",
    },
    {
        title: "Smart Data Quality Engine",
        subTitle: "Powered by Gen AI",
        description: "Pre-configured ML data quality engine to ensure high trust and visibility for your data.",
        image: "/icons/Settings2.svg",
    },
    {
        title: "Smart Data Lineage",
        description: "A data lineage solution for transparent data traceability.",
        image: "/icons/Share.svg",
    },
    {
        title: "Analytics",
        description: "Pre-configured analytical models and dashboards to support finance, risk, and customer analytics.",
        image: "/icons/Share.svg",
    },
    {
        title: "Smart Map",
        description: "Data mapping to interconnect your systems in an intuitive & automated way.",
        image: "/icons/Map.svg",
    },

];

const tabs: TabItem[] = [
    { label: 'Table', value: 'table' },
    { label: 'Chart', value: 'chart' }
];

const columns = [
    { id: 'reqid', label: 'Req Id', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'platform', label: 'Platform', minWidth: 170, align: 'right' },
    { id: 'status', label: 'Status', minWidth: 170, align: 'right' },
    { id: 'action', label: 'Action', minWidth: 100, align: 'center' as const }
];


const rows = [
    { reqid: 'REQ-1001', name: 'Account Details', platform: 'AWS', status: 'Active' },
    { reqid: 'REQ-1002', name: 'Transaction API', platform: 'Azure', status: 'Active' },
    { reqid: 'REQ-1003', name: 'User Management', platform: 'GCP', status: 'Inactive' },
    { reqid: 'REQ-1004', name: 'Product Catalog', platform: 'AWS', status: 'Pending' },
    { reqid: 'REQ-1005', name: 'Order Processing', platform: 'Azure', status: 'Active' },
    { reqid: 'REQ-1006', name: 'Customer 360', platform: 'AWS', status: 'Inactive' },
    { reqid: 'REQ-1007', name: 'Analytics', platform: 'GCP', status: 'Active' },
    { reqid: 'REQ-1008', name: 'Notification Service', platform: 'AWS', status: 'Pending' },
    { reqid: 'REQ-1009', name: 'Audit Logs', platform: 'Azure', status: 'Inactive' },
    { reqid: 'REQ-1010', name: 'Data Pipeline', platform: 'AWS', status: 'Active' },
];


const menuOptions = ["Edit", "Delete", "Archive"];


const route = () => {
    const [activeTab, setActiveTab] = useState<string | number>('table');



    return (
        <>
            <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <Grid2 container spacing={2}>
                    {cardData.map((card, index) => (
                        <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <FeatureCard
                                title={card.title}
                                subTitle={card.subTitle}
                                description={card.description}
                                image={card.image}
                            />
                        </Grid2>
                    ))}
                </Grid2>
                <DataTab />
                <DropdownWithTable />
                <TableWithChart />
            </Box>
        </>
    );
};

export default route;
