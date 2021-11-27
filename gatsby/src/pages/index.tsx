import React from "react";
import { Link } from "gatsby";
// from https://djmm.me/post/typescript-graphql-and-gatsby/
import Layout from "../components/layout";
import * as styles from "../styles/home.module.css";

const Home: React.FC = () => {
    return (
        <Layout>
            <section className={styles.header}>
                <div>
                    <h2>Design</h2>
                    <h3>Develop</h3>
                    <p>Stuff to do</p>
                    <Link className={styles.btn} to="/projects">My Portfolio Projects</Link>
                </div>
                <img src="/banner.png" alt="site banner" style={{ maxWidth: "100%" }} />
            </section>
        </ Layout>
    )
};
export default Home;
