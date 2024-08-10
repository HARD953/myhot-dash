import { configureStore } from "@reduxjs/toolkit";
import sidebarShowReducer from "./features/sidebar/sidebarShowSlice";


export default configureStore({
    reducer:{
        sidebar: sidebarShowReducer
    },
})