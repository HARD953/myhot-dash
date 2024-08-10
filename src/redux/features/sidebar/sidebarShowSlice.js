import { createSlice } from "@reduxjs/toolkit";


export const sidebarShowSlice = createSlice({
    name:"sidebar",
    initialState: {
        sidebarShow: true
    },
    reducers:{
        changeSidebar: (state,action)=> {
            return {
                ...state,
                sidebarShow: action?.payload
            }
        }
    }
})

export const {changeSidebar} =  sidebarShowSlice.actions

export default sidebarShowSlice.reducer