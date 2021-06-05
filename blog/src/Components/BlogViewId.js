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
             {Blogdata.map(item => <Card 

                 title={item.title}  >
                        {item.content}
                    <hr></hr><a onClick={()=>handleUpdate(item.id)}>Update</a><hr></hr>
                    <a onClick={()=>handledelete(item.id)}>Delete</a>    
                </Card>)}
        </div>
    )

}
export default connect(null, {blogid,blogd})(BlogViewId)