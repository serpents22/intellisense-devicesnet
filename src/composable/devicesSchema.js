import * as yup from 'yup'

export const addDeviceSchema = yup.object({

  deviceName: yup.string().required().label('Device Name'),
  deviceType: yup.string().required().label('Device Type'),
  imeiNumber: yup.string().required().label('IMEI Number'),
  simNumber: yup.number().required().label('SIM Number'),
  // simInfo: yup.string().label('Type')
  // notes: yup.string().required().label('Coordinate'),
});

export const updateDeviceSchema = yup.object({
  deviceName: yup.string().required().label('Device Name'),
  deviceType: yup.string().required().label('Device Type'),
  imeiNumber: yup.string().required().label('IMEI Number'),
  simNumber: yup.number().required().label('SIM Number'),
}); 