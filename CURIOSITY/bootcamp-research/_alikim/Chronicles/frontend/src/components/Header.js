import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { logout } from "../services/auth"


export default function Header({ auth, setAuth, title, subtitle, imageUrl }) {

  const user = useSelector(state => state.user)
  let [isStarted, setIsStarted] = useState("")

  const onLogout = async (e) => {
    await logout();
    setAuth(false)
    return <Redirect to="/login" />
  }
  
  (async () => {
    await setTimeout(()=>setIsStarted("is-started"), 500)
    await setTimeout(()=> setIsStarted("is-display"), 500)
  })()

  return (<header id="top">
    {/* <Link to="/"><h1 className="top-title">THE CHRONICLES</h1></Link> */}

    <nav className="top-con">
      <ul>

        {auth && 
          <li style={{ marginLeft: "1rem" }}>
            <button onClick={onLogout} type="button" style={{ margin: 0, color: "white" }}>
              Logout
            </button>
          </li>
        }
          <NavLink to="/about" exact={true} activeClassName="active">
          <li>About</li>
        </NavLink>

        {auth && <>

          <NavLink to={`/users/${user.id}`} exact={true} activeClassName="active">
            <li>Profile</li>
          </NavLink>

          <NavLink to={`/talespinner`} exact={true} activeClassName="active">
            <li>TaleSpinner</li>
          </NavLink>

          <NavLink to={`/worldweaver`} exact={true} activeClassName="active">
            <li>WorldWeaver</li>
          </NavLink>

          {/* 
          <NavLink to={`/library`} exact={true} activeClassName="active">
            <li>Library</li>
          </NavLink> */}

          {/* <li>
          <NavLink to="/characters" exact={true} activeClassName="active">
            My Characters
          </NavLink>
        </li>
        <li>
          <NavLink to="/Places" exact={true} activeClassName="active">
            My Places
          </NavLink>
        </li>
        <li>
          <NavLink to="/assets" exact={true} activeClassName="active">
            My Assets
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}

        </>}

        <NavLink to={`/character-generator`} exact={true} activeClassName="active">
          <li>Generator</li>
        </NavLink>

        <NavLink to={`/gallery`} exact={true} activeClassName="active">
          <li>Gallery</li>
          {/* Spotlight, discovery, find, new, latest, by your followed, by tag, popular */}
        </NavLink>

        {/* For Anon Users, show only Login/Signup options: */}
        {!auth && <>

          <NavLink to="/login" exact={true} activeClassName="active">
            <li>Login</li>
          </NavLink>

          <NavLink to="/sign-up" exact={true} activeClassName="active">
            <li>Sign Up</li>
          </NavLink>

        </>}

        <NavLink to="/" exact={true} activeClassName="active" >
          <li>Home</li>
        </NavLink>

      </ul>
    </nav>

    <section className={`hdr lo-screen-fill ${isStarted}`} style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="lo-txt-center">
        <h1>{title}</h1>
         <span style={{opacity: "0"}}><hr  /></span>
        <h2>{subtitle}</h2>
      </div>
    </section>

  </header>);
}
