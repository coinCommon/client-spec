import {$autoHost, $host} from "./index";


export const sendEmail = async (text) => {
    const {data} = await $autoHost.post('api/email', text)
    return data
}





