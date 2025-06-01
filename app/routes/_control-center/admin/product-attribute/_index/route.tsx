import { Box } from "@mui/material";
import { MetaFunction, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import ReusableTable from "~/components/elements/Table";
import data from "~/data/productAttribute.json";

export const meta: MetaFunction = () => ([
    { title: "Product Attribute" },
    { name: "description", content: "Remix app development" },
]);

const route = () => {
    const navigate = useNavigate();

    const columns = [
        { id: "name", label: "Name" },
        { id: "platform", label: "Platform" },
        { id: "description", label: "Description" },
        { id: "action", label: "Action" },
    ];

    const rows = useMemo(() => {
        if (!data) return [];
        return data.map((item) => ({
            ...item,
            id: String(item.id),
        }));
    }, []);

    return (
        <Box className="w-full p-2">
            <ReusableTable
                columns={columns}
                rows={rows}
                showFooter={false}
                menuOptions={[
                    {
                        label: "More",
                        action: (row) => navigate(`/admin/product-attribute/${row.id}`),
                    },
                ]}
            />
        </Box>
    );
};

export default route;
