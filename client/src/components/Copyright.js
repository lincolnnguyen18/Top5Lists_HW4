import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to="/">
                The Top 5 Lister
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}