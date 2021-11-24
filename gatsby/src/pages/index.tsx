import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import styles from "../styles/home.module.css";
// TODO: might get fixed with:
// https://www.gatsbyjs.com/plugins/gatsby-plugin-tsconfig-paths/
// https://stackoverflow.com/questions/61378768/how-to-make-module-css-works-with-typescript-in-a-gatsby-application

export default function Home() {
    return (
        <Layout>
            <section className={styles.header}>
                <div>
                    <h2>Design</h2>
                    <h3>Develop</h3>
                    <p>Stuff to do</p>
                    <Link className={styles.btn} to="/projects">My Portfolio Projects</Link>
                </div>
            </section>
        </ Layout>
    )
}
