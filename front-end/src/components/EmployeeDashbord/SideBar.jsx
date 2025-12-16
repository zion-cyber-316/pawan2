
import React, { useState } from 'react'

import { AiFillAmazonCircle, AiFillCalendar } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { FaBuilding, FaCalendar, FaCalendarAlt, FaMoneyBill, FaMoneyBillWave, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';




const SideBar = () => {


const { user, serverLink } = useAuth();

  const [employee, setEmployee] = useState([]);
  const [workeraccess, setWorkeraccess] = useState([]);

  useEffect(() => {

    // ⛔ jab tak user load na ho
    if (!user || !user._id) return;

    const fetchEmp = async () => {
      try {
        console.log("Calling API with ID:", user._id);

        const res = await axios.get(
          `${serverLink}/api/employee/userId/${user._id}`
        );

        setEmployee(res.data.employees.purchaseaccess);
        setWorkeraccess(res.data.employees.workeraccess);

      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmp();

  }, [user, serverLink]);



  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h1 className='text-2xl text-center'>Empolyee Ms</h1>
      </div>
      <div>
        
        <NavLink to="/employee-dashbord"
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}
          end>
          <FaTachometerAlt />
          <span>Dashbord</span>
        </NavLink>




       


    

         {user && user._id && (<NavLink to= {`/employee-dashbord/profile/${user._id}`}
          className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaUsers />
          <span>My Profle</span>
        </NavLink>) }

    <NavLink to="/employee-dashbord/leaves"
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>
        







     


        <NavLink to={`/employee-dashbord/salary/${user._id}`}
           className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

 {employee == "Allowed" ? ( <NavLink to="/employee-dashbord/purchase"
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          < GiMoneyStack />
          <span> Purchase </span>
        </NavLink>) :" " } 
        
   
        

 {workeraccess == "Allowed" ? ( <NavLink to={`/employee-dashbord/workers`}
           className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <IoIosPeople />
          <span>Workers</span>
        </NavLink>) : ""}


 {workeraccess == "Allowed" ? (<NavLink to={`/employee-dashbord/workers-attendance`}
           className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaCalendarAlt />
          <span>Workers-Attendance</span>
        </NavLink>) :""}


        <NavLink to="/employee-dashbord/setting"
           className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaTachometerAlt />
          <span>Setting</span>
        </NavLink>


      </div>
    </div>
   
  )
}

export default SideBar



































































































