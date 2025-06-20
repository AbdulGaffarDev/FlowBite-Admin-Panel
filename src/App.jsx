import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";
import Products from "./components/Products";

function App() {
  const themeState = useSelector(state => state.ui.theme);
  return (
    <>
      <div className="flex flex-col w-full h-full min-h-max  mt-19 overflow-x-hidden">
        <Navbar />
        <Toaster 
              position="top-right" 
              reverseOrder={false}
              toastOptions={{
                style: {
                  background: themeState === 'dark' ? '#2027bb' : '#ffffff', 
                  color: themeState === 'dark' ? '#f9fafb' : '#1f2937',      
                  padding: '12px 16px',
                  borderRadius: '8px',
                }
              }}   
          />
          <Sidebar />
          {/* <Users /> */}
          <Products/>

          

      </div>
    </>
  )
}

export default App;
