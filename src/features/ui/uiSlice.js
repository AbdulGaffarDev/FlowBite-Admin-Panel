import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name : 'ui',
    initialState : {
        theme : 'light',
        isPopupOpen : false,
        isAlertDisplaying : false,
        isProductFormOpen : false,
        isAnyModalOpen : false,
    },
    reducers : {
        toggleTheme : (state) => {
            state.theme = (state.theme === 'light' ? 'dark' : 'light')
        },
        setTheme : (state, actions) => {
            state.theme = actions.payload
        },
        handlePopup : (state) => {
            state.isPopupOpen = !state.isPopupOpen;
        },
        handleAlert : (state) => {
            state.isAlertDisplaying = !state.isAlertDisplaying;
        },
        handleProductForm : (state) => {
            state.isProductFormOpen = !state.isProductFormOpen;
        },
        handleIsAnyModalOpen : (state) => {
            state.isAnyModalOpen = !state.isAnyModalOpen;
        }
    }
})

export const {toggleTheme, setTheme, handlePopup, handleAlert, handleProductForm, handleIsAnyModalOpen} = uiSlice.actions;

export default uiSlice.reducer;