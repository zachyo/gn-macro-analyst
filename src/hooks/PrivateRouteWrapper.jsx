import { ReactElement, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context'

const PrivateRouteWrapper = ({ component }) => {
    const { loggedIn } = useAuthContext()

    return loggedIn ? <>{component}</> : <Navigate to='/' replace />
}

export default PrivateRouteWrapper
