import {$autoHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $autoHost.post('api/type', type)
    return data
}
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
export const deleteOneTypes = async (id) => {
    const {data} = await $autoHost.post('api/type/' + id, id)
    return data
}



export const createBrand = async (brand) => {
    const {data} = await $autoHost.post('api/brand', brand)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}
export const deleteOneBrands = async (id) => {
    const {data} = await $autoHost.post('api/brand/' + id, id)
    return data
}



export const createDevices = async (device) => {
    const {data} = await $autoHost.post('api/device', device)
    return data
}
export const fetchDevices = async (typeId, brandId, page, limit) => {
    const {data} = await $host.get('api/device', {params: {typeId, brandId, page, limit
    }})
    return data
}
export const fetchDevicesCatalog = async (typeId, brandId, limit, page) => {
    const {data} = await $host.get('api/device/catalog/' + typeId + '/' + brandId, {params: {limit, page}})
    return data
}


export const fetchOneDevices = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
export const deleteOneDevices = async (id) => {
    const {data} = await $autoHost.post('api/device/' + id, id)
    return data
}
export const editOneDevices = async ({id, name, rating, price, description, info, typeSize}) => {
    const {data} = await $autoHost.post('api/device/edit/' + id,{name, rating, price, description, info, typeSize})
    return data
}







export const createDevicesRecommend = async (deviceId, name, price, rating, img) => {
    const {data} = await $autoHost.post('api/device/recommend/' + deviceId, {deviceId, name, price, rating, img})
    return data
}
export const fetchDevicesRecommended = async (deviceId) => {
    const {data} = await $host.get('api/device/recommend/' + deviceId, {params: {deviceId}})
    return data
}
export const deleteOneDevicesRecommend = async (deviceId) => {
    const {data} = await $autoHost.post('api/device/recommended/' + deviceId, {params: {deviceId}})
    return data
}





export const createSlider = async (slider) => {
    const {data} = await $autoHost.post('api/device/post/slider', slider)
    return data
}
export const fetchSlider = async () => {
    const {data} = await $host.get('api/device/get/slider')
    return data
}
export const fetchOneSlider = async (id) => {
    const {data} = await $autoHost.post('api/device/slider/fetchOne/' + id)
    return data
}
export const editOneSlider= async ({id, title, href}) => {
    const {data} = await $autoHost.post('api/device/slider/edit/' + id,{title, href})
    return data
}
export const deleteOneSlider = async (id) => {
    const {data} = await $autoHost.post('api/device/slider/' + id, {params: {id}})
    return data
}





export const createPopularCat = async (slider) => {
    const {data} = await $autoHost.post('api/device/post/popular', slider)
    return data
}
export const fetchPopularCat = async () => {
    const {data} = await $host.get('api/device/get/popular')
    return data
}
export const fetchOnePopular = async (id) => {
    const {data} = await $autoHost.post('api/device/popular/fetchOne/' + id)
    return data
}
export const editOnePopular = async ({id, name}) => {
    const {data} = await $autoHost.post('api/device/popular/edit/' + id,{name})
    return data
}
export const deleteOnePopular = async (id) => {
    const {data} = await $autoHost.post('api/device/popular/' + id, {params: {id}})
    return data
}




