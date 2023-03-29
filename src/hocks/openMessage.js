import React from "react";

export default function OpenMessage(message, color) {
    let mess = document.getElementById('messages')
    let mess_text = document.getElementById('messages_text')

        mess.style.opacity = '1'
        mess.style.visibility = 'visible'
        mess.style.transform = 'translateY(0)'
        mess.style.background = color
        mess_text.innerText = message
}