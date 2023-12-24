import * as Yup from 'yup';

export default Yup.object().shape({
  voltage: Yup.number()
    .positive('Должно быть больше 0')
    .required('Обязательное поле'),
  upsEfficiency: Yup.number()
    .positive('Должно быть больше 0')
    .max(1, 'Должно быть меньше 1')
    .required('Обязательное поле'),
  dischargeDepth: Yup.number()
    .positive('Должно быть больше 0')
    .max(1, 'Должно быть меньше 1')
    .required('Обязательное поле'),
  availableCapacity: Yup.number()
    .positive('Должно быть больше 0')
    .max(1, 'Должно быть меньше 1')
    .required('Обязательное поле'),
  loads: Yup.array().of(Yup.object().shape({
    quantity: Yup.number()
      .positive('Должно быть больше 0')
      .required('Обязательное поле'),
    value: Yup.number()
      .positive('Должно быть больше 0')
      .required('Обязательное поле'),
  })),
  accumulators: Yup.array().of(Yup.object().shape({
    quantity: Yup.number()
      .positive('Должно быть больше 0')
      .required('Обязательное поле'),
    value: Yup.number()
      .positive('Должно быть больше 0')
      .required('Обязательное поле'),
  })),
});