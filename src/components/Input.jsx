import { useState } from "react";
import { useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray } from 'formik';

import Result from "./Result";

const Input = () => {
  const [showResult, setShowResult] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          voltage: 0,
          capacitance: 0,
          upsEfficiency: 0,
          dischargeDepth: 0,
          availableCapacity: 0,
          loads: [],
          totalLoad: 0,
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <h2 className='title'>Исходные данные:</h2>
            <div className='flex-group mb-1 mr-2'>
              <label className='input-label mr-2'>U - Напряжение, выдаваемое задействованной АКБ, В</label>
              <Field
                name='voltage'
                className='ups-input'
                type='number'
              />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label className='input-label'>C - емкость задействованной АКБ, Ач</label>
              <Field
                name='capacitance'
                className='ups-input'
                type='number'
              />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label className='input-label'>КПД источника бесперебойного питания</label>
              <Field
                name='upsEfficiency'
                className='ups-input'
                type='number'
              />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label className='input-label'>K - глубина разряда батареи</label>
              <Field
                name='dischargeDepth'
                className='ups-input'
                type='number'
              />
            </div>
            <div className='flex-group mb-1 mr-2'>
              <label className='input-label'>Kg - доступная емкость</label>
              <Field
                name='availableCapacity'
                className='ups-input'
                type='number'
              />
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
              <button type='submit' className="submit-button" onClick={() => setShowResult(!showResult)}>
                <span>Рассчитать</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {showResult && <Result />}
    </>
  );
};

export default Input;