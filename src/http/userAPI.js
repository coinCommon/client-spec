import {$autoHost, $host} from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async (email, password, name) => {
    const {data} = await $host.post('api/user/registration', {email, password, name, role: 'USER', })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $autoHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}




export const checkRole = async () => {
    const {data} = await $autoHost.get('api/user/role/')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}



export const create = async (email, password, role, name) => {
    const {data} = await $host.post('api/user/registration', {email, password, role, name})
    return jwt_decode(data.token)
}

export const fetchUser = async () => {
    const {data} = await $host.get('api/user')
    return data
}

export const deleteOneUser = async (id) => {
    const {data} = await $autoHost.post('api/user/' + id, id)
    return data
}










