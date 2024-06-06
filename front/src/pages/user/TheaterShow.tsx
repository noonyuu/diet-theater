import DayBox from "../../component/DayBox";
import ShowSpeech from "./ShowSpeech";
const TheaterShow = () => {
  const handlePaginate = (page: number) => {
    // APIを叩きに行く処理
  };

  return (
    <main className="mt-16 flex-1 bg-gray-100">
      <div className="mx-auto mt-4">
        {/* カレンダーアイコン */}
        <button type="button">{/* <UilCalender fontSize={32} /> */}</button>
        <div className="">
          <DayBox />
        </div>
        <ShowSpeech currPoint={0} />
      </div>
    </main>
  );
};

export default TheaterShow;
