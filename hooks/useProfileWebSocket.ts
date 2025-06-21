import { useEffect, useState } from "react";

export const useProfileWebSocket = (username: string) => {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        if (!username) return;
        const socket = new WebSocket(`wss://p01--portfolio-fastapi--qcpsyyc7mxwb.code.run/ws/profile/${username}`);
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

        return () => { socket.close(1000, "Component unmounted"); };
    }, [username]);

    return profile;
};