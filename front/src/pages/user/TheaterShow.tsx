import DayBox from "../../component/DayBox";

const TheaterShow = () => {
  const handlePaginate = (page: number) => {
    // APIを叩きに行く処理
  };

  return (
    <main className="mt-16 flex-1 bg-gray-100">
      <div className="mx-auto mt-4 w-[calc(12rem*7+2rem)] overflow-hidden">
        {/* カレンダーアイコン */}
        <button type="button">
          {/* <UilCalender fontSize={32} /> */}
        </button>
        <div className="">
          <DayBox />
        </div>
      </div>
    </main>
  );
};

export default TheaterShow;
