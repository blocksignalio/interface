import React from 'react';
import ReactDOM from 'react-dom/client';
import { ActionFunctionArgs, Router } from '@remix-run/router';
import { Outlet, RouterProvider, createHashRouter, redirect } from 'react-router-dom';

import ContractPage, { loader as contractLoader } from './routes/ContractPage.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import MainPage from './routes/MainPage.tsx'

// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

async function action(args: ActionFunctionArgs): Promise<Response | null> {
    const input: FormData = await args.request.formData();
    const address: string = "" + input.get("address");
    return redirect(`/contract/${address}`);
}

const router: Router = createHashRouter([{
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [{
        index: true,
        element: <MainPage />,
        action,
    }, {
        path: "/contract/:address",
        element: <ContractPage />,
        loader: contractLoader,
    }],
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={ router } />
    </React.StrictMode>
);
