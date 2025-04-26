import { Box, Card, CardActions, CardContent, Grid2, Typography } from "@mui/material";
import { Activity, BarChart3, Map, Database, Settings, Share2 } from "lucide-react";

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

const route = () => (
    <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid2 container spacing={2}>
            {cardData.map((card, index) => {
                const imageComponent = card.image;

                return (
                    <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Card
                            variant="outlined"
                            sx={{
                                position: "relative",
                                backgroundColor: "white",
                                borderRadius: 2,
                                boxShadow: 1,
                                transition: "0.3s",
                                overflow: "hidden",
                                "&:hover": {
                                    backgroundColor: "#e6f6f7",
                                    boxShadow: 4,
                                },
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 16,
                                    width: "40px",
                                    height: "3px",
                                    backgroundColor: "#85bec3",
                                    borderTopLeftRadius: "2px",
                                    borderTopRightRadius: "2px",
                                }}
                            />

                            <CardContent>
                                <Box className="flex items-start justify-between">
                                    <Box>
                                        <Typography component="h2" color="black" fontWeight="bold" >
                                            {card.title}
                                        </Typography>
                                        {card.subTitle && (
                                            <Typography className="text-xs text-gray-600">{card.subTitle}</Typography>
                                        )}
                                    </Box>
                                    <img src={imageComponent} alt="Loading..." className="w-5 h-5" />
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {card.description}
                                </Typography>
                            </CardContent>

                            <CardActions className="flex justify-between items-center mt-8">
                                <Box className="flex items-center gap-1 ">
                                    <img src="/icons/Download.svg" alt="Loading..." className="w-4 h-4 cursor-pointer transition-all duration-300 filter group-hover:brightness-0 group-hover:invert" />
                                    <Typography className="text-sm text-gray-800">Download Reference</Typography>
                                </Box>
                                <img src="/icons/MoveRight.svg" alt="Loading..." className="w-4 h-4 text-gray-800 cursor-pointer" />
                            </CardActions>
                        </Card>
                    </Grid2>
                );
            })}
        </Grid2>
    </Box>
);

export default route;
