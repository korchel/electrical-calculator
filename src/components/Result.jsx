import { useSelector } from 'react-redux'

import { getValues } from '../store/upsSlice'

const Result = ({ show }) => {
  const values = useSelector(getValues);
  const { voltage, capacitance, upsEfficiency, dischargeDepth, availableCapacity, totalLoad, holdUpTime } = values;
  return show && (
    <div>
      <p>
        {`T = U\xD7C\xD7h\xD7K\xD7Kg/P = ${voltage}\xD7${capacitance}\xD7${upsEfficiency}\xD7${dischargeDepth}\xD7${availableCapacity}/${totalLoad} = ${holdUpTime} ч. = ${(holdUpTime * 60).toFixed()} мин.`}
      </p>
    </div>
  )
}

export default Result;