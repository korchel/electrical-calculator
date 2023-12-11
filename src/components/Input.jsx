import { useState } from "react";
import Result from "./Result";

const Input = () => {
  const [loadInputs, setLoadInputs] = useState(1);
  const [showResult, setShowResult] = useState(true);
  console.log(loadInputs)

  return (
    <>
      <form>
        <h2 className='title'>Исходные данные:</h2>
        <div className='input-group'>
          <label className='input-label'>U - Напряжение, выдаваемое задействованной АКБ, В</label>
          <input
            name='U'
            className='ups-input'
            value={12}
            type='number'
          />
        </div>
        <div className='input-group'>
          <label className='input-label'>C - емкость задействованной АКБ, Ач</label>
          <input
            name='C'
            className='ups-input'
            value={72}
            type='number'
          />
        </div>
        <div className='input-group'>
          <label className='input-label'>КПД источника бесперебойного питания</label>
          <input
            name='C'
            className='ups-input'
            value={0.9}
            type='number'
          />
        </div>
        <div className='input-group'>
          <label className='input-label'>K - глубина разряда батареи</label>
          <input
            name='K'
            className='ups-input'
            value={0.9}
            type='number'
          />
        </div>
        <div className='input-group'>
          <label className='input-label'>Kg - доступная емкость</label>
          <input
            name='Kg'
            className='ups-input'
            value={0.9}
            type='number'
          />
        </div>
        <div>
          <h4>Нагрузка, Вт:</h4>
          <button type='button' onClick={() => setLoadInputs(loadInputs + 1)}>+</button>
          <div className='input-group'>
            <label className='input-label'>{`прибор 1`}</label>
            <div className="input-group">
              <input
                className='ups-input'
                type="number"
              />
              <button>-</button>
            </div>
          </div>
        </div>
        <button type='submit'>
          Рассчитать
        </button>
      </form>
      <button onClick={() => setShowResult(!showResult)} > show </button>
      {showResult && <Result />}
    </>
  )
}

export default Input;