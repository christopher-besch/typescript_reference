import React from "react";
// import { PageProps } from "gatsby";
import Navbar from "./navbar";
import "../styles/global.css";

export default function Layout(props: any) {
    return (
        <div className="layout">
            <Navbar />
            <div className="content">
                {props.children}
            </div>
            <footer>
                <p>Copyright 2021 stuff</p>
            </footer>
        </div>
    )
}
