import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesData: null,
  genderCategoriesData: null,
  categoriesInfoData: null,
  availableTimeData: null,
  cartDetails: null,
  selectedDate: null,
  slotDetailsData: null,
  AddressListData: null,
  selectedSlotData:null,
  slotAddressID:null,
  checkoutDetails:null,
  orderplaceData:null,
  slotDetailspincode:null
};

const bookTestSlice = createSlice({
  name: 'booktest',
  initialState,
  reducers: {
    categoriesSuccess: (state, action) => {
      state.categoriesData = action.payload.data;
    },
    genderCategoriesSuccess: (state, action) => {
      state.genderCategoriesData = action.payload.data;
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
    selectedSlot:  (state, action) => {
      state.selectedSlotData = action.payload.data;
    },
    clearCart:  (state, action) => {
      state.cartDetails = null;
    },
    slotDetails:  (state, action) => {
      state.slotDetailsData = action.payload.data;
      state.slotAddressID = action.payload.data?.addressId;
      console.log('slotPinCode',action.payload.data?.addressId)
      state.slotDetailspincode = action.payload.data?.pincode; 
    },
    AddressList:  (state, action) => {
      state.AddressListData = action.payload.data;
    },
    setcheckoutDetails:(state, action) => {
      state.checkoutDetails = action.payload.data;
    },
    setOrderPlaceData:(state, action) => {
      state.orderplaceData = action.payload.data;
    },
  },
});

export const { categoriesSuccess,categoriesInfoSuccess,availableTimeDataSuccess,
  cartDetailsSuccess,updateSelectedDate,genderCategoriesSuccess,
  clearCart,slotDetails,AddressList,selectedSlot,setcheckoutDetails,
  setOrderPlaceData} = bookTestSlice.actions;

export default bookTestSlice.reducer;
