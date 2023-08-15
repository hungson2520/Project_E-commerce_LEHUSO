import ReactPaginate from "react-paginate";

export default function CommentPagination({
  itemsPerPage,
  comments,
  onPageChange,
}) {
  const pageCount = Math.ceil(comments.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    onPageChange(selectedPage.selected);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}
