import React from 'react';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';

import { getValues } from '../store/upsSlice';

const DwonLoad = () => {
  const values = useSelector(getValues);
  const { voltage, capacitance, accumulator, upsEfficiency, dischargeDepth, availableCapacity, totalLoad, holdUpTime, loads } = values;
  
  const book = new Excel.Workbook();
  const sheet = book.addWorksheet('ИБП');
  sheet.columns = [
    { header: 'ПРИБОРЫ', key: 'name', width: 65},
    { header: 'КОЛ., шт.', key: 'quantity', width: 10 },
    { header: 'P, Вт', key: 'value', width: 13 },
    { header: '', key: 'empty', width: 16 }
  ];
  sheet.spliceRows(1, 0, []);
  sheet.spliceRows(2, 0, ['Напряжение питания = 220 В']);
  sheet.spliceRows(3, 0, ['Время резервирования = 1 час']);
  sheet.spliceRows(4, 0, ['Средняя температура эксплуатации: t = +25°C']);
  sheet.spliceRows(5, 0, []);

  const firstColumn = sheet.getColumn(1);
  const secondColumn = sheet.getColumn(2);
  const thirdColumn = sheet.getColumn(3);

  firstColumn.font = {name: 'Arial Narrow', size: 9};
  secondColumn.font = {name: 'Arial Narrow', size: 9};
  thirdColumn.font = {name: 'Arial Narrow', size: 9};

  sheet.getRow(6).font = { bold: true, color: { argb: 'ff0000ff' } };
  
  secondColumn.alignment = { horizontal: 'center'};
  thirdColumn.alignment = { horizontal: 'center'};
  
  sheet.addRows(loads);

  let lastLoadNumber = sheet.lastRow.number;

  sheet.insertRows(lastLoadNumber + 1, [
    ['', 'Итого:', `${totalLoad} Вт`],
    [],
    ['РАСЧЕТ:'],
    ['Источник питания:', 'КОЛ.', 'C, Ач'],
    accumulator,
    ['Формула расчета:'],
    ['Т = U * С * h * К * Kg / P'],
  ]);

  sheet.getRow(lastLoadNumber + 1).getCell(2).font = { bold: true, color: { argb: 'ff0000ff' } };
  sheet.getRow(lastLoadNumber + 1).getCell(3).font = { bold: true };
  sheet.getRow(lastLoadNumber + 3).getCell(1).font = { bold: true, color: { argb: 'ff0000ff' } };
  sheet.getRow(lastLoadNumber + 4).font = { bold: true, color: { argb: 'ff0000ff' } };

  lastLoadNumber = sheet.lastRow.number;
  sheet.mergeCells(`A${lastLoadNumber}:D${lastLoadNumber}`);
  sheet.lastRow.font = { bold: true };
  sheet.lastRow.alignment = { horizontal: 'center' };

  sheet.insertRows(lastLoadNumber + 1, [
    [],
    ['T – продолжительность автономного питания;'],
    [`U – напряжение, выдаваемое задействованной АКБ – ${voltage} В;`],
    [`C – емкость задействованной АКБ – ${capacitance} Ач;`],
    [`h – КПД ИБП – ${upsEfficiency} (${upsEfficiency * 100}%)`],
    [`K – глубина разряда батареи – ${dischargeDepth} (${dischargeDepth * 100}%)`],
    [`Kg – доступная емкость – ${availableCapacity} (${availableCapacity * 100}%)`],
    [`P – суммарная нагрузка – ${totalLoad} Вт.`],
    [],
    [`Т = U \xD7 С \xD7 h \xD7 К \xD7 Kg / P =  ${voltage} \xD7 ${capacitance} \xD7 ${upsEfficiency} \xD7 ${dischargeDepth} \xD7 ${availableCapacity} / ${totalLoad} ~ 0,73 ч = 44 мин.`],
    [],
    [`Согласно ТЗ на системы безопасности: "время работы периферийного оборудования от источников бесперебойного питания должно
      быть не менее 30 мин. ", следовательно: Источник питания в данной конфигурации подходит под требования к системе СОТ`],
    []
  ]);

  const saveExcelFile = async () => {
    try {
      const buffer = await book.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), 'file.xlsx');
    } catch(error) {
      console.log(error)
    }
  }
  return (
    <button type="button" className="primary-button" onClick={saveExcelFile}><span>Скачать Excel</span></button>
  );
};

export default DwonLoad;