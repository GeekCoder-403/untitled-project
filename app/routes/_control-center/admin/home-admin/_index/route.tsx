import { Box, Grid2 } from "@mui/material";
import { Link } from "@remix-run/react";
import DataTab from "~/components/componentKit/DataTab";
import DropdownWithTable from "~/components/componentKit/DropdownWithTable";
import FeatureCard from "~/components/componentKit/FeatureCard";
import TableWithChart from "~/components/componentKit/TableWithChart";
import { getDetails } from "~/services/Feature/feature.query";

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



const route = () => {
    return (
        <>
            <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>

                <Grid2 container spacing={2}>
                    {cardData.map((card, index) => (
                        <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Link
                                to={`/admin/home-admin/${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                                <FeatureCard
                                    title={card.title}
                                    subTitle={card.subTitle}
                                    description={card.description}
                                    image={card.image}
                                />
                            </Link>
                        </Grid2>
                    ))}
                </Grid2>

            </Box>
        </>
    );
};

export default route;
