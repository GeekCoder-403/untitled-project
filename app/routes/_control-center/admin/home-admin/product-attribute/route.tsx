import { MetaFunction, useParams } from "@remix-run/react";
import { Box, Typography } from "@mui/material";
import DataTab from "~/components/componentKit/DataTab";
import DropdownWithTable from "~/components/componentKit/DropdownWithTable";
import TableWithChart from "~/components/componentKit/TableWithChart";
import { getDetails } from "~/services/Feature/feature.query";

export const meta: MetaFunction = () => ([
    { title: "Home | Product Attribute" },
    { name: "description", content: "Remix app development" },
]);

export default function FeaturePage() {
    const { data: devicesResponse, isLoading: devicesLoading, error: devicesError } = getDetails();

    if (devicesLoading) return <Box sx={{ padding: 2 }}>Loading...</Box>;
    if (devicesError) return <Box sx={{ padding: 2 }}>Error loading details.</Box>;
    const { title } = useParams();

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" className="text-gray-500 capitalize pb-2">
                {title?.replace(/-/g, " ")}
            </Typography>
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 4, color: "#000000" }}>
                <h2>API Response Details</h2>
                <p><strong>User ID:</strong> {devicesResponse?.userId}</p>
                <p><strong>ID:</strong> {devicesResponse?.id}</p>
                <p><strong>Title:</strong> {devicesResponse?.title}</p>
                <p><strong>Completed:</strong> {devicesResponse?.completed ? "true" : "false"}</p>
            </Box>
            <DataTab />
            <DropdownWithTable />
            <TableWithChart />
        </Box>
    );
}
