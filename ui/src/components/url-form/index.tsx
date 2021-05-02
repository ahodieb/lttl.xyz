import React, { FunctionComponent, useState } from 'react';

import { ShortUrl } from '../../models';

import DisplayShortUrl from './display-short-url';
import SubmitUrlForm from './submit-url-form';

const UrlForm: FunctionComponent = () => {
    const [shortUrl, setShortUrl] = useState<ShortUrl | undefined>(undefined);
    const clear = () => { setShortUrl(undefined) }

    if (shortUrl) {
        return <DisplayShortUrl shortUrl={shortUrl} onClick={clear} />
    }

    return <SubmitUrlForm callback={setShortUrl} />
}

export default UrlForm;