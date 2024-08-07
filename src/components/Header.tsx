import React from "react";

import { LOGO } from "../constants";

import "./Header.css";

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center py-3 mb-4 border-bottom">
                <a href="/" className="text-dark text-decoration-none">
                    <pre className="x-header-logo">
                        {LOGO}
                    </pre>
                </a>
            </header>
        </div>
    );
}

export default Header;
