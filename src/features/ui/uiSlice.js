import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name : 'ui',
    initialState : {
        theme : 'light',
        isPopupOpen : false,
        isAlertDisplaying : false,
        // isEditFormOpen : false,
    },
    reducers : {
        toggleTheme : (state) => {
            state.theme = (state.theme === 'light' ? 'dark' : 'light')
        },
        handlePopup : (state) => {
            state.isPopupOpen = !state.isPopupOpen;
        },
        handleAlert : (state) => {
            state.isAlertDisplaying === !state.isAlertDisplaying;
        },
    }
})

export const {toggleTheme, handlePopup, handleAlert} = uiSlice.actions;

export default uiSlice.reducer;