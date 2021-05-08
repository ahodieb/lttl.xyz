import React, { useState } from 'react';

import UrlForm from '../../components/url-form';

const HomePage: React.FunctionComponent = () => {

    const [error, setError] = useState<string>("");
    const errorTag = error ? (
        <div className="box notification is-danger column is-four-fifths-mobile is-two-thirds-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd">
            <button className="delete" onClick={() => setError("")}></button>
            {error}
        </div>
    ) : (<div style={{ minHeight: "72px" }}></div>)

    return (
        <section className="section columns is-flex is-mobile is-flex-direction-column is-vcentered is-centered" style={{ height: "100%" }}>
            <img src="whale.svg" alt="A whale" style={{ height: "12.5em", marginTop: "5em", marginBottom: "1.5em" }} />
            {errorTag}
            <div className="box column is-four-fifths-mobile is-two-thirds-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd">
                <UrlForm onError={setError} />
            </div>
        </section>
    )
}

export default HomePage