import { useState } from "react";
import { useSelector } from 'react-redux';
import { Form, Formik, Field } from 'formik';

import Result from "./Result";

const Input = () => {
  const [loadInputs, setLoadInputs] = useState(1);
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
          totalLoad: 0,
        }}
        onSubmit={() => {
          
        }}
      >
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
            <button type='button' onClick={() => setLoadInputs(loadInputs + 1)}>+</button>
            <div className='input-group'>
              <label className='input-label'>{`прибор 1`}</label>
              <div className="input-group">
                <Field
                  className='ups-input'
                  type="number"
                  name="totalLoad"
                />
                <button>-</button>
              </div>
            </div>
          </div>
          <button type='submit'>
            Рассчитать
          </button>
        </Form>
        <button onClick={() => setShowResult(!showResult)} > show </button>
      </Formik>
      
      {showResult && <Result />}
    </>
  );
};

export default Input;