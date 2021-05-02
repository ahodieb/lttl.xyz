import React from 'react';



const Footer: React.FunctionComponent = () => {
    return (
        <footer className="footer is-fixed-bottom">
            <div className="content has-text-centered ">
                <p className="is-size-6">
                    <span className="icon-text">
                        <span className="icon">
                            <i className="fas fa-laptop-code"></i>
                        </span>
                        <span>A <a href="https://www.oreilly.com/library/view/apprenticeship-patterns/9780596806842/ch05s03.html" target="_blank" rel="noopener noreferrer">toy project</a> by: Abdallah Hodieb</span>
                    </span>
                </p>
                <p className="is-size-3">
                    <span className="px-3">
                        <a href="http://github.com/ahodieb" target="_blank" rel="noopener noreferrer">
                            <span className="icon">
                                <i className="fab fa-github"></i>
                            </span>
                        </a>
                    </span>

                    <span className="px-3">
                        <a href="http://github.com/ahodieb" target="_blank" rel="noopener noreferrer">
                            <span className="icon">

                                <i className="fab fa-twitter"></i>
                            </span>
                        </a>
                    </span>
                </p>

                <p className="is-size-7">
                    <span className="icon is-size-6">
                        <i className="fas fa-cat"></i>
                    </span>
                    <a href='https://www.getillustrations.com/single-illustration/Explore-Travel-Web-Online-Space-Cat'>Abstrike illustrations</a>
                </p>
            </div>

        </footer>);
}

export default Footer;


