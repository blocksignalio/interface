import React from "react";
import AddressForm from "../components/AddressForm";
import "./MainPage.css";
import Footer from "../components/Footer";

const MainPage: React.FunctionComponent = (): JSX.Element => {
    // Thanks, textpaint.net!
    const logo: string = `\
██████╗ ██╗      ██████╗  ██████╗██╗  ██╗███████╗██╗ ██████╗ ███╗   ██╗ █████╗ ██╗
██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔════╝██║██╔════╝ ████╗  ██║██╔══██╗██║
██████╔╝██║     ██║   ██║██║     █████╔╝ ███████╗██║██║  ███╗██╔██╗ ██║███████║██║
██╔══██╗██║     ██║   ██║██║     ██╔═██╗ ╚════██║██║██║   ██║██║╚██╗██║██╔══██║██║
██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗███████║██║╚██████╔╝██║ ╚████║██║  ██║███████╗
╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝`;

    return (
        <>
            <div className="x-main-background d-flex align-items-center justify-content-center">
                <pre className="x-main-logo">
                    {logo}
                </pre>
            </div>
    
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col col-lg-6 x-main-mb">
                        <AddressForm />
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>

            <Footer fixed={true} />
        </>
    )
}

export default MainPage;
