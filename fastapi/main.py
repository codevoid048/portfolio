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
            # Check if connection is still active
            if websocket.client_state == WebSocketState.DISCONNECTED:
                break

            try:
                profile = collection.find_one({"name": username})
                if profile:
                    await websocket.send_json(clean_profile(profile))
                else:
                    await websocket.send_json({"error": "Profile not found"})
                
                await asyncio.sleep(5)

            except WebSocketDisconnect:
                break
                
            except Exception as e:
                print(f"Error during update for {username}: {str(e)}")
                await asyncio.sleep(5)  # Wait before retrying
                continue

    except Exception as e:
        print(f"WebSocket error for {username}: {str(e)}")

    finally:
        print(f"WebSocket disconnected for: {username}")
