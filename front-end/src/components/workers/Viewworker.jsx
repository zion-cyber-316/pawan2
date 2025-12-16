import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';




const Viewworker = () => {
    const {id} = useParams();
    const [worker,setWorker] = useState(null)
    const {serverLink} = useAuth()




  useEffect(()=>{
  const getWorkers = async()=>{
  try{
      const res = await axios.get(`${serverLink}/api/workers/getOne/${id}`);

      if(res.data.success){
        
console.log(res.data.findOneWorker)
 setWorker(res.data.findOneWorker)

      }
     




  }catch(error){
    console.log(error)
  }
  }


  getWorkers();


  },[])



  return ( 
<>  {worker ? (
    <div className='max-w-3xl mx-auto mt-3 bg-white p-4 rounded-md shadow-md'>
    <h2 className='text-3xl font-bold mb-4 text-center underline'>
         Worker Detail
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        
<div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Name :</p>
        <p className='font-medium'>{worker.name}</p>

    </div>
     <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Aadhar :</p>
        <p className='font-medium'>{worker.aadhar}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Father Name :</p>
        <p className='font-medium'>{worker.fathername}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>DOB:</p>
        <p className='font-medium'>{new Date(worker.dob).toLocaleDateString()}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Gender :</p>
        <p className='font-medium'>{worker.gender}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Designation :</p>
        <p className='font-medium'>{worker.designation}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Contact Number :</p>
        <p className='font-medium'>{worker.phonenumber}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'> Joining Date :</p>
        <p className='font-medium'>{new Date(worker.joiningdate).toLocaleDateString()}</p>

    </div>
    <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>PF-Number :</p>
        <p className='font-medium'>{worker.pfnumber}</p>

    </div>
     <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>ESIE :</p>
        <p className='font-medium'>{worker.esie}</p>

    </div>
     <div className='flex space-x-3 mb-3'>
        <p className='text-lg font-bold'>Salary :</p>
        <p className='font-medium'>{worker.basicsalary}</p>

    </div>
</div>
    </div>

</div>
): <div>Loading</div>}


</>

  )
}

export default Viewworker;