import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route, Navigate, Outlet } from 'react-router-dom'

import AuthContext from '../contexts/AuthContext'
// import ProjectContext from '../contexts/ProjectContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    // const { projectCode } = useParams()
    const { checkToken } = useContext(AuthContext)
    // const { project } = useContext(ProjectContext)
    const { user } = checkToken()
    // console.log('in Private', user, project)
    if (!user) {
        // removeToken()
        return (<Navigate to="/login" />)
    }
    // return (
    //     <Navigate
    //         {...rest}
    //         render={(props) => (<Component {...props} />)}
    //     />
    // )
    return (<Outlet />)
}
PrivateRoute.propTypes = {
    component: PropTypes.func,
}
PrivateRoute.defaultProps = {
    component: null,
}

export default PrivateRoute
