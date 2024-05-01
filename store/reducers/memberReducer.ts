import { createSlice } from '@reduxjs/toolkit'

const memberSlice = createSlice({
    name: 'account',
    initialState: {
        listOfName: [],
        listOfEmail: [],
        listOfMobile: [],
        listOfDomain: [],
        listOfMembers: [],
    },
    reducers: {
        setName: (state, action) => {
            state.listOfName = action.payload
        },
        setEmail: (state, action) => {
            state.listOfEmail = action.payload
        },
        setMobile: (state, action) => {
            state.listOfMobile = action.payload
        },
        setDomain: (state, action) => {
            state.listOfDomain = action.payload
        },
        setListOfMember: (state, action) => {
            state.listOfDomain = action.payload
        },
    },
})

export const { setName, setMobile, setDomain, setEmail } = memberSlice.actions

export default memberSlice.reducer
