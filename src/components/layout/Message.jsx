import { useEffect, useState } from 'react'
import styles from './Message.module.css'

export default function Message( { type, msg } ) {
    const [visible, setViseble] = useState(false)

    useEffect(() => {
        if(!msg) {
            setViseble(false)
            return
        }

        setViseble(true)

        const timer = setTimeout(() => {
            setViseble(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )}
        </>
    )
}