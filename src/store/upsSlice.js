/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  voltage: 0,
  accumulator: {},
  upsEfficiency: 0,
  dischargeDepth: 0,
  availableCapacity: 0,
  loads: [],
  totalLoad: 0,
  capacitance: 0,
  holdUpTime: 0,
};
const upsSlice = createSlice({
  name: 'ups',
  initialState,
  reducers: {
    setVoltage: (state, action) => {
      state.voltage = action.payload;
    },
    setAccumulator: (state, action) => {
      state.accumulator = action.payload;
    },
    setUpsEfficiency: (state, action) => {
      state.upsEfficiency = action.payload;
    },
    setDischargeDepth: (state, action) => {
      state.dischargeDepth = action.payload;
    },
    setAvailableCapacity: (state, action) => {
      state.availableCapacity = action.payload;
    },
    setLoads: (state, action) => {
      state.loads = action.payload;
    },
    calculateTotalLoad: (state) => {
      state.totalLoad = state.loads.reduce((acc, load) => load.value * load.quantity + acc, 0);
    },
    calculateCapacitance: (state) => {
      state.capacitance = state.accumulators
        .reduce((acc, accumulator) => accumulator.value * accumulator.quantity + acc, 0);
    },
    calculateHoldUptime: (state) => {
      const {
        voltage, capacitance, upsEfficiency, dischargeDepth, availableCapacity, totalLoad,
      } = state;
      state
        .holdUpTime = (voltage
          * capacitance
          * upsEfficiency
          * dischargeDepth
          * availableCapacity
          / totalLoad).toFixed(2);
    },
  },
});
export const state = upsSlice;
export const {
  setVoltage, setAccumulator, setUpsEfficiency,
  setDischargeDepth, setAvailableCapacity,
  calculateHoldUptime, setLoads, calculateTotalLoad, calculateCapacitance,
} = upsSlice.actions;

export const getValues = (state) => state.upsSlice;

export default upsSlice.reducer;
