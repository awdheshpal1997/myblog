import {LOGINPAGE, LOGIN_FAIL,SIGNUP_SUCCESS, SIGNUP_FAIL,BLOGCREATED,LOGOUT, BLOG_ALL_VIEW, BLOG_VIEW, BLOG_UPDATE, BLOG_DELETE, BLOG_LOAD_SUCCESS} from '../Action/type'

const intialState = {
    access:localStorage.getItem("access"),
    refresh:localStorage.getItem("refresh"),
    isAuthenticated:{},
    Blogdata:[],
    user:false,
    allblogs:[],
    users:null
}
function Reducer (state=intialState,action){
    const {type,payload}=action;
    switch(type){
        case LOGINPAGE:
            localStorage.setItem('access',payload.access)
            return {...state,refresh:payload.refresh,access:payload.access,isAuthenticated:payload,user:true,}
        case LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                users:payload,
                user:false
            } 
        case SIGNUP_SUCCESS:
            return{...state,isAuthenticated:false}  
        case SIGNUP_FAIL:
            return{...state} 
        case BLOGCREATED:
            return{
                ...state,
                Blogdata:[...state.Blogdata,payload]
            }            
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access:false,
                refresh:false,
                isAuthenticated:{},
                user:false,
                users:null,
                allblogs:[], 
                Blogdata:[]
            }  
        case BLOG_ALL_VIEW:
            return{
                ...state,
                allblogs:payload,
                access:payload.access,
                refresh:payload.refresh  
            } 
        case BLOG_VIEW:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                Blogdata:payload,
                access:payload.access,
                refresh:payload.refresh 
            } 
        case BLOG_UPDATE:
            return{
                ...state,
                Blogdata:[...state.Blogdata.slice(0,payload.index),payload.response,...state.Blogdata.slice(payload.index+1)]
            } 
        case BLOG_DELETE:
            return{
                ...state,
                Blogdata:[...state.Blogdata.slice(0,payload), ...state.Blogdata.payload.slice(payload+1) ]

            }                
        default:
            return state
    }

}
export default Reducer