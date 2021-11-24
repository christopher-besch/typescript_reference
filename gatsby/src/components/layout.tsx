import React from "react";
import Navbar from "./navbar";
import "../styles/global.css";

// TODO: type might not be correct
export default function Layout({ children }: { children: React.ReactElement }) {
    return (
        <div className="layout">
            <Navbar />
            <div className="content">
                {children}
            </div>
            <footer>
                <p>Copyright 2021 stuff</p>
            </footer>
        </div>
    )
}
