import { Box, Typography, Pagination } from "@mui/material";
import { IPagination } from "../models/pagination";



interface Props {
    pagination: IPagination;
    onPageChange: (page: number) => void;
}

export default function AppPagination({ pagination, onPageChange }: Props) {

    const { currentPage, totalCount, totalPages, pageSize } = pagination;

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(currentPage -1) * pageSize + 1 } - 
                {currentPage * pageSize > totalCount 
                    ? totalCount 
                    : currentPage * pageSize } of {totalCount} items
            </Typography>
            <Pagination 
                color="standard"
                size="large" 
                count={totalPages}
                page={currentPage} 
                onChange={(event, page) => onPageChange(page)}/>
        </Box>
    )
} 