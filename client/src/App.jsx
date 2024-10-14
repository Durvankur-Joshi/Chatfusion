// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import Auth from './pages/auth';
// import Chat from './pages/chat';
// import Profile from './pages/profile.jsx';
// import { useAppStore } from '../src/store/index.js';
// import { apiClient } from './lib/api-client.js';
// import { GET_USER_INFO } from './utils/constants.js';
// import { useState , useEffect } from 'react';

// const PrivateRoute = ({ children }) => {
//   const { userInfo } = useAppStore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? children : <Navigate to="/profile" />;
// };
// // const PrivateRoute = ({ children }) => {
// //   const { userInfo } = useAppStore();
// //   console.log(userInfo);  // Log the user info to check the state
// //   const isAuthenticated = !!userInfo;
// //   return isAuthenticated ? children : <Navigate to="/auth" />;
// // };


// const AuthRoute = ({ children }) => {
//   const { userInfo } = useAppStore();
//   const isAuthenticated = !!userInfo; 
//   return isAuthenticated ? <Navigate to="/chat" /> : children;
// };

// function App() {
//   const {userInfo , setUserInfo} = useAppStore();
//   const [loading , setLoading] = useState(true);
//   useEffect(()=>{
//     const getUserData = async () =>{

//       try {
//         const response = await apiClient.get(GET_USER_INFO,{
//           withCredentials:true
//         })

//         if (response.status === 200 && response.data.id) {
//           setUserInfo(response.data)
//         }
//         else{
//           setUserInfo(undefined);
//         }
//         console.log(response);
        
//       }
//    catch (error) {
//       setUserInfo(undefined);
//     }finally{
//       setLoading(false);
//     }
//   } 
//   })

//   if(loading)
//   {
//     return <div>Loading.....</div>
//   }


//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/auth' element={<AuthRoute><Auth/></AuthRoute>} />
//         <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>} />
//         <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
//         <Route path='*' element={<Navigate to="/auth"/>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import Chat from './pages/chat';
import Profile from './pages/profile.jsx';
import { useAppStore } from '../src/store/index.js';
import { apiClient } from './lib/api-client.js';
import { GET_USER_INFO } from './utils/constants.js';
import { useState, useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/profile" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo; 
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        // console.error("Error fetching user info:", error);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };

    getUserData(); // Call the function to fetch user data
  }, [setUserInfo]); // Add setUserInfo to the dependency array

  if (loading) {
    return<div className="flex justify-center items-center h-screen">
    <span className="loading loading-infinity" style={{ width: '100px', height: '100px', color:'white' }}></span>
  </div>
  
   ;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='*' element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
