import {CreateBasket} from "../http/basketAPI";
import OpenMessage from "./openMessage";

export default function AddBasket(size, price, id, name, deviceType, user, item, setItem, setBasketModalSize, img) {
    let sizeMapBool = false
    size.map(i => i.value === '' || i.value === 'def' || i.quantity === '' || i.quantity[0] === 0).filter(i => i === true ? sizeMapBool = true : '')
    const hasDuplicates = (arr) => arr.length !== new Set(arr).size; // поиск дубликатов

        if(user._isAuth === false) {
            OpenMessage('Требуется авторизация', '#FF033E')
            setBasketModalSize(false)
        }
        else if (sizeMapBool || size.length === 0) {
            OpenMessage('Вы не выбрали размеры', '#FF033E')
        }
        else if (hasDuplicates(size.map(i => i.value))) {
            OpenMessage('Невозможно выбрать одинаковые размеры', '#FF033E')
        }
        else {
            CreateBasket({quantity: size, price: price, basketId: `${user.userID}`, deviceId: id, deviceName: name, deviceType: deviceType, img: img}).then(data => {
                setItem(item + 1)
                OpenMessage('Добавлено в корзину', '#98FB98')
            })
            setBasketModalSize(false)
        }
    }