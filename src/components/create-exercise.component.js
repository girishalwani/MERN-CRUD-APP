import React,{useState,useEffect} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

const CreateExercise = (props)=>{

    const [username,setUsername] = useState("")
    const [description,setDescription] = useState("")
    const [duration,setDuration] = useState(0)
    const [date,setDate] = useState(new Date())
    const [user,setUser] = useState([])


    useEffect(()=>{

        axios.get("http://localhost:5000/users/")
            .then(response=>{
                if(response.data.length>0){
                    setUser(response.data.map(user=>user.username))
                    setUsername(response.data[0].username)
                }

            })

        //setUser(['test user',"test user 2"])

        //console.log([user])
        
    },[])
    





    const onChangeUsername = (event) =>{
        setUsername(event.target.value)
    }

    const onDescriptionChange=(event)=>{
        setDescription(event.target.value)
    }

    const onDurationChange=(event)=>{
        setDuration(event.target.value)
    }

    const onChangeDate=(event)=>{
        setDate(date)
    }

    const onSubmit=(event)=>{
        event.preventDefault()

        const exercise = {
            username,description,duration,date
        }
        console.log(exercise)
        axios.post("http://localhost:5000/exercise/add",exercise)
            .then(res=>console.log(res.data))

        
        window.location='/'
        

    }

    return(
        <div>
            <h3>Create new exercise</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                        >
                            {
                                user.map((user,i)=>{
                                    return <option
                                    key={i}
                                    value={user}>
                                        {user}
                                    </option>
                                })
                            }

                    </select>

                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={description}
                            onChange={onDescriptionChange}
                            />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={duration}
                            onChange={onDurationChange}
                            />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                            />
                        </div>
                    </div>

                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>

            </form>
        </div>
    )

}
export default CreateExercise