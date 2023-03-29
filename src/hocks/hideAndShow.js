

export default function HideAndShows(show, setShow) {
    if (show >= 1) {
        setShow(0)
    } else {
        setShow(show + 1)
    }
}