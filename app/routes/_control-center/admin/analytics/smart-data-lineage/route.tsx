import { Box, InputAdornment, TextField, Typography, Grid2 } from "@mui/material";
import { MetaFunction } from "@remix-run/react";
import { SearchIcon, SquarePlay } from "lucide-react";
import { useState } from "react";

export const meta: MetaFunction = () => ([
    { title: "Home | Smart Data Lineage" },
    { name: "description", content: "Remix app development" },
]);
const route = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const datasources = [
        { name: "Demo Database", icon: "/icons/Database.svg" },
        { name: "MongoDB", icon: "/icons/mongodb.svg" },
        { name: "MySQL", icon: "/icons/mysql.svg" },
        { name: "PostgreSQL", icon: "/icons/Postgresql.svg" },
        { name: "PGVector", icon: "/image/pgvector.png" },
        { name: "Microsoft Access", icon: "/image/microsoft_access.png" },
        { name: "Airtable", icon: "/image/airtable.png" },
        { name: "Amazon Aurora", icon: "/image/aws_aurora.png" },
        { name: "Google BigQuery", icon: "/icons/google-bigquery.svg" },
        { name: "Binance", icon: "/image/binance.png" },
    ];

    const genericIcon = "/image/plug.png";

    const filteredDatasources = datasources.filter((ds) =>
        ds.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <Box className=" p-4">
                <Typography variant="h4" className='text-xl font-bold text-neutral-600 flex items-center justify-center capitalize'>select your datasource</Typography>
                <Typography variant="h6" className='text-sm text-secondary flex items-center justify-center'>Don't see what you're looking for?<span className="text-tertiary underline ml-1"> Make a request</span></Typography>
                <Box className="flex flex-col gap-2 mt-6">
                    <TextField
                        placeholder="Search datasource"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon className="text-tertiary" />
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                        sx={{

                            width: '45%',
                            '& .MuiOutlinedInput-root': {
                                color: 'tertiary.main',
                                '& fieldset': {
                                    borderColor: 'tertiary.main',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'tertiary.main',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'tertiary.main',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'tertiary.main',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'tertiary.main',
                            },
                        }}
                    />
                    <Grid2 container spacing={2}>
                        {filteredDatasources.map((ds, idx) => (
                            <Grid2
                                key={idx}
                                size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
                                className="cursor-pointer"
                            >
                                <Box
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="relative flex flex-col items-center justify-center gap-2 p-4 border border-gray-200 rounded-md transition-all duration-200"
                                >
                                    {hoveredIndex === idx && (
                                        <Box className="absolute top-2 right-2 text-tertiary">
                                            <SquarePlay className="w-5 h-5 text-tertiary" />
                                        </Box>
                                    )}

                                    <Box className="flex items-center justify-center p-10">
                                        <img
                                            src={hoveredIndex === idx ? ds.icon : genericIcon}
                                            alt={ds.name}
                                            className="w-8 h-8"
                                        />
                                    </Box>

                                    <Typography variant="body2" className="text-tertiary text-center">
                                        {ds.name}
                                    </Typography>
                                </Box>
                            </Grid2>

                        ))}
                    </Grid2>
                    {filteredDatasources.length === 0 && (
                        <Typography className="text-center text-sm text-neutral-500 mt-4">
                            No datasources found...
                        </Typography>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default route