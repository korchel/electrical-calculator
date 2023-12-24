import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import Result from "./Result";
import {
  setVoltage, setAccumulators, setUpsEfficiency, setDischargeDepth, 
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
          accumulators: [{name: 'Источник 1', quantity: '', value: ''}, ],
          loads: [{name: 'Прибор 1', quantity: '', value: ''}, ],
        }}
        onSubmit={(values) => {
          const { voltage, accumulators, upsEfficiency, dischargeDepth, availableCapacity, loads } = values;
          dispatch(setVoltage(voltage));
          dispatch(setAccumulators(accumulators));
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
            <h2 className='title'>Исходные данные:</h2>
            <div className='flex-group mb-1 mr-2'>
              <label
                htmlFor="voltage"
                className='input-label'
              >
                U - напряжение, выдаваемое задействованной АКБ, В
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
                htmlFor="upsEfficiency"
                className='input-label'
              >
                h - КПД источника бесперебойного питания
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
              <h4>Источники питания:</h4>
              <FieldArray name="accumulators" render={({ insert, remove }) => (
                <div>
                {
                  values.accumulators.map((accumulator, index) => (
                    <div className='flex-group mb-1' key={`acc${index}`}>
                      <div className='flex-group w-50'>
                        <label htmlFor={`acc${index}name`}>{`${index + 1}.`}</label>
                        <Field
                          id={`acc${index}name`}
                          name={`accumulators.${index}.name`}
                          className="ups-input load-name-input mlr-05"
                        />
                      </div>
                      <div className='flex-group'>
                        <div className='flex-group'>
                          <label htmlFor={`acc${index}quantity`} className="mlr-05">количество:</label>
                          <Field
                            id={`acc${index}quantity`}
                            name={`accumulators.${index}.quantity`}
                            className="ups-input number-input"
                            type="number"
                          />
                          <ErrorMessage name={`accumulators.${index}.value`} component="p" className="tooltip" />
                        </div>
                        <div className='flex-group'>
                          <label htmlFor={`acc${index}value`} className="mlr-05">емкость, Ач:</label>
                          <Field
                            id={`acc${index}value`}
                            name={`accumulators.${index}.value`}
                            className='ups-input'
                            type="number"
                          />
                          <ErrorMessage name={`accumulators.${index}.value`} component="p" className="tooltip" />
                        </div>
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
                    insert(values.accumulators.length + 1, {name: `Источник ${values.accumulators.length + 1}`, quantity: '', value: ''})
                  }}
                  className="add-button"
                >
                  &#x2795;
                </button>
                <div className="flex-group mr-2">
                  <p>C - суммарная емкость, Ач:</p>
                  <p>
                    {values.accumulators.reduce((acc, accumulator) => {
                      const { value, quantity } = accumulator;
                      return value && quantity ? value * quantity + acc : acc;
                    }, 0)}
                  </p>
                </div>
              </div>
                )}
              />
            </div>
            <div>
              <h4>Нагрузка:</h4>
              <FieldArray name="loads" render={({ insert, remove }) => (
                <div >
                  {
                    values.loads.map((load, index) => (
                      <div className='flex-group mb-1' key={`load${index}`}>
                        <div className='flex-group w-50'>
                          <label htmlFor={`load${index}name`}>{`${index + 1}.`}</label>
                          <Field
                            id={`load${index}name`}
                            name={`loads.${index}.name`}
                            className="ups-input load-name-input mlr-05"
                          />
                        </div>
                        <div className='flex-group'>
                          <div className='flex-group'>
                            <label htmlFor={`load${index}quantity`} className="mlr-05">количество:</label>
                            <Field
                              id={`load${index}quantity`}
                              name={`loads.${index}.quantity`}
                              className="ups-input number-input"
                              type="number"
                            />
                            <ErrorMessage name={`loads.${index}.value`} component="p" className="tooltip" />
                          </div>
                          <div className='flex-group'>
                            <label htmlFor={`load${index}value`} className="mlr-05">мощность, Вт:</label>
                            <Field
                              id={`load${index}value`}
                              name={`loads.${index}.value`}
                              className='ups-input'
                              type="number"
                            />
                            <ErrorMessage name={`loads.${index}.value`} component="p" className="tooltip" />
                          </div>
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
                      insert(values.loads.length + 1, {name: `Прибор ${values.loads.length + 1}`, quantity: '', value: ''})
                    }}
                    className="add-button"
                  >
                    &#x2795;
                  </button>
                  <div className="flex-group mb-1 mr-2">
                    <p>P - суммарная нагрузка, Вт:</p>
                    <p>
                      {values.loads.reduce((acc, load) => {
                        const { value, quantity } = load;
                        return value && quantity ? value * quantity + acc : acc;
                      }, 0)}
                    </p>
                  </div>
                </div>
              )}
            />
            </div>
            <div className="flex-group">
              <button type='submit' className="primary-button">
                <span>Рассчитать</span>
              </button>
              <button type='reset' className="primary-button mlr-05" >
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