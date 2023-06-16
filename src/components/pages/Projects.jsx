import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import styles from './Projects.module.css'

import Message from "../layout/Message"
import Container from '../layout/Container'
import Loading from "../layout/Loading"
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../project/ProjectCard"

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setremoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                   'Conteny-Type': 'application/json'
                 }
            }).then(resp => resp.json()).then(data => {
                setProjects(data)
                setremoveLoading(true)
            }).catch(err => console.log(err))
        }, 300)
    }, [])

    async function removeProject(id) {

        await fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'applicstion/json'
            }
        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage("Projeto Removido com sucesso!")
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.tittle_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category ? project.category.name : 'Categoria Indefinida'}
                        key={project.id}
                        handleRemove={removeProject}
                        />
                        ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há Projetos Cadastrados!</p>
                )}
            </Container>
        </div>
    )
}