import { Link } from "react-router-dom";

import Container from "./Container";

import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";

export default function NavBar() {
  return (
    <nav className={styles.navbar} >
      <Container>

            <li> <Link to="/" > <img src={logo} alt="Logo Costs" /> </Link> </li>

        <ul className={styles.list} >
            <li className={styles.item}> <Link to="/">Home</Link> </li>
            <li className={styles.item}> <Link to="/projects">Projetos</Link> </li>
            <li className={styles.item}> <Link to="/company">Empresa</Link> </li>
            <li className={styles.item}> <Link to="/contact">Contato</Link> </li>
        </ul>
      </Container>
    </nav>
  );
}
