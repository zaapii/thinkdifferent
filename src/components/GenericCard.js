import { Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

const GenericCard = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fafafa',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

export default GenericCard;