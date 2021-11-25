import { Backdrop, CircularProgress, Typography } from "@mui/material";

interface Props {
    message?: string;
}

export default function Loading( {message = 'Loading...'} : Props) {
    return(
        <Backdrop open={true} invisible={true}>
            <div className='loading'>
                <CircularProgress size={50} color='primary'/>
                <Typography variant='h5' className='loading-message'>{ message }</Typography>
            </div>
        </Backdrop>
    )
}