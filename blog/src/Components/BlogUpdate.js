import React, {useEffect, useState} from 'react';
import {connect, useSelector } from 'react-redux'
import {update} from '../Action/auth';

const BlogUpdate = ({update,match})=>{
    const blogd = useSelector(state=>(state.Reducer))
    const {isAuthenticated,Blogdata} = blogd
   const [bdata, setBdata] = useState({
       user:isAuthenticated.id
   })
    const {id}=match.params
    useEffect(()=>{
        const ids = Blogdata.find(item=>item.id==id)
        setBdata(ids)

    },[])
    
    const handlechange = (e) =>{setBdata({...bdata, [e.target.name]:e.target.value})}

    const onSubmit = e =>{
        e.preventDefault();
        const index = Blogdata.findIndex(item=>item.id==id)
        update(index,id,isAuthenticated,bdata)
    }
    return(
        <div className='container mt-5'>
             <h1>Create Your Blog</h1>
            <form onSubmit={e=> onSubmit(e)} >
            <div className='form-group'>
                    BlogTitle:
                    <input
                    type='text'
                    placeholder='BlogTitle'
                    name='title'
                    value={bdata.title}
                    onChange={handlechange}
                    required
                    />
                </div>
                <div >
                    BlogContent:
                    <div class="form-outline">
                    <textarea 
                    id="textAreaExample" 
                    rows="4"
                    type='text'
                    name="content"
                    value={bdata.content}
                    placeholder='write your blog content here.......'
                    onChange={handlechange}
                    required
                    />
                    </div>
                </div>
                <button className='btn btn-primary' type='submit' >updateblog</button>
            </form>
        </div>
    );
    
}
// const mapStateToProps = state =>({
//     detail: state.Reducer.users
// });
export default connect(null,{update})(BlogUpdate)