import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import Result from "./Result";
import {
  setVoltage, setAccumulator, setUpsEfficiency, setDischargeDepth, 
  setAvailableCapacity, setLoads, calculateHoldUptime, calculateTotalLoad, calculateCapacitance,
} from '../store/upsSlice'
import validationSchema from './validationSchema';
import DwonLoad from "./DwonLoad";
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
          upsEfficiency: '',
          dischargeDepth: '',
          availableCapacity: '',
          accumulator: {name: 'Источник', quantity: '', value: ''},
          loads: [{name: 'Прибор 1', quantity: '', value: ''}, ],
        }}
        onSubmit={(values) => {
          const { voltage, accumulator, upsEfficiency, dischargeDepth, availableCapacity, loads } = values;
          dispatch(setVoltage(voltage));
          dispatch(setAccumulator(accumulator));
          dispatch(setUpsEfficiency(upsEfficiency));
          dispatch(setDischargeDepth(dischargeDepth));
          dispatch(setAvailableCapacity(availableCapacity));
          dispatch(setLoads(loads));
          dispatch(calculateTotalLoad());
          dispatch(calculateCapacitance());
          dispatch(calculateHoldUptime());
          setShowResult(true);
        }}
      >
        {({ values }) => (
          <Form className="w-100">
            <div className="grid w-100">
            <h2 className='title grid-full-row'>Исходные данные:</h2>
            <label
              htmlFor="voltage"
              className='input-label'
            >
              U - напряжение, выдаваемое задействованной АКБ, В
            </label>
            <div className="grid-last-column">
              <Field
                id="voltage"
                name="voltage"
                className='ups-input '
                type="number"
              />
              <ErrorMessage name="voltage" component="p" className="tooltip" />
            </div>
            <label
              htmlFor="upsEfficiency"
              className='input-label'
            >
              h - КПД источника бесперебойного питания
            </label>
            <div className="grid-last-column">
              <Field
                id="upsEfficiency"
                name='upsEfficiency'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="upsEfficiency" component="p" className="tooltip" />
            </div>
            <label
              htmlFor="dischargeDepth"
              className='input-label'
            >
              K - глубина разряда батареи
            </label>
            <div className="grid-last-column">
              <Field
                id="dischargeDepth"
                name='dischargeDepth'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="dischargeDepth" component="p" className="tooltip" />
            </div>
            <label
              htmlFor="availableCapacity"
              className='input-label'
            >
              Kg - доступная емкость
            </label>
            <div className="grid-last-column">
              <Field
                id="availableCapacity"
                name="availableCapacity"
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="availableCapacity" component="p" className="tooltip" />
            </div>
            
            <label
              htmlFor='accName'
              className="grid-full-row"
            >
              C – емкость задействованной АКБ, Ач:
            </label>
            <Field
              id='accName'
              name='accName'
              className="ups-input load-name-input"
            /> 
            <label
              className="grid-end grid-first-column"
              htmlFor='accQuantity'
            >
              количество:
            </label>
            <div >
              <Field
                id='accQuantity'
                name='accQuantity'
                className="ups-input number-input"
                type="number"
              />
              <ErrorMessage name='accQuantity' component="p" className="tooltip" />
            </div>
            <label className="grid-end grid-first-column" htmlFor='accValue'>емкость, Ач:</label>
            <div>
              <Field
                id='accValue'
                name='accValue'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name='accValue' component="p" className="tooltip" />
            </div>
            <h4 className='grid-full-row'>Нагрузка:</h4>
            <FieldArray  name="loads" render={({ insert, remove }) => (
              <>
                {
                  values.loads.map((load, index) => (
                    <div className='grid-full-row subgrid' key={`load${index}`}>

                      <Field
                        id={`load${index}name`}
                        name={`loads.${index}.name`}
                        className="ups-input load-name-input"
                      />
                      <button
                          type="button"
                          onClick={() => remove(index)}
                          className="del-btn visibility-sm"
                        >
                          &#x2716;
                        </button>

                      <label
                        htmlFor={`load${index}quantity`}
                        className="grid-end grid-first-column"
                      >
                        количество:
                      </label>
                      <Field
                        id={`load${index}quantity`}
                        name={`loads.${index}.quantity`}
                        className="ups-input"
                        type="number"
                      />
                      <ErrorMessage name={`loads.${index}.value`} component="p" className="tooltip" />
                      <label
                        htmlFor={`load${index}value`}
                        className="grid-end"
                      >
                        мощность, Вт:
                      </label>
                      <div className="flex-group">
                        <Field
                          id={`load${index}value`}
                          name={`loads.${index}.value`}
                          className='ups-input '
                          type="number"
                        />
                        <ErrorMessage name={`loads.${index}.value`} component="p" className="tooltip" />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="del-btn visibility-md"
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
                    insert(values.loads.length + 1, {name: `Прибор ${values.loads.length + 1}`, quantity: '', value: ''})
                  }}
                  className="add-button grid-full-row"
                >
                  &#x2795;
                </button>
                <p className="">P - суммарная нагрузка, Вт:</p>
                <p className="grid-last-column">
                  {values.loads.reduce((acc, load) => {
                    const { value, quantity } = load;
                    return value && quantity ? value * quantity + acc : acc;
                  }, 0)}
                </p>
              </>
            )}
          />
          </div>
          <div className="flex-button-group">
            <button type='submit' className="primary-button">
                <span>Рассчитать</span>
              </button>
              <button type='reset' className="primary-button" >
                <span>Сбросить</span>
              </button>
              <DwonLoad />
          </div>
            
          </Form>
        )}
      </Formik>
      
      <Result show={showResult}/>
    </>
  );
};

export default Input;