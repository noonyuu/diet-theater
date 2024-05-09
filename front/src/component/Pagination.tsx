import React, { useEffect, useRef, useState } from "react";

interface Props {
  totalPage: number;
  per: number;
  onChange: (e: { page: number }) => void;
}

const Pagination: React.FC<Props> = (props) => {
  const isFirstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // 初回レンダリング時は何もしない
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    props.onChange({ page: currentPage });
  }, [currentPage]);

  const pages: number = Math.ceil(props.totalPage / props.per);

  // >ボタンを押した時の処理
  const next = (): void => {
    if (currentPage == pages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  // <ボタンを押した時の処理
  const prev = (): void => {
    if (currentPage == 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  // ページ番号をクリックした時の処理
  const handlePage = (page: number): void => {
    setCurrentPage(page);
  };

  // ページ番号の配列を生成
  const generatePageNumbers = () => {
   let pageNumbers: (number | string)[] = [];
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers = [1];
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(pages - 1, currentPage + 2);

      if (currentPage - 1 <= 3) {
        end = 1 + 4;
      }

      if (pages - currentPage <= 3) {
        start = pages - 4;
      }

      if (start > 2) {
        pageNumbers.push("...");
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < pages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(pages);
    }
    return pageNumbers;
  };

  return (
    <div className="flex">
      {pages !== 0 && (
        <>
          <span onClick={() => prev()}>&lt;</span>
          <ul className="flex list-none px-2">
            {generatePageNumbers().map((page, index) =>
              typeof page === "number" ? (
                page === currentPage ? (
                  <li key={index} className="bg-orange-500 px-4">
                    {page}
                  </li>
                ) : (
                  <li
                    key={index}
                    onClick={() => handlePage(page)}
                    className="cursor-pointer px-4"
                  >
                    {page}
                  </li>
                )
              ) : (
                <li key={index} className="px-4">
                  {page}
                </li>
              ),
            )}
          </ul>
          <span onClick={() => next()}>&gt;</span>
        </>
      )}
    </div>
  );
};

export default Pagination;
