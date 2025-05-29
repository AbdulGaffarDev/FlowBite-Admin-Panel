import ProductForm from "./assets/components/ProductForm";
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
          <Sidebar />
          {/* <Users /> */}
          <ProductForm/>

          

      </div>
    </>
  )
}

export default App;
