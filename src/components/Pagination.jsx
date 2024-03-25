

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div>
            <nav aria-label="Page navigation example" className="flex w-full justify-center items-center mt-4 mb-4 flex-wrap">
                <div className="w-full text-center text-white font-mono">Total Pages: {totalPages}</div>
                <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0  rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                            </svg>
                        </button>
                    </li>
                    <li>
                        <p className="flex items-center justify-center px-4 h-10 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">{currentPage}</p>
                    </li>
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            className="flex items-center justify-center px-4 h-10 leading-tight border rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
