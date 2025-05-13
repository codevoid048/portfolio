from fastapi import FastAPI, WebSocket
from pymongo import MongoClient
import asyncio
import os
from bson import ObjectId
import datetime
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
    print(f"🔌 WebSocket connected for user: {username}")

    try:
        while True:
            if websocket.client_state == WebSocketState.DISCONNECTED:
                break

            profile = collection.find_one({"name": username})
            if profile:
                cleaned = clean_profile(profile)
                await websocket.send_json(cleaned)
            else:
                await websocket.send_json({"error": f"No profile for {username}"})
            await asyncio.sleep(5)

    except Exception as e:
        print(f"❌ WebSocket Exception: {e}")
        if websocket.client_state != WebSocketState.DISCONNECTED:
            await websocket.close(code=1001)

    finally:
        print(f"🔌 WebSocket disconnected for user: {username}")