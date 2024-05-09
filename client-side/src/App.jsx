import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from 'react-bootstrap'

import Header from "./components/Header";
import Footer from "./components/Footer"
// import Layout from './components/Layout';111
import Home from './pages/Home';
import MoviePage from "./pages/MoviePage";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import AuthPage from "./pages/Auth/AuthPage";
import EditMovie from "./pages/Auth/EditMovie";
import AddMovie from "./pages/Auth/AddMovie";
// import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


const client = new ApolloClient({uri: "http://localhost:4000/", 
cache: new InMemoryCache(),
})


function App() {

  const [user, setUser] = useState(null);

  // save user to state and session storage
  const handleLogin = (user) => {
    setUser(user);
    saveTokenToSessionStorage(user);
  }

  // clear user from state and session storage
  const handleLogout = () => {
    client.clearStore();
    sessionStorage.removeItem("user");
    setUser(null);
  };


  function saveTokenToSessionStorage(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  const getUserFromSessinStorage = () => {
    try {
      const userString = sessionStorage.getItem("user");
      const user = JSON.parse(userString);
      return user;
    } catch(err){
        sessionStorage.setItem("user", "")
        return null;
    }
  }

   // protected route: if user is not looged in, redirect to login page
  //  if user is not admin, redirect to home page
  function ProtecteAdminRoute({ component: Component, ...rest }) {

    // get user from session storage
    const user = getUserFromSessinStorage();
   
    if (!user) {
      return <Navigate to="/login" replace />
    } else if(user.role !== 'admin') {
      return <Navigate to="/" replace />
    }
    return <Component {...rest} user={user} />
  }

  // check if user is logged in on page load
  useEffect(() => {
    const user = getUserFromSessinStorage();
    if (user) {
      setUser(user);
    }
  }, []);



  return (
    <BrowserRouter>
       {/* Apollo Provider wraps the entire app to provide access to the Apollo Client */}
      <ApolloProvider client={client}>
        <div className="app">
          <Header user={user} onLogout={handleLogout} />
          <div className="mainContainer">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/movie/:movieId" element={<MoviePage  />}/>

            <Route path="/login" element={<Login onLogin={handleLogin} />}/>

            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />

            <Route path="/auth" element={<ProtecteAdminRoute component={AuthPage} user={user} />} />

            <Route path="/auth/movie/edit/:movieId" element={<ProtecteAdminRoute component={EditMovie} user={user} />} />

            <Route path="/auth/movie/add" element={<ProtecteAdminRoute component={AddMovie} user={user}  />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
          </div>
          
          <Footer />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
