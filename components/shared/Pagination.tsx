import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center space-x-2 mt-12">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-secondary-charcoal/50 border border-secondary-silver/20 text-secondary-silver hover:text-accent hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous Page"
            >
                <ChevronLeftIcon size={20} />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-md border transition-all ${currentPage === page
                            ? 'bg-accent/20 border-accent text-accent'
                            : 'bg-secondary-charcoal/50 border-secondary-silver/20 text-secondary-silver hover:text-accent hover:border-accent/50'
                        }`}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-secondary-charcoal/50 border border-secondary-silver/20 text-secondary-silver hover:text-accent hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next Page"
            >
                <ChevronRightIcon size={20} />
            </button>
        </div>
    );
};

export default Pagination;
