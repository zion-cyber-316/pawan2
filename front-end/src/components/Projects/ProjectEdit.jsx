import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const ProjectEdit = () => {
    const {id} = useParams();
    const [Project,setProject] = useState([])
    const Navigate = useNavigate()
const {serverLink} = useAuth()
    useEffect(()=>{
const fetchData = async()=>{
  try{
    const response = await axios.get(`${serverLink}/api/project/get/${id}`)
    console.log(response)
  
  if(response.data.success){
setProject(response.data.editProject)
  }
  }catch(error){
  if(error.response && !error.response.data.success){
  alert(error.response)
  }

  }
}
fetchData()
},[])


  const handleChange = (e)=>{
const {name,value} = e.target
setProject({...Project,[name] : value})
  }

   const handleSubmit = async(e)=>{
e.preventDefault();




try{
const response = await axios.put(`${serverLink}/api/project/edit/${id}`,Project)



if(response.data.success){
  Navigate("/admin-dashbord/projects")
}

}catch(error){
  
  if(error.response && !error.response.data.success){
  alert(error.response)
  }

}


  }


  return (
 <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Edit Project</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <label
             htmlFor="projectname"
            className='text-sm font-medium text-gray-700'

            
          >Project</label>

            <input type="text" 
            onChange={handleChange}
            value={Project.projectname || ""}
            name='projectname'
            placeholder='enter Project name'
            className='mt-1 w-full p-2 border brder-gray-300 rounded-md'
            required
            />
          </div>
          <div className='mt-3'>
            <label
             htmlFor="description"
             className='block text-sm font-medium text-gray-700'
            
            >Description</label>
            <textarea 
            name="description" 
            onChange={handleChange}
            value={Project.description || ""}
             placeholder='description'
             className='mt-2 p-1 block w-full border border-gray-300 rounded-md'
             rows="4"
             ></textarea>
            <div>
              <button
              type='submit'
              className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
              
              
              >Edit Project</button>
            </div>
            
          </div>
        </form>
      </div>
  
  )
}

export default ProjectEdit;