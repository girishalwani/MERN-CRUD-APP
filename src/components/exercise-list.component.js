import React,{useState,useEffect} from 'react'

import axios from 'axios'
import Exercise from './Exercise'

const ExerciseList = (props)=>{
    const[exercise,setExercise] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000/exercise/")
            .then(response=>{
                setExercise(response.data)
            })
            .catch((error)=> {console.log(error)})
    },[])

    const deleteExecise=(id)=>{
        axios.delete(`http://localhost:5000/exercise/${id}`)
            .then(res=>{console.log(res.data)})
        
        setExercise(exercise.filter(element=>element._id!==id))

    }

    // const excList=()=>{
    //         exercise.map(current=>{
    //             return <Exercise exercise={current} delete={deleteExecise} key={current._id} 
    //             />
    //         })
        
    // }


    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    exercise.map(current=>{
                return <Exercise exercise={current} delete={deleteExecise} key={current._id} 
                />
            })}
                </tbody>
            </table>
        </div>
    )

}
export default ExerciseList