import React from "react";
import { Layout } from "../../components/layout";
import * as styles from "../../styles/projects.module.css";

export default function Projects() {
    return (
        <Layout>
            <div className={styles.portfolio}>
                <h2>Portfolio</h2>
                <h3>Projects & Webistes I've built</h3>
            </div>
        </Layout>
    )
}
