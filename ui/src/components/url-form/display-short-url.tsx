import React, { FunctionComponent } from 'react';

import { ShortUrl } from '../../models';

interface DisplayShortUrlProps {
    shortUrl: ShortUrl;
    onClick: () => void;
}
const DisplayShortUrl: FunctionComponent<DisplayShortUrlProps> = ({ shortUrl, onClick }) => {
    const { url } = shortUrl;

    return (<div>
        <div className="field has-addons">
            <div className="control is-expanded">
                <input className="input is-medium" type="text" readOnly value={url} />
            </div>
            <div className="control">
                <button className="button is-medium is-themed" onClick={() => navigator.clipboard.writeText(url)} >
                    <span className="icon">
                        <svg className="svg-icon">
                            <use xlinkHref="#icon-copy "></use>
                        </svg>
                    </span>
                </button>
            </div>
        </div>

        <div className="control">
            <button className="button is-fullwidth is-themed is-medium" onClick={onClick}>Shorten another url</button>
        </div>
    </div>)
}

export default DisplayShortUrl;