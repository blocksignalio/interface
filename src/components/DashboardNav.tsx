import React from "react";

import "./DashboardNav.css";

export interface DashboardNavProps {
    title: string;
    children: React.ReactNode;
};

const DashboardNav: React.FunctionComponent<DashboardNavProps> = (props: DashboardNavProps): JSX.Element => {
    return (
        <nav className="col-md-2 d-none d-md-block pt-3 bg-light-subtle">
            <div className="">
                <div className="x-dashboard-sidebar">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h5"><small>{ props.title }</small></h1>
                    </div>
            
                    <div>
                        { props.children }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNav;
