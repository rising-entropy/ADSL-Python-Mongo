from typing import Optional
from bson.objectid import ObjectId
from fastapi import FastAPI
from pydantic import BaseModel
from getDatabase import get_database

app = FastAPI()

theDB = get_database()

class Task(BaseModel):
    task: str

@app.get("/")
def read_root():
    return {
        "message": "Let's Begin!"
    }

@app.post("/tasks")
def addATask(task: Task):
    newTask = task.task
    newTaskDict = {
        "task": newTask
    }
    collection_name = theDB['task']
    collection_name.insert_one(newTaskDict)
    return {
        "message": "Task Added Successfully!"
    }

@app.get("/tasks")
def getAllTasks():
    collection_name = theDB['task']
    allTasks = collection_name.find()
    theTasks = []
    for task in allTasks:
        theTasks.append({
            "task": task['task'],
            "id": str(task['_id'])
        })
    return theTasks 

@app.get("/task/{id}")
def getATask(id: str):
    collection_name = theDB['task']
    allTasks = collection_name.find({"_id": ObjectId(id)})
    theTasks = []
    for task in allTasks:
        theTasks.append({
            "task": task['task'],
            "id": str(task['_id'])
        })
    if len(theTasks) == 0:
        return {
            "message": "Invalid ID"
        }
    return theTasks[0]

@app.put("/task/{id}")
def updateATask(id: str, task: Task):
    collection_name = theDB['task']
    newTask = task.task
    collection_name.update_one({"_id": ObjectId(id)}, {"$set": {"task": newTask}})
    return {
        "message": "Updated Successfully!"
    }

@app.delete("/task/{id}")
def deleteATask(id: str):
    collection_name = theDB['task']
    collection_name.delete_one({"_id": ObjectId(id)})
    return {
        "message": "Deleted Successfully!"
    }