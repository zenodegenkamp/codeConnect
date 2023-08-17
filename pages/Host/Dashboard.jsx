import React from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getHostProjects } from "../../api"
import { getAuth, signOut } from "firebase/auth"

function LogoutButton({ navigate }) {
  function handleLogout() {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        navigate("/login")
      })
      .catch((error) => {
        console.error("Error", error);
      })
  }

  return (
    <button className="log-out-btn" onClick={handleLogout}>
      Log out
    </button>
  );
}

export default function Dashboard() {
  const [projects, setProjects] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const auth = getAuth()
  const user = auth.currentUser
  const navigate = useNavigate()

  React.useEffect(() => {
    setLoading(true)
    getHostProjects()
      .then((data) => setProjects(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, []);

  function renderProjectElements(projects) {
    const hostProjectEls = projects.map((project) => (
      <div className="host-project-single" key={project.id}>
        <img src={project.imageUrl} alt={`Photo of ${project.name}`} />
        <div className="host-project-info">
          <h3>{project.name}</h3>
          <p>${project.price}/day</p>
        </div>
        <Link to={`projects/${project.id}`}>View</Link>
      </div>
    ));

    return (
      <div className="host-project-list">
        <section>{hostProjectEls}</section>
      </div>
    )
  }

  if (error) {
    return <h1>Error: {error.message}</h1>
  }

  return (
    <>
      <div className="dasbhoard-greetings">
        <h1>Welcome {user?.email}!</h1>
        <LogoutButton navigate={navigate} />
      </div>
      <div className="host-dashboard-flex">
        <section className="host-dashboard-earnings">
          <div className="info">
            <p>
              Your due payments for <span>the end of the month</span>
            </p>
            <h2>$2,260</h2>
          </div>
          <Link to="income">Details</Link>
        </section>
        <section className="host-dashboard-reviews">
          <h2>Review score</h2>

          <BsStarFill className="star" />

          <p>
            <span>5.0</span>/5
          </p>
          <Link to="reviews">Details</Link>
        </section>
        <section className="host-dashboard-active-projects">
          <h2>
            Currently{" "}
            <span className="host-dashboard-active-projects-bold">2 </span>
            active projects
          </h2>
        </section>
      </div>
      <section className="host-dashboard-projects">
        <div className="top">
          <h2>Your listed projects</h2>
          <Link to="projects">View all</Link>
        </div>
        {loading && !projects ? (
          <h1>Loading...</h1>
        ) : (
          <>{renderProjectElements(projects)}</>
        )}
      </section>
    </>
  )
}
