import Add_Product_Form from "./assets/components/Add Product Form";
import Add_User_Form from "./assets/components/Add User Form";
import Navbar from "./assets/components/navbar"
import Sidebar from "./assets/components/Sidebar";
import Users from "./assets/components/Users";
import UsersTable from "./assets/components/UsersTable";


function App() {

  return (
    <>
      <div className="flex flex-col w-[100%]  mt-19 overflow-x-hidden">
        <Navbar />
        {/* <div className="flex h-screen "> */}
          <Sidebar />
          <Users />
          {/* <UsersTable/> */}
        {/* </div> */}
          {/* <Add_Product_Form/> */}
          {/* <Add_User_Form/> */}

          

      </div>
    </>
  )
}

export default App;
