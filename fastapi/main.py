from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pymongo import MongoClient
import asyncio
import os
from starlette.websockets import WebSocketState

app = FastAPI()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["portfolio"]
collection = db["users"]

def clean_profile(profile):
    profile.pop("_id", None)
    profile.pop("lastUpdated", None)
    profile.pop("__v", None)
    return profile

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.websocket("/ws/profile/{username}")
async def profile_socket(websocket: WebSocket, username: str):
    await websocket.accept()
    print(f"WebSocket connected for: {username}")

    try:
        while True:
            # Check connection state
            if websocket.client_state != WebSocketState.CONNECTED:
                break

            profile = collection.find_one({"name": username})
            if profile:
                await websocket.send_json(clean_profile(profile))
            else:
                await websocket.send_json({"error": "Profile not found"})

            await asyncio.sleep(5)

    except WebSocketDisconnect:
        print(f"WebSocket disconnected for: {username}")

    except Exception as e:
        print(f"WebSocket error for {username}: {str(e)}")

    finally:
        if websocket.client_state == WebSocketState.CONNECTED:
            await websocket.close()
        print(f"WebSocket disconnected finally for: {username}")
