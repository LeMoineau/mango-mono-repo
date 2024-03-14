import { MutableRefObject, useEffect, useRef } from 'react'

function useChapterReaderEvents(div: MutableRefObject<HTMLDivElement | null>) {
    const isMouseDown = useRef<boolean>(false)

    useEffect(() => {
        const element = div.current

        if (element !== null) {
            console.log(element)
            element.addEventListener('scroll', _onReaderMouseDown)
            element.addEventListener('mouseup', _onReaderMouseUp)
        }
        return () => {
            if (element !== null) {
                element.removeEventListener('scroll', _onReaderMouseDown)
                element.removeEventListener('mouseup', _onReaderMouseUp)
            }
        }
    }, [div])

    const _onReaderMouseDown = () => {
        isMouseDown.current = true
        console.log('mouse down!')
    }

    const _onReaderMouseUp = () => {
        isMouseDown.current = false
        console.log('mouse up!')
    }

    return {}
}

export default useChapterReaderEvents
