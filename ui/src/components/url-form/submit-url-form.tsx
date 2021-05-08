import React, { useState, FunctionComponent, ChangeEvent } from 'react';
import * as api from '../../api';
import { ShortUrl } from '../../models';

interface Props {
    callback: (url: ShortUrl) => void;
    onError: (message: string) => void;
}

const SubmitUrlForm: FunctionComponent<Props> = ({ callback, onError }) => {
    const [url, setUrl] = useState<string>("");
    const [alias, setAlias] = useState<string>("");

    const onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }

    const onAliasChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAlias(event.target.value);
    }

    const onSubmit = async () => {
        if (!url || url.trim().length <= 0) { return; }

        try {
            const shortUrl = await api.shortenUrl(url.trim(), alias);
            setUrl("");
            setAlias("");
            callback(shortUrl);
        } catch (e) {
            if (e.response && e.response.data.error) {
                onError(e.response.data.error);
            } else {
                onError("Something went wrong!");
            }
        }
    }

    return (
        <div>
            <label className="label is-medium">Url</label>
            <div className="field">
                <div className="control is-expanded">
                    <input className="input is-medium" value={url} type="url" placeholder="https://" onChange={onUrlChange} required />
                </div>
            </div>
            <label className="label is-medium">Customize</label>
            <div className="field has-addons">
                <p className="control ">
                    <a className="button is-static is-medium is-themed">lttl.xyz/</a>
                </p>
                <p className="control is-expanded">
                    <input className="input is-medium" value={alias} type="text" placeholder="alias" onChange={onAliasChange} />
                </p>
            </div>
            <div className="control">
                <button className="button is-fullwidth is-large is-themed" onClick={onSubmit}>Shorten</button>
            </div>
        </div>
    );
}

export default SubmitUrlForm;