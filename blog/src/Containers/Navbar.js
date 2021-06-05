import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { logout } from '../Action/auth'
import '../Components/All.css'


const Navbar = ({ user, logout, isAuthenticated, history }) => {
    const [redirect, setRedirect] = useState(false)
    const logoutuser = () => {
        logout(history)
        setRedirect(true)
    }
    const allLink = () => (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link >
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Registration</Link >
            </li>
        </Fragment>
    )
    const logininside = () => (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link active" onClick={() => logoutuser()}  >Log Out</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/blogcreate">Blog Create</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/blogview'>MyBlogs</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/allblogview">Blog view</Link >
            </li>

        </Fragment>
    )
    return (
        <Fragment>
            <nav className='navbar navbar-expand-lg navbar-light bg-light' clsass="mainbackg">

                <button

                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>

                </button>

                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/home'>Home <span className='sr-only'></span></Link>
                        </li>
                        {user ? logininside() : allLink()}
                    </ul>
                </div>
            </nav>
            {redirect ? <Redirect to='/home' /> : <Fragment></Fragment>}
        </Fragment>

    );
};
const mapStateToProps = state => ({

    user: state.Reducer.user,
    isAuthenticated: state.Reducer.isAuthenticated
});
export default connect(mapStateToProps, { logout })(withRouter(Navbar));