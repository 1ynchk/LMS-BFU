
import { createContext, useState, useEffect, useContext } from "react"

import axios from 'axios'
import { host } from './../../store/root';

export const CSRFContext = createContext()

export const CSRFProvider = ({ children }) => {
    const [csrftoken, setCSRFToken] = useState('')

    console.log(csrftoken)

    useEffect(() => {
        axios.get(`${host}/api_users/csrf/`, { withCredentials: true })
            .then(response => setCSRFToken(response.data.csrftoken))
    }, [])

    return (
        <CSRFContext.Provider value={{ csrftoken }}>
            {children}
        </CSRFContext.Provider>
    )
}

export const useCSRF = () => useContext(CSRFContext)