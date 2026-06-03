import { useState, useEffect } from "react"

export function OfflineBanner() {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)

    useEffect(() => {
        function handleOnline() {
            setIsOnline(true)
        }
        function handleOffline() {
            setIsOnline(false)
        }

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)    
        }

    }, [])

    if (isOnline) {
        return null
    }

    return (
        <>
            <div id="offline_banner">
                <p> Warning: This page is currently offline, some internet features may not be available at the moment.</p>
            </div>
        </>
    )
}