import './App.css'
import MainPage from './Pages/MainPage/MainPage'
function App() {
  return (
    <>
      <MainPage />
    </>
  )
}

export default App


// to run dashboard, uncomment below and comment above

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MainPage from './Pages/MainPage/MainPage';
// import Dashboard from './Pages/Dashboard/Dashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 1. Redirect root "/" to "/dashboard" automatically. 
//              This fixes the "No Selection" issue by forcing the URL to be correct. */}
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />

//         {/* 2. This is the main route the Sidebar is looking for */}
//         <Route path="/dashboard" element={<Dashboard />} />
        
//         {/* Other pages */}
//         <Route path="/home" element={<MainPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
