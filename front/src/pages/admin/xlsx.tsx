import React, { ChangeEvent, useState } from "react";
import readExcelFile from "../../logic/Excel";

const ExcelReader: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const readData = await readExcelFile(file);
      setData(readData as any[]);
    }
  };

  return (
    <div>
      <div className="flex w-full">
        <label
          htmlFor="file"
          className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 bg-red-200 p-2"
        >
          ファイルを選択
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      <table className="table-auto">
        <thead className="">
          <tr className="">
            {data[0] &&
              Object.keys(data[0]).map((key) => <th key={key} className="border">{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((value, j) => (
                <td key={j} className="border">
                  {value as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ExcelReader;
