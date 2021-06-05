import React, {useState} from 'react';
import {connect, useSelector } from 'react-redux'
import {blog} from '../Action/auth';
import './All.css'

const BlogCreate = ({blog})=>{
    const xyz = useSelector(state=>(state.Reducer))
    const {isAuthenticated} = xyz
    const [blogdata, setBlogData]= useState({
        user: isAuthenticated.id
    });
    
    const onChange = e =>setBlogData({...blogdata, [e.target.name]:e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        blog(blogdata)
    }
    return(
        <div className='container mt-5' id='create'>
            <h1>Create your blog</h1>
            <form onSubmit={e =>onSubmit(e)}>
                <div className='form-group'>
                    <input className='form-control' id='log' type='text' placeholder='Title Name' 
                    name='title' value={blogdata.title} onChange={onChange}required/>
                    <input className='form-control' id='log' type='text' placeholder='Content' 
                    name='content' value={blogdata.content} onChange={onChange}required/>
                </div>
                <button id="form" className='btn btn-primary' type='submit'>Create Blog</button>
            </form>
        </div>
    );
    
}
// const mapStateToProps = state =>({
//     detail: state.Reducer.users
// });
export default connect(null,{blog})(BlogCreate)