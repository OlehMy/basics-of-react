import React from 'react';
import classes from './Pagination.module.css'
import { getPagesArray } from '../../../utils/pages';

function Pagination({ page, changePage, totalPages }) {
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className={classes.pagination}>
      {pagesArray.map(p =>
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? classes.paginationPageCurrent : classes.paginationPage}>
          {p}
        </span>
      )}
    </div>
  );
}

export default Pagination;