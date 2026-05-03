type PaginationProps = {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    if (totalPages == 0) return
    return (
        <div className="flex items-center justify-center gap-2 mt-6">

            {/* Prev */}
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="px-3 py-2 rounded-lg border bg-white disabled:opacity-50"
            >
                السابق
            </button>

            {/* Pages */}
            <div className="flex gap-1">
                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`px-3 py-2 rounded-lg border transition ${p === page
                            ? "bg-blue-600 text-white"
                            : "bg-white hover:bg-gray-100"
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Next */}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-2 rounded-lg border bg-white disabled:opacity-50"
            >
                التالي
            </button>

        </div>
    )
}