import { useNavigate } from "react-router-dom"


export const columns =[

  {
    name : "S no",
    selector :  (row) => row.sno
  },
  {
    name :"Department name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name : "Action",
    selector: (row) => row.action
  }
]



export const DepartmentButtons = ({_id , onDepartmentDelete})=>{
  const navigate = useNavigate()

  return (
<div className="flex space-x-3"> 
  <button className="px-3 py-1 text-white bg-teal-600 rounded"

  onClick={()=> navigate(`/admin-dashbord/department/${_id}`)}
  
  >Edit</button>



 
</div>


  )
}