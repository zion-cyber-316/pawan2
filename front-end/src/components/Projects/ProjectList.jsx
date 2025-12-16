import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'
import { columns, ProjectButtons } from '../../utils/ProjectHelper'




const ProjectList = () => {
const [Projects,setProjects] = useState([])
const [filterProjects,setfilterProjects] = useState([])
const {serverLink} = useAuth()






/// fech data 

useEffect(()=>{

const fetchdata =async()=>{
try{
  const res = await axios.get(`${serverLink}/api/project/get`)
  console.log(res)
  if(res.data.success){
    let sno =1
    const data =await res.data.Projects.map((pro)=>(
      {
        _id : pro._id,
      sno : sno++,
      projectname:pro.projectname,
      action :(<ProjectButtons _id ={pro._id} />)
      }
    ))
    setProjects(data)
    setfilterProjects(data)
  }

}catch(error){
    if(error.res && !error.res.data.success){
  alert(error.res)
  }
}


}


 fetchdata()
},[])



const filterDepartments = (e) =>{
  
const records = Projects.filter((pro)=>
pro.projectname.toLowerCase().includes(e.target.value.toLowerCase()))
setfilterProjects(records)
}



  return (
    <div className='p-5'>
    
      <div className='text-center'>
        <h3 className='text-2xl font-bold underline'>Manage Projects</h3>
         
   
      </div>
      <div className='flex justify-between items-center'>
        <input onChange={filterDepartments}  type="text" placeholder='Search by dep name' className='px-4 py-0.5 border' />
        <Link to="/admin-dashbord/add-project" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Project</Link>
      </div>
      <div className='mt-5'>
        <DataTable
      columns={columns} data = {filterProjects} pagination
        />
      </div>
    </div>
  )
}

export default ProjectList