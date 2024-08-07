import React from "react";

export interface FooterProps {
    fixed?: boolean;
}

const Footer: React.FunctionComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    // const classes: string = "x-footer" + (props.fixed ? " x-footer-fixed" : "");
    const classes: string = props.fixed ? "fixed-bottom" : "";
    return (
        <footer className={classes}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <hr />
                        <p className="text-center text-muted small">
                            Use this website at your own risk.  We do not guarantee the accuracy of the data and are not responsible for any losses or damages.
                            <br />
                            <a className="text-muted" href="https://github.com/blocksignalio">Source code</a>
                            &nbsp;·&nbsp;
                            <a className="text-muted" href="https://github.com/blocksignalio/core/blob/master/COPYING">License</a>
                            &nbsp;·&nbsp;
                            <a className="text-muted" href="mailto:yordanm@proton.me">Contact Us</a>
                        </p>
                    </div> 
                </div>
            </div>
        </footer>
    );
}

export default Footer;
