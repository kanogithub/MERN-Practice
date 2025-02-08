import Link from "next/link"

const Pagination = ({ page, pageSize, total }) => {
  const totalPages = Math.ceil(total / pageSize)
  const previousPage = page - 1
  const nextPage = page + 1

  return (
    <session className="container mx-auto flex justify-center items-center my-8">
      {previousPage > 0 ? (
        <Link href={`/properties?page=${previousPage}`} className="mr-2 px-2 py-1 border border-gray-300 rounded" disabled={previousPage === 0}>
          Previous
        </Link>
      ) : (
        <button disabled className="mr-2 px-2 py-1 border border-gray-300 bg-gray-100 opacity-50 rounded">
          Previous
        </button>
      )}

      <span className="mx-2">Page {page} of {totalPages}</span>
      
      {nextPage <= totalPages ? (
        <Link href={`/properties?page=${nextPage}`} className="mr-2 px-2 py-1 border border-gray-300 rounded" disabled={nextPage > totalPages}>
          Next
        </Link>
      ) : (
        <button disabled className="mr-2 px-2 py-1 border border-gray-300 bg-gray-100 opacity-50 rounded">
          Next
        </button>
      )}
    </session>
  );
}
 
export default Pagination;