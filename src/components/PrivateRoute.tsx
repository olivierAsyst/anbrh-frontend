import type { JSX } from "react"
import { useAppSelector } from "../hooks"

import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children}: {children: JSX.Element}) => {
    const accessToken = useAppSelector(state => state.auth.accessToken)

    if (!accessToken) {
        return <Navigate to="/login" />
    }

    return children
}

export default PrivateRoute