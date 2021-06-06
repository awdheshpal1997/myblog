import React, {useState} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {signin} from '../Action/auth';



const Signup = ({signin})=>{
    const [formData, setFormData]= useState({
    });
    //const detail = useSelector(state=>state.reducer)
    //const {users} = detail
    
    const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        signin(formData)
    }
    return(
        <div className='container mt-5' id='signup'>
            <h1>Sign Up</h1>
            <p>Sign up into your new account</p>
            <form onSubmit={e =>onSubmit(e)}>
                <div className='form-group'>
                    <input className='form-control' type='first_name' placeholder='First Name'  
                    name='first_name' value={formData.first_name} onChange={onChange}required/>
                    <input className='form-control' type='last_name' placeholder='Last Name' 
                    name='last_name' value={formData.last_name} onChange={onChange}required/>
                    <input className='form-control' type='username' placeholder='User Name' 
                    name='username' value={formData.username} onChange={onChange}required/>
                    <input className='form-control' type='email' placeholder='Email' 
                    name='email' value={formData.email} onChange={onChange}required/>
                    <input className='form-control' type='password' placeholder='Password' 
                    name='password' value={formData.password} onChange={onChange}required/>
                </div>
                <button type='submit'class='btn btn-primary'>Sign Up</button>
            </form>
            
            <p className='mt-3'>
                Don't have an account?<Link to='/signup'>Sign Up</Link>
            </p>
        </div>
    );
    
}
// const mapStateToProps = state =>({
//     detail: state.Reducer.users
// });
export default connect(null,{signin})(Signup)