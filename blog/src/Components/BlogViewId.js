import React from 'react'
import {blogid,blogd} from '../Action/auth'
import {connect, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card} from 'antd'

const BlogViewId = ({blogid,history,blogd}) =>{
    const userview = useSelector(state=>state.Reducer)
    const {isAuthenticated,Blogdata} =userview
    const handledelete = (id) =>{
        const index = Blogdata.findIndex(item=>item.id==id)
        blogd(index,id,isAuthenticated)
    }
    const handleUpdate = (id) =>{
        history.push(`/blogupdate/${id}`)
    }
    const onSubmit=(e)=>{
        blogid(isAuthenticated)
    }
    return(
        <div id='bl'>
            <Link onClick={onSubmit} >Myblogs</Link>
             {Blogdata.map(item => <Card id='bl1'

                 title={item.title}  >
                        {item.content}
                    <br></br><a id='update'class='btn btn-primary' onClick={()=>handleUpdate(item.id)}>Update</a>
                    <a id='delete' class='btn btn-primary' onClick={()=>handledelete(item.id)}>Delete</a>    
                </Card>)}
        </div>
    )

}
export default connect(null, {blogid,blogd})(BlogViewId)