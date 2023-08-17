import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getProjects } from "../../api"
import Spline from '@splinetool/react-spline';

export default function Projects() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [projects, setProjects] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const typeFilter = searchParams.get("type")

    React.useEffect(() => {
        async function loadProjects() {
            setLoading(true)
            try {
                const data = await getProjects()
                setProjects(data)
                console.log(setProjects)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadProjects()
    }, [])

    const displayedProjects = typeFilter
        ? projects.filter(project => project.type === typeFilter)
        : projects

    const projectElements = displayedProjects.map((project) => {

        
        return (
        <div key={project.id} className="project-tile">
            <Link
                to={project.id}
                state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter
                }}
            >
                <img src={project.imageUrl} />
                <div className="project-info">
                    <h3>{project.name}</h3>
                    <p>${project.price}<span>/for the project</span></p>
                </div>
                <i className={`project-type ${project.type} selected`}>{project.type}</i>
            </Link>
        </div>
    )})

    function handleFilterChange(key, value) {
        
        
        
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <div className="project-list-container">
            <div className="project-list-header">
            <h1 className="project-list-h1"><span className="highligted-text">Explore</span> the available projects</h1>
            <div className="project-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange("type", "front-end")}
                    className={
                        `project-type simple 
                        ${typeFilter === "front-end" ? "selected" : ""}`
                    }
                >Front-end</button>
                <button
                    onClick={() => handleFilterChange("type", "back-end")}
                    className={
                        `project-type luxury 
                        ${typeFilter === "back-end" ? "selected" : ""}`
                    }
                >Back-end</button>
                <button
                    onClick={() => handleFilterChange("type", "ux-design")}
                    className={
                        `project-type rugged 
                        ${typeFilter === "ux-design" ? "selected" : ""}`
                    }
                >Ux-design</button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="project-type clear-filters"
                    >Clear filter</button>
                ) : null}

            </div>
            </div>
            <div className="project-list">
                {projectElements}
               
            </div>
            <div className="project-list-bottom-section">
            { <Spline 
                zIndex="-1"
                className="spline-background-projects"scene="https://prod.spline.design/xo9Z214VQTCYaekx/scene.splinecode" /> }
            </div>
        </div>
    )
}