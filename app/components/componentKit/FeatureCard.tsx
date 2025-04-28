import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";

interface FeatureCardProps {
    title: string;
    subTitle?: string;
    description: string;
    image: string;
}

const FeatureCard = ({ title, subTitle, description, image }: FeatureCardProps) => {
    return (
        <Card
            variant="outlined"
            sx={{
                position: "relative",
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 1,
                transition: "0.3s",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "&:hover": {
                    backgroundColor: "#e6f6f7",
                    boxShadow: 4,
                },
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
                        <Typography component="h2" color="black" fontWeight="bold">
                            {title}
                        </Typography>
                        {subTitle && (
                            <Typography className="text-xs text-gray-600">{subTitle}</Typography>
                        )}
                    </Box>

                    <img src={image} alt="Icon" className="w-5 h-5" />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {description}
                </Typography>
            </CardContent>

            <CardActions className="flex justify-between items-center mt-8">
                <Box className="flex items-center gap-1">
                    <img
                        src="/icons/Download.svg"
                        alt="Download"
                        className="w-4 h-4 cursor-pointer transition-all duration-300 filter group-hover:brightness-0 group-hover:invert"
                    />
                    <Typography className="text-sm text-gray-800">
                        Download Reference
                    </Typography>
                </Box>

                <img
                    src="/icons/MoveRight.svg"
                    alt="Move Right"
                    className="w-4 h-4 text-gray-800 cursor-pointer"
                />
            </CardActions>
        </Card>
    );
};

export default FeatureCard;
