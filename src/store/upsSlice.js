import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  voltage: 12,
  capacitance: 72,
  upsEfficiency: 0.9,
  dischargeDepth: 0.9,
  availableCapacity: 0.9,
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
    setUpsEfficiency: (state, action) => {
      state.upsEfficiency = action.payload;
    },
    setDischargeDepth: (state, action) => {
      state.dischargeDepth = action.payload;
    },
    setAvailableCapacity: (state, action) => {
      state.availableCapacity = action.payload;
    },
    setTitalLoad: (state, action) => {
      state.totalLoad = action.payload;
    },
    calculateHoldUptime: (state) => {
      const {
        voltage, capacitance, upsEfficiency, dischargeDepth, availableCapacity, totalLoad
      } = state;
      state.holdUpTime = voltage * capacitance * upsEfficiency * dischargeDepth * availableCapacity / totalLoad;
    },

    addLoad: (state, action) => {
      state.loads = [...state.loads, action.payload];
    }
  }
});

export const {
  setVoltage, setCapacitance, setUpsEfficiency, setDischargeDepth, setAvailableCapacity, setTitalLoad, calculateHoldUptime,
} = upsSlice.actions;

export default upsSlice.reducer;