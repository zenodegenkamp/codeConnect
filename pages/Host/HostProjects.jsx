import React from "react"
import { Link } from "react-router-dom"
import { getHostProjects } from "../../api"

export default function HostProjects() {
    const [projects, setProjects] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadProjects() {
            setLoading(true)
            try {
                const data = await getHostProjects()
                setProjects(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadProjects()
    }, [])

    const hostProjectsEls = projects.map(project => (
        <Link
            to={project.id}
            key={project.id}
            className="host-project-link-wrapper"
        >
            <div className="host-project-single" key={project.id}>
                <img src={project.imageUrl} alt={`Photo of ${project.name}`} />
                <div className="host-project-info">
                    <h3>{project.name}</h3>
                    <p>${project.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <section className="host-projects-container">
            <h1 className="host-projects-title">Your listed projects</h1>
            <div className="host-projects-list">
                {
                    projects.length > 0 ? (
                        <section>
                            {hostProjectsEls}
                        </section>

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>
    )
}