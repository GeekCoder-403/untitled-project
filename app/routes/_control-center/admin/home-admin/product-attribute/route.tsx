import { MetaFunction, useParams } from "@remix-run/react";
import { Box, Typography } from "@mui/material";
import DataTab from "~/components/componentKit/DataTab";
import DropdownWithTable from "~/components/componentKit/DropdownWithTable";
import TableWithChart from "~/components/componentKit/TableWithChart";
import { getDetails } from "~/services/Feature/feature.query";
import DataPlatformCard from "~/components/componentKit/DataPlatformCard";

export const meta: MetaFunction = () => ([
    { title: "Home | Product Attribute" },
    { name: "description", content: "Remix app development" },
]);

const DataProducts = [
    {
        title: "Data Products",
        DataContent: [
            { title: "Total Data Products", value: 30 },
            { title: "Total User Subscription", value: 151 }
        ]
    },
    {
        title: "Data Assets",
        DataContent: [
            { title: "Total Data Assets", value: 120 },
            { title: "Total Data Sources", value: 54 }
        ]
    },
    {
        title: "Sources",
        DataContent: [
            { title: "Total Data Sources", value: 54 }
        ]
    },
    {
        title: "Visitors",
        DataContent: [
            { title: "Total Visitors", value: 1245287 }
        ]
    },
]

export default function FeaturePage() {
    const { data: devicesResponse, isLoading: devicesLoading, error: devicesError } = getDetails();
    if (devicesLoading) return <Box sx={{ padding: 2 }}>Loading...</Box>;
    if (devicesError) return <Box sx={{ padding: 2 }}>Error loading details.</Box>;
    const { title } = useParams();

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" className="text-tertiary capitalize pb-2">
                Product Attribute
            </Typography>
            {/* <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 4, color: "#000000" }}>
                <h2>API Response Details</h2>
                <p><strong>User ID:</strong> {devicesResponse?.userId}</p>
                <p><strong>ID:</strong> {devicesResponse?.id}</p>
                <p><strong>Title:</strong> {devicesResponse?.title}</p>
                <p><strong>Completed:</strong> {devicesResponse?.completed ? "true" : "false"}</p>
            </Box> */}
            <DataTab />
            <Box>
                <Typography variant="h4" className="text-tertiary capitalize pb-2">
                    Data Platforms
                </Typography>
                <Box sx={{ display: 'flex', marginBottom: 2, gap: 2, flexWrap: 'wrap' }}>
                    {
                        DataProducts.map((item, index) => (
                            <DataPlatformCard
                                key={index}
                                title={item.title}
                                DataContent={item.DataContent}
                            />
                        ))
                    }
                </Box>
            </Box>
            <DropdownWithTable />
            <TableWithChart />
        </Box>
    );
}
