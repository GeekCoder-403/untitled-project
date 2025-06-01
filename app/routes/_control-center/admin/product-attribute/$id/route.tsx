import { Box, Typography } from "@mui/material";
import { useParams } from "@remix-run/react";
import data from "~/data/productAttribute.json";

export default function ProductAttributeDetail() {
    const { id } = useParams();
    const item = data.find((d) => d.id === Number(id));

    if (!item) {
        return (
            <Box className="p-6">
                <Typography className="text-xl font-semibold text-red-600">Product attribute not found</Typography>
            </Box>
        );
    }

    return (
        <Box className="p-6 space-y-4 ">
            <Typography className="text-2xl font-bold uppercase text-tertiary">{item.name}</Typography>
            <Typography className="text-tertiary"><strong>Platform:</strong> {item.platform}</Typography>
            <Typography className="text-tertiary"><strong>Description:</strong> {item.description}</Typography>
        </Box>
    );
}
