import React from "react";
import Header from "./Header";

interface DashboardProps {
    children: React.ReactNode;
}

const Dashboard: React.FunctionComponent<DashboardProps> = ({ children }: DashboardProps): JSX.Element => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    {children}
                </div>
            </div>

        </>
    );
};

export default Dashboard;
