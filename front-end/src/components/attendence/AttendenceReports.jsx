import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { Link } from 'react-router-dom'

const AttendanceReports = () => {
  const [report, setReport] = useState({})
  const [limit, setLimit] = useState(5)
  const [skip, setSkip] = useState(0)

  const [dateFilter, setDateFilter] = useState("")
  const [empIdFilter, setEmpIdFilter] = useState("")  // NEW

  const { serverLink } = useAuth()


  const fetchReport = async () => {
    try {
      const query = new URLSearchParams({ limit, skip })

      if (dateFilter) {
        query.append("date", dateFilter)
      }

      if (empIdFilter) {
        query.append("empId", empIdFilter)
      }

      const res = await axios.get(
        `${serverLink}/api/workerAttendance/attendanceReport?${query.toString()}`
      )

      if (res.data.success) {

        if (skip === 0) {
          setReport(res.data.groupData)
        } else {
          setReport(prev => ({ ...prev, ...res.data.groupData }))
        }
      }

    } catch (error) {
      alert(error.message)
    }
  }


  useEffect(() => {
    fetchReport()
  }, [skip, dateFilter, empIdFilter])


  const handleLoadMore = () => {
    setSkip(prev => prev + limit)
  }



  return (
    <div className='min-h-screen p-10 bg-white'>
      <h2 className='text-center text-2xl font-bold underline'>
        Attendance Report Day Wise
      </h2>


      {/* FILTER SECTION */}
      <div className='flex justify-between items-center mt-4'>

        {/* DATE FILTER */}
        <div>
          <h2 className='text-xl font-semibold'>Filter By Date</h2>
          <input
            type="date"
            className='border bg-gray-100'
            onChange={(e) => {
              setDateFilter(e.target.value)
              setSkip(0)
            }}
          />
        </div>

        {/* EMPLOYEE ID FILTER */}
        <div>
          <h2 className='text-xl font-semibold'>Filter By Employee ID</h2>
          <input
            type="text"
            placeholder='Enter Employee ID'
            className='border bg-gray-100 p-1'
            onChange={(e) => {
              setEmpIdFilter(e.target.value)
              setSkip(0)
            }}
          />
        </div>

        <div>
          <Link
            to="/employee-dashbord/workers-attendance/reports/monthly"
            className='px-4 py-1 bg-teal-600 rounded text-white'
          >
            Attendance-Report Monthly
          </Link>
        </div>

      </div>


      {/* REPORTS */}
      {Object.entries(report).map(([date, record]) => (
        <div className='mt-4 border-b' key={date}>
          <h2 className='text-xl font-semibold'>{date}</h2>

          <table className="w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2 text-left">S No</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Father Name</th>
                <th className="border p-2 text-left">Designation</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Over Time</th>
              </tr>
            </thead>

            <tbody>
              {record.map((data, i) => (
                <tr key={data.workerId || `${date}-${i}`}>
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{data.name}</td>
                  <td className="border p-2">{data.fathername}</td>
                  <td className="border p-2">{data.designation}</td>
                  <td className="border p-2">{data.status}</td>
                  <td className="border p-2">{data.overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}


      {/* LOAD MORE BUTTON */}
      <button
        className='mt-4 px-2 py-1 border bg-gray-100 text-lg font-semibold'
        onClick={handleLoadMore}
      >
        Load More
      </button>

    </div>
  )
}

export default AttendanceReports














































































// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useAuth } from '../../Context/AuthContext'
// import { Link } from 'react-router-dom'

// const AttendanceReports = () => {
//   const [report ,setReport] = useState({})
//   const[limit,setLimit] = useState(5)
//   const[skip,setSkip] = useState(0)
//   const[dateFilter,setDateFilter] = useState()
 

//   const {serverLink} = useAuth()




//   const fectchReport = async()=>{
//     try{
//       const query = new URLSearchParams({limit,skip})
//       if(dateFilter){
//         query.append("date",dateFilter)
//       }
     
//       const res = await axios.get(`${serverLink}/api/workerAttendance/attendanceReport?${query.toString()}`);
    
// if(res.data.success){

//   if(skip == 0){
//     setReport(res.data.groupData)
//   }else{
//     setReport((prevData)=> ({...prevData, ...res.data.groupData}))
//   }
 
// }
//     }catch(error){

//       alert(error.message)
//     }

//   }


// useEffect(()=>{
  
//   fectchReport()


// },[skip,dateFilter])

// const handleLoadMore = ()=>{

//   setSkip((prevSkip)=> prevSkip + limit)

// }







//   return (

//     <div className='min-h-screen p-10 bg-white'>
//       <h2 className='text-center text-2xl font-bold underline'>Attendance Report Day Wise</h2>
//       <div className='flex justify-between items-center mt-2'>
        
//         <div>
//           <h2 className='text-xl font-semibold'> Filter By Date</h2>
//         <input type="date" className='border bg-gray-100'  onChange={(e)=>{
//           setDateFilter(e.target.value)
//           setSkip(0)
//         }}/>
//         </div>
//         <div>
//         <Link to="/employee-dashbord/workers-attendance/reports/monthly" className='px-4 py-1 bg-teal-600 rounded text-white'>Attendance-Report Monthly</Link>
//         </div>
//       </div>
//       {Object.entries(report).map(([date,record])=>(
// <div className='mt-4 border-b' key={date}>
// <h2 className='text-xl font-semibold'>{date}</h2>
// <table className="w-full border border-gray-300">
//   <thead className="bg-gray-200">
//     <tr>
//       <th className="border border-gray-300 p-2 text-left">S No</th>
//       <th className="border border-gray-300 p-2 text-left">Name</th>
//       <th className="border border-gray-300 p-2 text-left">Father Name</th>
//       <th className="border border-gray-300 p-2 text-left">Designation</th>
//       <th className="border border-gray-300 p-2 text-left">Status</th>
//       <th className="border border-gray-300 p-2 text-left">Over Time</th>
//     </tr>
//   </thead>

//   <tbody>
//     {record.map((data, i) => (
//       <tr key={data.workerId?._id || `${date}-${i}`}>
//         <td className="border border-gray-300 p-2">{i + 1}</td>
//         <td className="border border-gray-300 p-2">{data.name}</td>
//         <td className="border border-gray-300 p-2">{data.fathername}</td>
//         <td className="border border-gray-300 p-2">{data.designation}</td>
//         <td className="border border-gray-300 p-2">{data.status}</td>
//         <td className="border border-gray-300 p-2">{data.overtime}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>



// </div>



//       ))}
//       <button className='px-2 py-1 border bg-gray-100 text-lg font-semibold' onClick={handleLoadMore}>Load More</button>
//     </div>
    
//   )
// }

// export default AttendanceReports