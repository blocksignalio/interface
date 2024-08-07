import React from "react";
import type { Location } from "@remix-run/router";
import { Link, useLocation } from "react-router-dom";

interface PaginationProps {
}

export interface DashboardMainProps {
    title: string | JSX.Element;
    buttons?: React.ReactNode;
    children: React.ReactNode;
}

function getCurrentPage(location: Location): number {
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    const currentPage: number = parseInt(searchParams.get("page") ?? "0", 10) || 0;
    return currentPage;
}

function makeURL(location: Location, page: number): string {
    page = Math.max(0, page);
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    searchParams.set("page", "" + page);
    const url: string = `${location.pathname}?${searchParams.toString()}`;
    return url;
}

const Pagination: React.FunctionComponent<PaginationProps> = (_props: PaginationProps): JSX.Element => {
    const location: Location = useLocation();
    const current: number = getCurrentPage(location);

    function maybeButton(delta: number, label?: JSX.Element): JSX.Element {
        const nextPage: number = current + delta;
        if (nextPage < 0) {
            return <></>;
        }
        const url: string = makeURL(location, nextPage);
        return (
            <Link className="btn btn-sm btn-outline-secondary" to={ url }>
                { label ?? nextPage }
            </Link>
        );
    }

    return (
        <div className="btn-group me-2">
            { maybeButton(-1, <span aria-hidden="true">&laquo;</span>) }
            { maybeButton(-2) }
            { maybeButton(-1) }
            <button className="btn btn-sm btn-outline-secondary" disabled>{ current }</button>
            { maybeButton(+1) }            
            { maybeButton(+2) }
            { maybeButton(+1, <span aria-hidden="true">&raquo;</span>) }
        </div>
    );
}

const DashboardMain: React.FunctionComponent<DashboardMainProps> = (props: DashboardMainProps): JSX.Element => {
    return (
        <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4" role="main">

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h5">{ props.title }</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Pagination />
                    { props.buttons }
                </div>
            </div>
            { props.children }
        </main>
    );
}

export default DashboardMain;
