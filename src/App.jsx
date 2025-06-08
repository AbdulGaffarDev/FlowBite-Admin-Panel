import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";
import Products from "./components/Products";

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
