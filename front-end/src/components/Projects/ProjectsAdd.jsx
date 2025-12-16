import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'

const ProjectsAdd = () => {
  const [Project,setProject]=useState({
    projectname : "",
    description :""
  })
const Navigate = useNavigate()
const {serverLink} = useAuth()


  const handleChange = (e)=>{
const {name,value} = e.target
setProject({...Project, [name] : value})
  }




  const handleSubmit = async(e)=>{
e.preventDefault();

try{
const response = await axios.post("http://localhost:5000/api/project/add",Project,
 
)



if(response.data.success){
  
console.log(response)
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
        <h2 className='text-2xl font-bold mb-6'>Add Project</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <label
             htmlFor="projectname"
            className='text-sm font-medium text-gray-700'

            
          >Project</label>

            <input type="text" 
            onChange={handleChange}
            name='projectname'
            placeholder='enter project name'
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
             placeholder='description'
             className='mt-2 p-1 block w-full border border-gray-300 rounded-md'
             rows="4"
             ></textarea>
            <div>
              <button
              type='submit'
              className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
              
              
              >Add Project</button>
            </div>
            
          </div>
        </form>
      </div>
  
  )
}

export default ProjectsAdd