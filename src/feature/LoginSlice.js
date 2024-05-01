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
        
        

        if(actions.payload?.user!==null && actions.payload?.admin===null){
           // save user info
           state.user.isUser=true;
           state.user.userEmail=actions.payload?.user?.customerEmail
           state.user.userName=actions.payload?.user?.name
           localStorage.setItem('login', JSON.stringify(state));
           
        }

        if(actions.payload?.admin!==null && actions.payload?.user===null){

  
          // save admin info
          state.admin.isAdmin=true;
          state.admin.adminEmail=actions.payload?.admin?.username
          state.admin.adminName="Admin"
          state.admin.jwtToken=actions.payload?.admin?.jwtToken
          //jwtToken
          localStorage.setItem('login', JSON.stringify(state));
          
       }
      }, 
      
      addLogout: (state)=>{
      
        console.log("redux----1")
          state.user.isUser=false;
          state.user.userName= null;
          state.user.userEmail= null;
          console.log("redux----2")
          state.admin.jwtToken= null;
          state.admin.isAdmin= false;
          state.admin.adminName= null;
          state.admin.adminEmail= null;
          console.log("redux----3")
           // Clear localStorage on logout
           localStorage.setItem('login', JSON.stringify(state));
           console.log("redux----4")
      },
    },
  })

export const { addLogin, addLogout } = addLoginSlice.actions
export default addLoginSlice.reducer