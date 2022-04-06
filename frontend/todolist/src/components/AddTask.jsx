import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function AddTask(props) {

    const [theTask, setTheTask] = useState("")
    

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            task: theTask
        }
        axios.post('http://localhost:8000/tasks', body)
        .then((response)=>[
            props.triggerUpdate()
        ])
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div className="container container-fluid text-center" style={{fontSize: '1.5rem'}}>
        <form onSubmit={formSubmitHandler}>
            <div className="row">
                <input onChange={(e)=>{
                    setTheTask(e.target.value)
                }} placeholder='Add a New Task' style={{borderRadius: '30px'}} type="text" name="newTask" id="newTask" required/>
            </div>
            <div className="row text-center">
                <button style={{width: '180px', margin: '10px auto', borderRadius: '20px', boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px", backgroundColor: '#DFDFDE', }} type="submit">Add</button>
            </div>
        </form>
    </div>
  )
}
