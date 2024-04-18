import React, { ChangeEvent, useState } from "react";
import readExcelFile from "../../logic/index";

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
      <input type="file" onChange={handleFile} accept=".xlsx, .xls" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExcelReader;
