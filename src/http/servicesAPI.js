import {$autoHost, $host} from "./index";

export const createNews = async (news) => {
    const {data} = await $autoHost.post('api/news', news)
    return data
}
export const fetchNews = async (page, limit) => {
    const {data} = await $host.get('api/news', {params: {page, limit
        }})
    return data
}
export const fetchOneNews = async (id) => {
    const {data} = await $host.get('api/news/' + id)
    return data
}
export const editOneNews = async ({id, title, description}) => {
    const {data} = await $autoHost.post('api/news/editor/' + id,{title, description})
    return data
}
export const deleteOneNews = async (id) => {
    const {data} = await $autoHost.post('api/news/' + id, id)
    return data
}


export const createServices = async (services) => {
    const {data} = await $autoHost.post('api/services', services)
    return data
}
export const fetchServices = async (page, limit) => {
    const {data} = await $host.get('api/services', {params: {page, limit
        }})
    return data
}
export const fetchOneServices = async (id) => {
    const {data} = await $host.get('api/services/' + id)
    return data
}
export const editOneServices = async ({id, title, description}) => {
    const {data} = await $autoHost.post('api/services/editor/' + id,{title, description})
    return data
}
export const deleteOneServices = async (id) => {
    const {data} = await $autoHost.post('api/services/' + id, id)
    return data
}