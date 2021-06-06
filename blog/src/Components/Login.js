import React, { useState } from 'react';
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { login } from '../Action/auth';
import './All.css'



const Login = ({ login, detail,history }) => {
    const [formData, setFormData] = useState({
    });
    //const detail = useSelector(state=>state.reducer)
    //const {users} = detail

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(formData,history)
    }
    return (
        <div className='container mt-5' class="loginf">
            {detail ? <h3 id='use'>{detail}</h3> : <></>}
            <h1 style={{ color: 'black' }}>Sign In</h1>
            <p style={{ fontSize: '22px', color: 'blue' }}>Sign into your account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input className='form-control' id='lg ' type='username' placeholder='User Name'
                        name='username' value={formData.username} onChange={onChange} required />
                    <input className='form-control' id='lg' type='password' placeholder='Password'
                        name='password' value={formData.password} onChange={onChange} required />
                </div>
                <button type='submit' id='loginf'class='btn btn-primary' href="/allblogview">Login</button>
            </form>
            <p className='mt-3'>
                Don't have an account?<Link to='/signup'>Sign Up</Link>
            </p>
        </div>
    );

}
const mapStateToProps = state => ({
    detail: state.Reducer.users
});
export default connect(mapStateToProps, { login })(Login)