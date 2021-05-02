import React from 'react';

import UrlForm from '../../components/url-form';

import './style.css';

const HomePage: React.FunctionComponent = () => {
    return (
        <section className="section columns is-flex is-mobile is-flex-direction-column is-vcentered is-centered" style={{ height: "100%" }}>

            <div id="tagline" className="block">
                <p>a little url shortener</p>
            </div>

            <div className="box column is-four-fifths-mobile is-two-thirds-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd">
                <div className="">
                    <div className="">
                        <UrlForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage