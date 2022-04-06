import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function TaskInstance(props) {
    let data = props.data

    const [isEditting, setIsEditting] = useState(false)
    const [theTask, setTheTask] = useState(data.task)

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/task/${data.id}`)
        .then((response)=>{
            props.triggerUpdate();
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/task/${data.id}`, {task: theTask})
        .then((response)=>{
            props.triggerUpdate();
            setIsEditting(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='col-12 col-lg-12 col-md-12 col-sm-12' style={{margin: '28px auto'}}>
        <div className="container container-fluid" style={{boxShadow: "#D6337C 0px 4px 6px, #D6337C 0px 8px 24px, #D6337C 0px 6px 40px", padding: '10px auto', borderRadius: '20px'}}>
            <div className="row" style={{paddingTop: '5px'}}>
                <div className="col-lg-10 col-md-10 col-sm-12">
                    {!isEditting ? <p style={{textAlign: 'left', padding: '10px auto'}}>{data.task}</p> : 
                    <form className="text-start" onSubmit={formSubmitHandler}>
                        <input style={{borderRadius: '20px', fontSize: '1.6rem', marginBottom: '10px'}} type="text" name="updateTask" defaultValue={theTask} id="updateTask" onChange={(e)=>setTheTask(e.target.value)} />
                        <button style={{borderRadius: '20px', fontSize: '1.6rem'}} type="submit">Update</button>
                    </form>}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                    <i onClick={()=>setIsEditting(!isEditting)} style={{margin: '10px 20px', cursor: 'pointer', padding: '10px auto'}} class="fas fa-edit"></i>
                    <i onClick={deleteHandler} style={{margin: '10px 20px', cursor: 'pointer', padding: '10px auto'}} class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        </div>
    </div>
  )
}
