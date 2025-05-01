import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material"


interface DataContent {
    title: string;
    value: number;
}

interface DataPlatformCardProps {
    title: string;
    DataContent: DataContent[];
}

const DataPlatformCard: React.FC<DataPlatformCardProps> = ({ title, DataContent }) => {
    return (
        <Card
            sx={{
                maxWidth: 320,
                width: '100%',
                background: 'transparent',
                border: '.2px solid #ccc',
                borderRadius: .5,
                color: "#000000",
                boxShadow: 'none',
                p: 0
            }}
        >
            <CardHeader
                title={title}
                sx={{
                    backgroundColor: '#f5f5f5',
                    "& .MuiCardHeader-title": {
                        fontSize: '1.25rem',
                        fontWeight: 400,
                    }
                }}
            />
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h5" component={"h5"} sx={{ fontWeight: "bold" }}>
                            {DataContent[0]?.value}
                        </Typography>
                        <Typography variant="body2" component={"p"}>
                            {DataContent[0]?.title}
                        </Typography>
                    </Box>
                    {DataContent.length > 1 && <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: '#ccc' }} />}
                    <Box>
                        <Typography variant="h5" component={"h5"} sx={{ fontWeight: "bold" }}>
                            {DataContent[1]?.value}
                        </Typography>
                        <Typography variant="body2" component={"p"}>
                            {DataContent[1]?.title}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default DataPlatformCard
