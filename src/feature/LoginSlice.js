import { createSlice } from '@reduxjs/toolkit'
const initialState=localStorage.getItem("login")?JSON.parse(localStorage.getItem("login")):{
    user: {
      isUser: false,
      userName: null,
      userEmail: null,
    },
    admin: {
      jwtToken: null,
      isAdmin: false,
      adminName: null,
      adminEmail: null,
    }
}
export const addLoginSlice = createSlice({
    name: 'login',
    initialState:initialState,
    reducers: {
      addLogin:(state,actions)=>{
        
        console.log("action Payload==>", actions.payload?.admin)

        if(actions.payload?.user!==null && actions.payload?.admin===null){
           // save user info
           state.user.isUser=true;
           state.user.userEmail=actions.payload?.user?.customerEmail
           state.user.userName=actions.payload?.user?.name
           
        }

        if(actions.payload?.admin!==null && actions.payload?.user===null){

  
          // save admin info
          state.admin.isAdmin=true;
          state.admin.adminEmail=actions.payload?.admin?.username
          state.admin.adminName="Admin"
          state.admin.jwtToken=actions.payload?.admin?.jwtToken
          //jwtToken
          
       }
      }, 
      
      addLogout: (state)=>{
      
          state.user.isUser=false;
          state.user.userName= null;
          state.user.userEmail= null;
  
          state.admin.jwtToken= null;
          state.admin.isAdmin= false;
          state.admin.adminName= null;
          state.admin.adminEmail= null;
      
      },
    },
  })

export const { addLogin, addLogout } = addLoginSlice.actions
export default addLoginSlice.reducer