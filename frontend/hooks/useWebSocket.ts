import { useEffect, useState } from "react";

export const useProfileWebSocket = (username: string) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!username) return;

        //const socket = new WebSocket(`ws://localhost:8000/ws/profile/${username}`);
        const protocol = process.env.NODE_ENV === "production" ? "wss" : "ws";
        const host = process.env.NEXT_PUBLIC_WS_HOST || "localhost:8000";
        const socket = new WebSocket(`${protocol}://${host}/ws/profile/${username}`);

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
        };

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

        socket.onclose = () => {
            console.log("❌ WebSocket disconnected");
        };

        return () => socket.close();
    }, [username]);

    return profile;
};
