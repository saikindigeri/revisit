import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [modalOpen,setModalOpen]=useState("");
  const [idOpened,setIdOpened]=useState(null);
  const [formData, setFormData] = useState({
    category: "",
    image: "",
    count: "",
  });
  const [updateformData, setUpdateFormData] = useState({
    category: "",
    image: "",
    count: "",
  })

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://revisit-1-yy53.onrender.com/api/categories", // Adjust endpoint if needed
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include Bearer token
            },
          }
        );
        setCategories(response.data.categories); // Assuming response.data is [{ id, name }, ...]
       
      } catch (error) {
        const errorMsg =
          error.response?.data?.error || "Failed to load categories.";

        console.error("Fetch categories error:", error);
      }
    };

    fetchCategories();
  }, [categories]); // Empty dependency array to run once on mount


  const handleEdit=(id)=>{
setIdOpened(id)
console.log(idOpened)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData)

  }; 

  
  const handleFormChange = (e) => {
    setUpdateFormData({
      ...updateformData,
      [e.target.name]: e.target.value,
    });
    console.log(updateformData)
    
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://revisit-1-yy53.onrender.com/api/categories",
        {
          categoryName: formData.category,
          count: formData.count,
          image: formData.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token
          },
        }
      );
    

      console.log("Category add:", response.data);
      setFormOpen(false)
    } catch (error) {
      console.error(error);
    }
   
  };

  const handleUpdateForm=async(e)=>{
    e.preventDefault();
   try {
      const response = await axios.put(
        `https://revisit-1-yy53.onrender.com/api/categories/${modalOpen}`,
        {
          categoryName: updateformData.category,
          count: updateformData.count,
          image: updateformData.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token
          },
        }
      );

      console.log("Updated form:", response.data);
      setModalOpen("")
    } catch (error) {
      console.error(error);
    }
  }





  return (
    <div className=" w-full min-h-screen bg-red">
         <nav className="bg-gray-900 w-full h-16 text-white flex justify-between items-center px-6">
      <div className="flex items-center gap-8">
        <h4 className="text-lg font-semibold">Fast Cart</h4>
        <div className="flex items-center gap-2">
          <IoSearch className="text-xl" />
          <input
            className="bg-transparent  border-gray-300 text-sm py-1 focus:outline-none focus:border-white transition-colors placeholder-gray-400"
            type="search"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <MdOutlineMarkUnreadChatAlt className="text-xl hover:text-gray-300 cursor-pointer" />
        <IoMdNotificationsOutline className="text-xl hover:text-gray-300 cursor-pointer" />
        <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center">
          <span className="text-sm font-medium">R</span>
        </div>
        <h2 className="text-sm font-medium">Sai Kumar</h2>
        <IoIosArrowDown className="text-lg hover:text-gray-300 cursor-pointer" />
      </div>
    </nav>

      <div className="flex">
        <Sidebar />
        <main className="w-full m-10">
          <div className="flex justify-between items-center">
            <h3 className="text-black font-semibold text-2xl">Categories</h3>
            <div className="">
              <button
                onClick={() => {
                  setFormOpen(!formOpen);
                }}
                className="border border-1 flex items-center space-x-1 p-4 justify-center bg-blue-600 rounded-sm  text-white"
              >
                <IoMdAdd className="mr-2" />
                Add Category
              </button>
            </div>
          </div>

          <div >
            {formOpen && (
              <form  onSubmit={handleSubmit}>
                <div className="flex flex-col w-100 ">
                  <label htmlFor="">Category</label>
                  <input
                    className="w-1/2 rounded-md border border-gray-700 focus:outline-none focus:ring-2"
                    type="text"
                    onChange={handleChange}
                    value={formData.category}
                    name="category"
                  />
                </div>
                <div className="flex flex-col w-100">
                  <label htmlFor="">Count</label>
                  <input
                    className="w-1/2 rounded-md border border-gray-700  focus:outline-none focus:ring-2"
                    type="number"
                    onChange={handleChange}
                    value={formData.count}
                    name="count"
                  />
                </div>
                <div className="flex flex-col w-100">
                  <label htmlFor="">Image</label>
                  <input
                    className="w-1/2 rounded-md border border-gray-700  focus:outline-none focus:ring-2"
                    type="text"
                    onChange={handleChange}
                    value={formData.image}
                    name="image"
                  />
                </div>

            <div className="w-1/2">
            <button className=" rounded-md  w-1/2 mt-5  bg-black text-white p-2" type="submit">
                  Submit
                </button>
                <button className="rounded-md  w-1/2 mt-5  bg-black text-white p-2" onClick={()=>setFormOpen(!formOpen)}>
                  Cancel
                </button>
            </div>
              </form>
            )}
          </div>
          <div className="mt-8">
        
            <ul className="grid md:grid-cols-3 sm:grid-cols-2 ">
              {categories.map((e) => (
                <div key={e._id} onClick={()=>handleEdit(e._id)} className=""
             >
              {
            modalOpen===e._id?(

              <form className="p-3" onSubmit={handleUpdateForm}>
              <div className="flex flex-col">
                <label htmlFor="">Category</label>
                <input
                  className="rounded-sm border border-gray-700 focus:outline-none focus:ring-2"
                  type="text"
                  onChange={handleFormChange}
                  value={updateformData.category}
                  name="category"
                />
              </div>
              <div className="flex flex-col">
                <label className="" htmlFor="">Count</label>
                <input
                  className="border rounded-sm border-gray-700 focus:outline-none focus:ring-2"
                  type="number"
                  onChange={handleFormChange}
                  value={updateformData.count}
                  name="count"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Image</label>
                <input
                  className="rounded-sm border border-gray-700 focus:outline-none focus:ring-2"
                  type="text"
                  onChange={handleFormChange}
                  value={updateformData.image}
                  name="image"
                />
              </div>
              <button className="w-full mt-1 mb-1 rounded-md bg-black px-3 py-2 text-white" type="submit">
                Save
              </button>
              <button className="w-full bg-black px-3 py-2 rounded-md text-white" onClick={() => setModalOpen("")}>
                Cancel
              </button>
            </form>
            ):(
              <div className="p-2 mt-10 mb-10 ">
              <img className="w-full h-[300px] rounded-md" src={e.image} alt={e.categoryName} />
              <h2 className="font-semibold">{e.categoryName}</h2>
              <h2 className="text-gray-500">{e.count} <span>Items</span></h2>
              <button onClick={() => setModalOpen(e._id)} className="bg-black rounded-md p-2 text-white w-1/3">Edit</button>
            </div>
            )
              }

                  
                </div>
              ))}
            </ul>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
