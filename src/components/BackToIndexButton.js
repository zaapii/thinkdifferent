import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackToIndexButton = () => {
    return (
        <NavLink style={{ textDecoration: 'none' }} to={`/`}>
            <Button sx={{ width: '100%', color: "black" }} variant="outlined" color="error" startIcon={<ArrowBackIcon />}>
                Back to Index
            </Button>
        </NavLink>
    );
}

export default BackToIndexButton;
