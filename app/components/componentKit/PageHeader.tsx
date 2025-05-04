import { Box, Typography } from "@mui/material";
import { useLocation, Link } from "@remix-run/react";
import { ReactNode } from "react";
import Button from "../elements/Button";

interface PageHeaderProps {
    actionLabel?: string;
    actionLink?: string;
    actionIcon?: ReactNode;
    actionOnClick?: () => void;  // 👈 added onClick support
}

const PageHeader: React.FC<PageHeaderProps> = ({ actionLabel, actionLink, actionIcon, actionOnClick }) => {
    const location = useLocation();

    const pathParts = location.pathname.split('/').filter(Boolean);
    const title = pathParts[pathParts.length - 1]?.replace(/-/g, ' ') || 'Page';

    const ActionButton = (
        <Button
            variant="contained"
            endIcon={actionIcon}
            className="capitalize"
            onClick={actionOnClick}
        >
            {actionLabel}
        </Button>
    );

    return (
        <Box className="flex items-center justify-between p-4 border-b border-tertiary">
            <Typography variant="h6" className="text-tertiary capitalize font-medium">
                {title}
            </Typography>

            {actionLabel && (
                actionLink ? (
                    <Link to={actionLink}>
                        {ActionButton}
                    </Link>
                ) : (
                    ActionButton
                )
            )}
        </Box>
    );
};

export default PageHeader;
