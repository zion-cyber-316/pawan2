import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { FaTachometerAlt, FaUsers, FaBuilding, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";

import { useAuth } from '../../Context/AuthContext';

const SideBar = () => {

  const { serverLink } = useAuth();   // ✅ serverLink yahin se aayega

  const [user, setUser] = useState(null);   // ✅ null se start
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userVerify = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          return;
        }

        const response = await axios.get(
          `${serverLink}/auth/verify`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data?.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }

      } catch (error) {
        console.log("Auth verify error:", error);
        setUser(null);
      } finally {
        setLoading(false);   // ✅ loading always stop
      }
    };

    userVerify();
  }, [serverLink]);

  // ✅ Loader (VERY IMPORTANT)
  if (loading) {
    return (
      <div className="bg-gray-800 text-white h-screen w-64 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ✅ Safety Guard
  if (!user) {
    return null; // ya Navigate to /login
  }

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 w-64 space-y-2">

      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h1 className="text-xl">Employee MS</h1>
      </div>

      {/* Dashboard */}
      <NavLink
        to="/employee-dashbord"
        end
        className={({ isActive }) =>
          `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <FaTachometerAlt />
        <span>Dashboard</span>
      </NavLink>

      {/* Profile */}
      <NavLink
        to={`/employee-dashbord/profile/${user._id}`}
        className={({ isActive }) =>
          `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <FaUsers />
        <span>My Profile</span>
      </NavLink>

      {/* Leaves */}
      <NavLink
        to="/employee-dashbord/leaves"
        className={({ isActive }) =>
          `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <FaBuilding />
        <span>Leaves</span>
      </NavLink>

      {/* Salary */}
      <NavLink
        to={`/employee-dashbord/salary/${user._id}`}
        className={({ isActive }) =>
          `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <FaMoneyBillWave />
        <span>Salary</span>
      </NavLink>

      {/* Purchase */}
      <NavLink
        to="/employee-dashbord/purchase"
        className={({ isActive }) =>
          `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <GiMoneyStack />
        <span>Purchase</span>
      </NavLink>

      {/* Workers */}
      <NavLink
        to="/employee-dashbord/workers"
        className={({ isActive }) =>
          `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <IoIosPeople />
        <span>Workers</span>
      </NavLink>

      {/* Workers Attendance */}
      <NavLink
        to="/employee-dashbord/workers-attendance"
        className={({ isActive }) =>
          `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded`
        }
      >
        <FaCalendarAlt />
        <span>Workers Attendance</span>
      </NavLink>

 <NavLink to="/employee-dashbord/setting"
           className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
           <FaTachometerAlt />
          <span>Setting</span>
        </NavLink>


      

    </div>
  );
};

export default SideBar;










