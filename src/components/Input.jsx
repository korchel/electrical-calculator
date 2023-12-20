import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import Result from "./Result";
import {
  setVoltage, setCapacitance, setNumberOfBatteries, setUpsEfficiency, setDischargeDepth, 
  setAvailableCapacity, setLoads, calculateHoldUptime, calculateTotalLoad,
} from '../store/upsSlice'
import validationSchema from './validationSchema';
import state from '../store/index';

const Input = () => {
  const [showResult, setShowResult] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          voltage: '',
          capacitance: '',
          numberOfBatteries: '',
          upsEfficiency: '',
          dischargeDepth: '',
          availableCapacity: '',
          loads: ['', ],
        }}
        onSubmit={(values) => {
          const { voltage, capacitance, numberOfBatteries, upsEfficiency, dischargeDepth, availableCapacity, loads } = values;
          dispatch(setVoltage(voltage));
          dispatch(setCapacitance(capacitance));
          dispatch(setNumberOfBatteries(numberOfBatteries));
          dispatch(setUpsEfficiency(upsEfficiency));
          dispatch(setDischargeDepth(dischargeDepth));
          dispatch(setAvailableCapacity(availableCapacity));
          dispatch(setLoads(loads));
          dispatch(calculateTotalLoad());
          dispatch(calculateHoldUptime());
          setShowResult(true);
        }}
      >
        {({ values }) => (
          <Form>
            <h2 className='title'>Исходные данные:</h2>
            <div className='flex-group mb-1 mr-2'>
              <label
                htmlFor="voltage"
                className='input-label mr-2'
              >
                U - Напряжение, выдаваемое задействованной АКБ, В
              </label>
              <Field
                id="voltage"
                name="voltage"
                className='ups-input'
                type="number"
             />
              <ErrorMessage name="voltage" component="p" className="tooltip" />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label
                htmlFor='capacitance'
                className='input-label'
              >
                C - емкость АКБ, Ач
              </label>
              <Field
                id="capacitance"
                name='capacitance'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="capacitance" component="p" className="tooltip" />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label
                htmlFor='numberOfBatteries'
                className="input-label"
              >
                N - количество АКБ, шт.
              </label>
              <Field
                id="numberOfBatteries"
                name='numberOfBatteries'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="numberOfBatteries" component="p" className="tooltip" />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label
                htmlFor="upsEfficiency"
                className='input-label'
              >
                КПД источника бесперебойного питания
              </label>
              <Field
                id="upsEfficiency"
                name='upsEfficiency'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="upsEfficiency" component="p" className="tooltip" />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label
                htmlFor="dischargeDepth"
                className='input-label'
              >
                K - глубина разряда батареи
              </label>
              <Field
                id="dischargeDepth"
                name='dischargeDepth'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="dischargeDepth" component="p" className="tooltip" />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label
                htmlFor="availableCapacity"
                className='input-label'
              >
                Kg - доступная емкость
              </label>
              <Field
                id="availableCapacity"
                name="availableCapacity"
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="availableCapacity" component="p" className="tooltip" />
            </div>
            <div>
              <h4>Нагрузка, Вт:</h4>
              <FieldArray name="loads" render={({ insert, remove }) => (
                <div className="mb-1">
                  {
                    values.loads.map((load, index) => (
                      <div className='flex-group mb-1' key={`load${index}`}>
                        <label htmlFor={`load${index}`} className='input-label'>{`прибор ${index + 1}`}</label>
                        <div className='flex-group'>
                        <Field
                          id={`load${index}`}
                          name={`loads.${index}`}
                          className='ups-input'
                          type="number"
                        />
                        <ErrorMessage name={`loads.${index}`} component="p" className="tooltip" />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="delete-button"
                        >
                          &#x2716;
                        </button>
                        </div>
                      </div>
                    ))
                  }
                  <button
                    type="button"
                    onClick={() => {
                      insert(values.loads.length + 1, 0)
                    }}
                    className="add-button"
                  >
                    &#x2795;
                  </button>
                  <div className="flex-group mb-1 mr-2">
                    <p>Суммарная нагрузка, Вт:</p>
                    <p>{values.loads.reduce((value, acc) => value + acc, 0)}</p>
                  </div>
                </div>
              )} />
            </div>
            <div className="flex-center mb-1">
              <button type='submit' className="submit-button">
                <span>Рассчитать</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      
      <Result show={showResult}/>
    </>
  );
};

export default Input;