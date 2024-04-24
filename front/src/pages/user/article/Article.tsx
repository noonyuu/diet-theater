import React from "react";
import Search from "../../../component/Search";
import { Button } from "../../../component/button";
import Card from "../../../component/Card";

const Article = () => {
  return (
    <main className="mt-16 flex-1 bg-bac-main">
      <div className="m-4 flex justify-center">
        <Search />
        <Button
          name="Search"
          color="bg-blue-500"
          decoration="rounded-r-lg"
          font="text-white text-sm"
          action={() => {}}
        />
      </div>
      <Card />
    </main>
  );
};

export default Article;
