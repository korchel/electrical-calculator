import { useState } from "react";
import { useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray } from 'formik';

import Result from "./Result";

const Input = () => {
  const [showResult, setShowResult] = useState(true);

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
            <div className='input-group'>
              <label className='input-label'>U - Напряжение, выдаваемое задействованной АКБ, В</label>
              <Field
                name='voltage'
                className='ups-input'
                type='number'
              />
            </div>
            <div className='input-group'>
              <label className='input-label'>C - емкость задействованной АКБ, Ач</label>
              <Field
                name='capacitance'
                className='ups-input'
                type='number'
              />
            </div>
            <div className='input-group'>
              <label className='input-label'>КПД источника бесперебойного питания</label>
              <Field
                name='upsEfficiency'
                className='ups-input'
                type='number'
              />
            </div>
            <div className='input-group'>
              <label className='input-label'>K - глубина разряда батареи</label>
              <Field
                name='dischargeDepth'
                className='ups-input'
                type='number'
              />
            </div>
            <div className='input-group'>
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
                <div>
                  {
                    values.loads.map((load, index) => (
                      <div className='input-group' key={`load${index}`}>
                        <label className='input-label'>{`прибор ${index + 1}`}</label>
                        <div className="input-group">
                          <Field
                            id={`load${index}`}
                            name={`loads.${index}`}
                            className='ups-input'
                            type="number"
                          />
                          <button type="button" onClick={() => remove(index)}>-</button>
                        </div>
                      </div>
                    ))
                  }
                  <button type="button" onClick={() => {
                    insert(values.loads.length + 1, {id: 0, value: 0})
                  }}>add load</button>
                </div>
              )} />
            </div>
            <button type='submit'>
              Рассчитать
            </button>
          </Form>
        )}
      </Formik>
      <button onClick={() => setShowResult(!showResult)} > show </button>
      {showResult && <Result />}
    </>
  );
};

export default Input;