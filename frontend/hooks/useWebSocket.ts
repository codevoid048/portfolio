import { useEffect, useState } from "react";

export const useProfileWebSocket = (username: string) => {
    const [profile, setProfile] = useState(null);
    //const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        if (!username) return;
        const socket = new WebSocket(`wss://p01--portfolio-fastapi--qcpsyyc7mxwb.code.run/ws/profile/${username}`);

        // socket.onopen = () => {
        //     console.log("WebSocket connected");
        // };

        // const handleReconnect = () => {
        //     if (retryCount < 3) {
        //         setTimeout(() => setRetryCount(c => c + 1), 2000);
        //     }
        // };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setProfile(data);
            } catch (e) {
                console.error("Invalid JSON", e);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // socket.onclose = () => {
        //     console.log("WebSocket disconnected");
        //     handleReconnect();
        // };

        return () => { socket.close(1000, "Component unmounted"); };
    }, [username]);

    return profile;
};
