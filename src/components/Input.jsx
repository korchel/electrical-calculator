import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import Result from "./Result";
import {
  setVoltage, setCapacitance, setUpsEfficiency, setDischargeDepth,
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
          upsEfficiency: '',
          dischargeDepth: '',
          availableCapacity: '',
          loads: ['', ],
        }}
        onSubmit={(values) => {
          const { voltage, capacitance, upsEfficiency, dischargeDepth, availableCapacity, loads } = values;
          dispatch(setVoltage(voltage));
          dispatch(setCapacitance(capacitance));
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
              <label className='input-label mr-2'>U - Напряжение, выдаваемое задействованной АКБ, В</label>
              <Field
                name='voltage'
                className='ups-input'
                type="number"
             />
              <ErrorMessage name="voltage" component="p" className="tooltip" />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label className='input-label'>C - емкость задействованной АКБ, Ач</label>
              <Field
                name='capacitance'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="capacitance" component="p" className="tooltip" />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label className='input-label'>КПД источника бесперебойного питания</label>
              <Field
                name='upsEfficiency'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="upsEfficiency" component="p" className="tooltip" />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label className='input-label'>K - глубина разряда батареи</label>
              <Field
                name='dischargeDepth'
                className='ups-input'
                type="number"
              />
              <ErrorMessage name="dischargeDepth" component="p" className="tooltip" />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label className='input-label'>Kg - доступная емкость</label>
              <Field
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
                        <label className='input-label'>{`прибор ${index + 1}`}</label>
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