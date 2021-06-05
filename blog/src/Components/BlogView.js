import React from 'react'
import {allblog} from '../Action/auth'
import {connect, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card} from 'antd'

const BlogView = ({allblog}) =>{
    const allview = useSelector(state=>state.Reducer)
    const {isAuthenticated,allblogs} =allview
    const onSubmit=(e)=>{
        allblog(isAuthenticated)
    }
    return(
        <div id='bl'>
             <Link onClick={onSubmit} >Allblogs</Link>
             {allblogs.map(item => <Card 
                headStyle={{backgroundColor: '#f1efef', border: 50,algin:"center" }}
                    hoverable
                    style={{ width: 300 }} title={item.title}  >
                        {item.content}
                </Card>)}
        </div>
    )

}
 

export default connect(null, {allblog})(BlogView)