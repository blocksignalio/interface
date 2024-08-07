import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FunctionComponent = (_props: {}): JSX.Element => {
    const error: any = useRouteError();
    const message: string = "" + (error.statusText || error.message);

    return (
        <div className="position-absolute top-50 start-50 translate-middle" id="error-page">
            <h1 className="text-center">Oops!</h1>
            <p className="text-center">Sorry, an unexpected error has occurred.</p>
            <p className="text-center">
                <i>{message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;
