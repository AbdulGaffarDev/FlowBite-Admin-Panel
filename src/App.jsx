import ProductForm from "./assets/components/ProductForm";
import Navbar from "./assets/components/navbar"
import Sidebar from "./assets/components/Sidebar";
import Users from "./assets/components/Users";
import Products from "./assets/components/Products";

function App() {

  return (
    <>
      <div className="flex flex-col w-[100%]  mt-19 overflow-x-hidden">
        <Navbar />
          <Sidebar />
          <Users />
          {/* <Products/> */}

          

      </div>
    </>
  )
}

export default App;
