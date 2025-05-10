from fastapi import FastAPI, WebSocket
import asyncio
import random

app = FastAPI()

# Mock profile data
profile_template = {
    "name": "JohnDoe",
    "codeforces": {"rank": 10000, "rating": 1300, "problemsSolved": 450},
    "leetcode": {"rank": 10000, "rating": 1700, "problemsSolved": 520},
    "gfg": {"rank": 10000, "rating": 1800, "problemsSolved": 320},
    "codechef": {"rank": 10000, "rating": 1600, "stars": "3* star"}
}

@app.websocket("/ws/profile")
async def profile_socket(websocket: WebSocket):
    await websocket.accept()
    while True:
        # Simulate dynamic rating updates
        profile_template["codeforces"]["rating"] += random.randint(-5, 5)
        profile_template["leetcode"]["problemsSolved"] += random.randint(0, 2)

        await websocket.send_json(profile_template)
        await asyncio.sleep(5)  # Send updates every 5 seconds
