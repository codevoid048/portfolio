import { useEffect, useState } from "react";

export const useProfileWebSocket = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/profile");

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setProfile(data);
        };
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("❌ WebSocket disconnected");
        };

        return () => socket.close();
    }, []);

    return profile;
};
