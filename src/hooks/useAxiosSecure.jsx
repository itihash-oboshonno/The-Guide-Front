import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/authContext/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosSecure =  axios.create({
    baseURL: 'https://theguidebb.vercel.app',
    withCredentials: true,
})

const useAxiosSecure = () => {

    const {userLogout} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.log('Caught', error.response)
                if (error.response.status === 401 || error.response.status === 403) {
                    userLogout();
                    navigate('/login')
                }
            }
        )
    }, [userLogout, navigate])
    return axiosSecure
}

export default useAxiosSecure