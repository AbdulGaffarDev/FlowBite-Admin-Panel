import { useState} from "react";
import { useSelector } from "react-redux";
import {
  FaChartPie ,
  FaThLarge,
  FaTable,
  FaCog,
  FaChartBar,
  FaLock,
} from "react-icons/fa";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";

function Sidebar() {
    const themeState = useSelector(state => state.ui.theme)
    const isPopupOpen = useSelector(state => state.ui.isPopupOpen);
    const isAlertDisplaying = useSelector(state => state.ui.isAlertDisplaying);
    const isProductFormOpen = useSelector(state => state.ui.isProductFormOpen);
    const isModalOpen = useSelector(state => state.ui.isAnyModalOpen)

    const isAnyModalOpen = isPopupOpen || isAlertDisplaying || isProductFormOpen || isModalOpen; 
    const [activeItem,setActiveItem] = useState(null);
    
    const toggleItem = (label) => {
        setActiveItem(label === activeItem ? null : label);
    }
  return (
    <div>
    <div className={`sidebarContainer 
                ${themeState==='light'? 'bg-white':'bg-blue-950 border-r border-white'} 
                ${isAnyModalOpen ? 'blurred' : ''}
                `} >
        
        <div className={`sidebarElements 
                        ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}
            `}>
            <FaChartPie className={`${themeState==='light'? 'text-black':'text-white'}`} />
            <span className={`${themeState==='light'? 'text-black':'text-white'}`} >Dashboard</span>
        </div>
        
        <div>
            <div 
                className={`sidebarElements justify-between 
                        ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}`}
                onClick={() => toggleItem('Layouts')}
            >
                <div className="flex items-center gap-2">
                    <FaThLarge className={`${themeState==='light'? 'text-black':'text-white'}`}/>
                    <span className={`${themeState==='light'? 'text-black':'text-white'}`}>Layouts</span>
                </div>
                <span>{activeItem === "Layouts" ? 
                    <GoTriangleDown className={`${themeState==='light'? 'text-black':'text-white'}`}/> : 
                    <GoTriangleRight className={`${themeState==='light'? 'text-black':'text-white'}`}/>
                    }
                </span>
            </div>
            <div>
                {activeItem === "Layouts" && (
                    <div className="text-1xl pt-2 text-gray-500">
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'}
                                        sidebarNestedElements`
                                        }>
                            Stacked
                        </div>
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'}
                                        sidebarNestedElements`
                                        }>
                            Sidebar
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        <div>
            <div 
                className={`sidebarElements justify-between 
                        ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}`}
                onClick={() => toggleItem('CRUD')}
            >
                <div className="flex items-center gap-2">
                    <FaTable className={`${themeState==='light'? 'text-black':'text-white'}`}/>
                    <span className={`${themeState==='light'? 'text-black':'text-white'}`}>CRUD</span>
                </div>
                <span>{activeItem === "CRUD" ? 
                    <GoTriangleDown className={`${themeState==='light'? 'text-black':'text-white'}`}/> : 
                    <GoTriangleRight className={`${themeState==='light'? 'text-black':'text-white'}`}/>
                    }
                </span>
            </div>
            <div>
                {activeItem === "CRUD" && (
                    <div className="text-1xl pt-2 text-gray-500">
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'}
                                        sidebarNestedElements`
                                        }>                            Products
                        </div>
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'} 
                                        sidebarNestedElements`
                                        }>
                            Users
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        <div className={`sidebarElements 
                        ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}
            `}>
            <FaCog className={`${themeState==='light'? 'text-black':'text-white'}`}/>
            <span className={`${themeState==='light'? 'text-black':'text-white'}`}>
                Settings
            </span>
        </div>
        
        <div>
            <div 
                className={`sidebarElements justify-between 
                        ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}`}
                onClick={() => toggleItem('Pages')}
            >
                <div className="flex items-center gap-2">
                    <FaChartBar className={`${themeState==='light'? 'text-black':'text-white'}`}/>
                    <span className={`${themeState==='light'? 'text-black':'text-white'}`}>
                        Pages
                    </span>
                </div>
                <span>{activeItem === "Pages" ? 
                    <GoTriangleDown className={`${themeState==='light'? 'text-black':'text-white'}`}/> : 
                    <GoTriangleRight className={`${themeState==='light'? 'text-black':'text-white'}`}/>
                    }
                </span>
            </div>
            <div>
                {activeItem === "Pages" && (
                    <div className="text-1xl pt-2 text-gray-500">
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'} 
                                        sidebarNestedElements`
                                        }>
                            Pricing
                        </div>
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'} 
                                        sidebarNestedElements`
                                        }>
                            Maintenance
                        </div>
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'} 
                                        sidebarNestedElements`
                                        }>
                            404 not found
                        </div>
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'} 
                                        sidebarNestedElements`
                                        }>
                            500 server error
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div>
            <div 
                className={`sidebarElements justify-between 
                        ${themeState==='light'? 'hover:bg-gray-100':'hover:bg-blue-900'}`}
                onClick={() => toggleItem('Authentication')}
            >
                <div className="flex items-center gap-2">
                    <FaLock className={`${themeState==='light'? 'text-black':'text-white'}`}/>
                    <span className={`${themeState==='light'? 'text-black':'text-white'}`}>
                        Authentication
                    </span>
                </div>
                <span>{activeItem === "Authentication" ? 
                    <GoTriangleDown className={`${themeState==='light'? 'text-black':'text-white'}`}/> : 
                    <GoTriangleRight className={`${themeState==='light'? 'text-black':'text-white'}`}/>
                    }
                </span>
            </div>
            <div>
                {activeItem === "Authentication" && (
                    <div className="text-1xl pt-2 text-gray-500">
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'} 
                                        sidebarNestedElements`
                                        }>
                            Sign in
                        </div>
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'} 
                                        sidebarNestedElements`
                                        }>
                            Sign up
                        </div>
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'} 
                                        sidebarNestedElements`
                                        }>
                            Forgot password
                        </div>
                        <div className={`${themeState==='light'? 'text-black hover:bg-gray-100':'text-white hover:bg-blue-900'} 
                                        sidebarNestedElements`
                                        }>
                            Reset password
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    </div>
  )
}


export default Sidebar;
