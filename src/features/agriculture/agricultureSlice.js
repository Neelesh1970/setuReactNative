import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesData: null,
  categoriesInfoData: null,
  availableTimeData: null,
  cartDetails: null,
  selectedDate: null,
  isComefromBookAppointment: false,
};

const agricultureSlice = createSlice({  
  name: 'agriculture',
  initialState,
  reducers: {
    categoriesSuccess: (state, action) => {
      state.categoriesData = action.payload.data;
    },
    categoriesInfoSuccess: (state, action) => {
      state.categoriesInfoData = action.payload.data;
    },
    availableTimeDataSuccess: (state, action) => {
      state.availableTimeData = action.payload.data;
    },
    cartDetailsSuccess: (state, action) => {
      state.cartDetails = action.payload.data;
    },
    updateSelectedDate:  (state, action) => {
      state.selectedDate = action.payload.data;
    },
    clearCart:  (state, action) => {
      state.cartDetails = null;
    },
    setisComefromBookAppoint:  (state, action) => { 
      state.isComefromBookAppointment = action.payload.data;
    },
  },
});

export const { categoriesSuccess,categoriesInfoSuccess,availableTimeDataSuccess,cartDetailsSuccess,updateSelectedDate,clearCart,setisComefromBookAppoint} = agricultureSlice.actions;

export default agricultureSlice.reducer;
