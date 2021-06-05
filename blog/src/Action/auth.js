import axios from 'axios'
import {
    LOGINPAGE,
    LOGIN_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    BLOGCREATED,
    BLOG_ALL_VIEW,
    BLOG_VIEW,
    BLOG_UPDATE,
    BLOG_DELETE

} from './type'

export const login = (logindata,history) => async dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    try {
        const response = await axios.post('http://127.0.0.1:8000/myproject/login/', logindata, config)
        dispatch({
            type: LOGINPAGE,
            payload: response.data
        })
        history.push('/blogview')
        localStorage.setItem('detail',JSON.stringify(response.data))
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.detail

        })
    }
}


export const signin = (signindata) => async dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    try {
        const response = await axios.post('http://127.0.0.1:8000/myproject/registration/', signindata, config)
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data
        })
    }
    catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data.detail

        })
    }
}
export const blog = (blogdata) => async dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await axios.post('http://127.0.0.1:8000/myproject/blog/', blogdata, config)
    dispatch({
        type: BLOGCREATED,
        payload: response.data
    })
}
export const logout = (history) => async dispatch => {
    localStorage.clear()
    dispatch({
        type: LOGOUT
    })
    history.push('/home')
}

export const allblog = (isAuthenticated) => async dispatch => {

    const config = {
        headers: {
            'Authorization':`Bearer ${isAuthenticated.token}`,
            "Content-type": "application/json"
        }
    }
      const response = await axios.get('http://127.0.0.1:8000/myproject/all_view/', config)
      dispatch({
        type: BLOG_ALL_VIEW,
        payload: response.data
        })
}
export const blogid = (isAuthenticated) => async dispatch => {
    const config = {
        headers: {
            'Authorization':`Bearer ${isAuthenticated.token}`,
            "Content-type": "application/json"
        }
    }
      const response = await axios.get('http://127.0.0.1:8000/myproject/user_view/', config)
      dispatch({
        type: BLOG_VIEW,
        payload: response.data
        })
}

export const update = (index,id,isAuthenticated,blogu) => async dispatch =>{
    const config = {
        headers: {
            'Authorization':`Bearer ${isAuthenticated.token}`,
            "Content-type": "application/json"
        }
    }
    const response = await axios.put(`http://127.0.0.1:8000/myproject/blog_update/${id}`,blogu,config).then(response=>response.data)
    dispatch({
        type: BLOG_UPDATE,
        payload:{index,response}
    })
}
export const blogd = (index,id,isAuthenticated) => async dispatch =>{
    const config = {
        headers: {
            'Authorization':`Bearer ${isAuthenticated.token}`,
            "Content-type": "application/json"
        }
    }
    await axios.delete(`http://127.0.0.1:8000/myproject/blog_update/${id}`,config)
    dispatch({
        type: BLOG_DELETE,
        payload:{index}
    })
}

