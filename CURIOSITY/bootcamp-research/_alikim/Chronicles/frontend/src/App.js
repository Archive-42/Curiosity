import React, { useState, useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SignUpForm from "./components/auth/SignUpForm"
import LoginForm from "./components/auth/LoginForm"

// PAGE COMPONENTS
import Home from './components/pages/Home'
import PlayGallery from './components/pages/PlayGallery'
import ChroniclePage from './components/pages/ChroniclePage.js'
import TalePage from './components/pages/TalePage'
import CurrentThread from './components/pages/CurrentThread'
import User from "./components/pages/User"
import UsersList from "./components/pages/UsersList"
import Library from './components/pages/Library'
import WorldWeaver from './components/pages/WorldWeaver'
import TaleSpinner from './components/pages/TaleSpinner'
import About from './components/pages/About'
import Generator from './components/generator/Generator'
import EntityPage from './components/pages/EntityPage/EntityPage'
import CreationPage from './components/pages/CreationPage'


// ACTIONS
import { getCreations } from './store/mainActions/userActions'

function App() {
  const dispatch = useDispatch()
  const [auth, setAuth] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const user = useSelector(state => state.user)

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' }
      });
      const content = await res.json();
      console.log("App content", content)
      if (!content.errors) {
        setAuth(true)
        dispatch(getCreations(content))
      }
      setLoaded(true)
    })()
  }, [])

  if (!loaded) return null

  return (
    <BrowserRouter>

      <Route path="/" exact={true}>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="./images/book-library-with-open-textbook.jpg"
          title="Welcome to The Chronicles"
          subtitle="Discover and play free text adventures made by users like you, or spin your own tale or three and share it to the world!"
        />
        <Home />
      </Route>

      {/* Login and Signup forms */}
      <Route path="/login" exact={true}>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="./images/book-library-with-open-textbook.jpg"
          title="The Chronicles"
          subtitle="Please log in."
        />
        <LoginForm auth={auth} setAuth={setAuth} />
      </Route>

      <Route path="/sign-up" exact={true}>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="./images/book-library-with-open-textbook.jpg"
          title="The Chronicles"
          subtitle="Create an account."
        />
        <SignUpForm auth={auth} setAuth={setAuth} />
      </Route>

      <Route path="/about" exact={true}>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="./images/profile.jpg"
          title="About The Chronicles"
          subtitle="Learn more about The Chronicles and its creator, Alicia Mira Kim."
        />
        <About />
      </Route>

      {/* Public game pages, for all players */}
      <Route path="/gallery" exact={true}>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="./images/row-books-literature-concept.jpg"
          title="The Chronicles Gallery"
          subtitle="Discover and play free text adventures made by others."
        />
        <PlayGallery />
      </Route>
      
      <Route path="/characters/:eid" exact={true}>
        <EntityPage auth={auth} setAuth={setAuth} />
      </Route>
      
      <Route path="/places/:eid" exact={true}>
        <EntityPage auth={auth} setAuth={setAuth} />
      </Route>
      
      {/* <Route path="/users/:uid/creations/:crid" exact={true}>
        <CreationPage />
      </Route> */}
      

      <Route path="/chronicles/:cid" exact={true}>
        <ChroniclePage auth={auth} setAuth={setAuth}  />
      </Route>

      <Route path="/chronicles/:cid/tales/:tid" exact={true}>
        <TalePage auth={auth} setAuth={setAuth} />
      </Route>

      <Route path="/chronicles/:cid/tales/:tid/play">
        <CurrentThread auth={auth} setAuth={setAuth} />
      </Route>

      <Route path="/character-generator">
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="./images/stockvault-dice127471.jpg"
          title="NPSeed: Random Character Generator"
          subtitle="Customize each trait to your needs. Receive smartly randomized results that you can actually use."
        />
        <Generator />
      </Route>

      {/* Private game-library and creator pages, for users */}
      <ProtectedRoute path="/library" exact={true} auth={auth}>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="./images/row-books-literature-concept.jpg"
          title="Your Library"
          subtitle="Discover and play free text adventures made by others."
        />
        <Library />
      </ProtectedRoute>

      <ProtectedRoute path="/worldweaver" exact={true} auth={auth}>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="./images/vintage-desk-concept-with-old-book.jpg"
          title="WorldWeaver"
          subtitle="Create your own worlds, characters, tales, and games."
        />
        <WorldWeaver />
      </ProtectedRoute>

      <ProtectedRoute path="/talespinner" exact={true} auth={auth}>

        <TaleSpinner auth={auth} setAuth={setAuth} />
      </ProtectedRoute>

      {/* User list and individual user profiles */}
      <ProtectedRoute path="/users" exact={true} auth={auth}>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="./images/blank-notebook-mock-up.jpg"
          title="User List"
          subtitle="Find other authors and players."
        />
        <UsersList auth={auth} setAuth={setAuth} />
      </ProtectedRoute>

      <ProtectedRoute path="/users/:uid" exact={true} auth={auth}>
        <Header
          auth={auth} setAuth={setAuth}
          imageUrl="../images/blank-notebook-mock-up.jpg"
          title={user.username}
          subtitle={`Joined: ${user.created_at?.toLocaleString()}`}
        />
        <User auth={auth} setAuth={setAuth} />
      </ProtectedRoute>

      {/* <Footer auth={auth} setAuth={setAuth} /> */}

    </BrowserRouter>
  );
}

export default App;
