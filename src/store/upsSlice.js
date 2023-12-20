import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  voltage: 0,
  capacitance: 0,
  numberOfBatteries: 0,
  upsEfficiency: 0,
  dischargeDepth: 0,
  availableCapacity: 0,
  loads: [],
  totalLoad: 0,
  holdUpTime: 0,
}
const upsSlice = createSlice({
  name: 'ups',
  initialState,
  reducers: {
    setVoltage: (state, action) => {
      state.voltage = action.payload;
    },
    setCapacitance: (state, action) => {
      state.capacitance = action.payload;
    },
    setNumberOfBatteries: (state, action) => {
      state.numberOfBatteries = action.payload;
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
      state.totalLoad = state.loads.reduce((value, acc) => value + acc, 0);
    },
    calculateHoldUptime: (state) => {
      const {
        voltage, capacitance, numberOfBatteries, upsEfficiency, dischargeDepth, availableCapacity, totalLoad
      } = state;
      state.holdUpTime = (voltage * capacitance * numberOfBatteries * upsEfficiency * dischargeDepth * availableCapacity / totalLoad).toFixed(2);
    },

    addLoad: (state, action) => {
      state.loads = [...state.loads, action.payload];
    }
  }
});
export const state = upsSlice;
export const {
  setVoltage, setCapacitance, setNumberOfBatteries, setUpsEfficiency,
  setDischargeDepth, setAvailableCapacity, setTitalLoad,
  calculateHoldUptime, setLoads, calculateTotalLoad,
} = upsSlice.actions;

export const getValues = (state) => state.upsSlice;

export default upsSlice.reducer;