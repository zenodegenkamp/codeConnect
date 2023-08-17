import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getVan } from "../../api";
import Spline from "@splinetool/react-spline";

export default function VanDetail() {
  const [project, setProject] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { id } = useParams()
  const location = useLocation()

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true)
      try {
        const data = await getVan(id)
        setProject(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadVans()
  }, [id])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>
  }

  const search = location.state?.search || ""
  const type = location.state?.type || "all"


  return (
    <div className="project-detail-container">
      <div className="project-detail-back-btn">
        <Link to={`..${search}`} relative="path" className="back-button">
          &larr; <span>Back to {type} projects</span>
        </Link>
      </div>
      {project && (
        <div className="project-detail">
          <div className="project-detail-img">
            <img src={project.imageUrl} />
          </div>
          <div className="project-detail-text">
            <i className={`project-type ${project.type} selected`}>
              {project.type}
            </i>
            <h2>{project.name}</h2>
            <p className="project-price">
              <span>${project.price}</span>/ for the project
            </p>
            <p className="project-description">{project.description}</p>
            <button className="link-button">Rent this project</button>
          </div>
        </div>
      )}
    </div>
  )
}
