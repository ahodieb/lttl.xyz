import React from 'react';



const Footer: React.FunctionComponent = () => {
    return (
        <footer className="footer is-fixed-bottom">
            <div className="content has-text-centered ">
                <p className="is-size-6">
                    <span className="icon-text">
                        <span className="icon">
                            <svg className="svg-icon">
                                <use xlinkHref="#icon-code "></use>
                            </svg>
                        </span>
                        <span>A <a href="https://www.oreilly.com/library/view/apprenticeship-patterns/9780596806842/ch05s03.html" target="_blank" rel="noopener noreferrer">toy project</a> by: Abdallah Hodieb</span>
                    </span>
                </p>
                <p className="is-size-3">
                    <span className="px-3">
                        <a href="https://twitter.com/abdallahhodieb" target="_blank" rel="noopener noreferrer">
                            <svg className="svg-icon is-2">
                                <use xlinkHref="#icon-twitter"></use>
                            </svg>
                        </a>
                    </span>
                    <span className="px-3">
                        <a href="https://github.com/ahodieb/lttl.xyz" target="_blank" rel="noopener noreferrer">
                            <svg className="svg-icon is-">
                                <use xlinkHref="#icon-github"></use>
                            </svg>
                        </a>
                    </span>
                </p>
                <p className="is-size-7">
                    <a href='https://www.freepik.com/vectors/water'>"Whale" by catalyststuff - www.freepik.com</a>
                </p>
                <p className="is-size-7">
                    <a href='https://fontawesome.com/license'>Icons from fontawesome</a>
                </p>
            </div>
        </footer>);
}

export default Footer;


