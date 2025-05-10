from fastapi import FastAPI, WebSocket
from pymongo import MongoClient
import asyncio
import os
from bson import ObjectId
import datetime

app = FastAPI()

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["portfolio"]
collection = db["users"]

def clean_profile(profile):
    if "_id" in profile:
        del profile["_id"]
    if "lastUpdated" in profile:
        del profile["lastUpdated"]
    if "__v" in profile:
        del profile["__v"]
    return profile

@app.websocket("/ws/profile/{username}")
async def profile_socket(websocket: WebSocket, username: str):
    await websocket.accept()
    print(f"🔌 WebSocket connected for user: {username}")

    try:
        while True:
            profile = collection.find_one({"name": username})

            if profile:
                cleaned = clean_profile(profile)
                await websocket.send_json(cleaned)
            else:
                await websocket.send_json({"error": f"No profile for {username}"})

            await asyncio.sleep(5)

    except Exception as e:
        print(f"❌ WebSocket Exception: {e}")

    finally:
        await websocket.close()