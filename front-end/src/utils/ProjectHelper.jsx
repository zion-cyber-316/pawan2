import { useNavigate } from "react-router-dom"


export const columns =[

  {
    name : "S no",
    selector :  (row) => row.sno
  },
  {
    name :"Project name",
    selector: (row) => row.projectname,
    sortable: true
  },
  {
    name : "Action",
    selector: (row) => row.action
  }
]



export const ProjectButtons = ({_id })=>{
  const navigate = useNavigate()

  return (
<div className="flex space-x-3"> 
  <button className="px-3 py-1 text-white bg-teal-600 rounded"

  onClick={()=> navigate(`/admin-dashbord/project/${_id}`)}
  
  >Edit</button>



 
</div>


  )
}