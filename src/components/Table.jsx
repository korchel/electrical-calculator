import React from 'react';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';

import { getValues } from '../store/upsSlice';

const Table = () => {
  const values = useSelector(getValues);

  const book = new Excel.Workbook();
  const sheet = book.addWorksheet('name');
  sheet.columns = [
    { header: 'ПРИБОРЫ', key: 'loadName' },
    { header: 'КОЛ.', key: 'quantity' },
    { header: 'P', key: 'value' }
   ];


  const saveExcelFile = async () => {
    try {
      const buffer = await book.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), 'file.xlsx');
    } catch(error) {
      console.log(error)
    }
  }
  return (
    <button onClick={saveExcelFile}>download</button>
    
  )
};

export default Table;