import {$autoHost, $host} from "./index";


export const fetchBasket = async (userID) => {
    const {data} = await $host.get('api/basket/' + userID)
    return data
}

export const CreateBasket = async ({quantity, price, basketId, deviceId, deviceName, deviceType, img}) => {
    const {data} = await $host.post('api/basket', {quantity, price, basketId, deviceId, deviceName, deviceType, img})
    return data
}

export const fetchOneBasketDevices = async (id) => {
    const {data} = await $host.get('api/basket/one/' + id, id)
    return data
}



export const DestroyBasket = async ({id, basketId}) => {
    const {data} = await $host.post('api/basket/destroy', {id, basketId})
    return data
}

export const UpdateBasket = async ({id, basketId, status}) => {
    const {data} = await $autoHost.post('api/basket/update/' + id, {basketId, status})
    return data
}




