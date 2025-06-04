import { Box, Typography } from "@mui/material";
import { MetaFunction, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import ReusableTable from "~/components/elements/Table";
import attributeData from "~/data/productAttribute.json";
import productData from "~/data/product.json";

export const meta: MetaFunction = () => ([
    { title: "Product Attribute" },
    { name: "description", content: "Remix app development" },
]);

const Route = () => {
    const navigate = useNavigate();

    const attributeColumns = [
        { id: "name", label: "Name" },
        { id: "platform", label: "Platform" },
        { id: "description", label: "Description" },
        { id: "action", label: "Action" },
    ];

    const attributeRows = useMemo(() => {
        if (!attributeData) return [];
        return attributeData.map((item) => ({
            ...item,
            id: String(item.id),
        }));
    }, []);

    const dynamicTables = useMemo(() => {
        const result: {
            title: string;
            columns: { id: string; label: string }[];
            rows: any[];
        }[] = [];

        for (const key in productData) {
            const records = productData[key as keyof typeof productData];

            if (!Array.isArray(records) || records.length === 0) continue;

            const columns = Object.keys(records[0]).map((field) => ({
                id: field,
                label: field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            }));

            const rows = records.map((item, index) => ({
                id: String(
                    'id' in item
                        ? (item as any).id
                        : Object.keys(item).find((k) => k.endsWith('_id'))
                            ? (item as any)[Object.keys(item).find((k) => k.endsWith('_id')) as string]
                            : index
                ),
                ...item,
            }));

            result.push({ title: key, columns, rows });
        }

        return result;
    }, []);

    return (
        <Box className="w-full p-2 space-y-8">
            <Box>
                <Typography variant="h6" gutterBottom>
                    Product Attributes
                </Typography>
                <ReusableTable
                    columns={attributeColumns}
                    rows={attributeRows}
                    showFooter={false}
                    menuOptions={[
                        {
                            label: "More",
                            action: (row) => navigate(`/admin/product-attribute/${row.id}`),
                        },
                    ]}
                />
            </Box>

            {dynamicTables.map((table) => (
                <Box key={table.title}>
                    <Typography variant="h6" gutterBottom textTransform="capitalize" className="text-tertiary">
                        {table.title}
                    </Typography>
                    <ReusableTable
                        columns={table.columns}
                        rows={table.rows}
                        showFooter={true}
                        menuOptions={[]}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default Route;
