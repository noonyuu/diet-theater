import React from "react";

// props の型を定義
interface SearchProps {
  placeholder: string;
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
  return (
    <input
      type="search"
      placeholder={placeholder}
      className="w-full rounded-md border-[1px] border-gray-200 bg-white p-1 focus:border-green-200 focus:outline-none"
    />
  );
};

export default Search;
