import PaginationMUI from "@mui/material/Pagination";


const Pagination = ({
                        currentPage,
                        totalPages,
                        onPageChange
                    }) => {
    const handlePageChange = (event, page) => {
        onPageChange(page);
    };

    return (
        <PaginationMUI
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
        />
    );
};

export default Pagination;