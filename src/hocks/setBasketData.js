import OpenMessage from "./openMessage";

export default function SetBasketData(device, id, setOneDevice, setBasketModalSize, basket) {
    const basketLength = basket.baskets.filter(basket => basket.deviceId === id)
    if(basketLength.length !== 0) {
        OpenMessage('Товар уже в корзине', '#FF033E')
        return
    }
    if (device.length === 1 || device.length === 0) {
        setOneDevice(JSON.parse(JSON.stringify(device)))
        setBasketModalSize(true)
    }
    else {
        setOneDevice(JSON.parse(JSON.stringify(device.filter(device => device.id === id))))
        setBasketModalSize(true)
    }
}

