import React, { FunctionComponent, useState } from 'react';

import { ShortUrl } from '../../models';

import DisplayShortUrl from './display-short-url';
import SubmitUrlForm from './submit-url-form';

interface UrlFormProps {
    onError: (message: string) => void;
}

const UrlForm: FunctionComponent<UrlFormProps> = ({ onError }) => {
    const [shortUrl, setShortUrl] = useState<ShortUrl | undefined>(undefined);
    const clear = () => { setShortUrl(undefined) }

    if (shortUrl) {
        return <DisplayShortUrl shortUrl={shortUrl} onClick={clear} />
    }

    return <SubmitUrlForm callback={setShortUrl} onError={onError} />
}

export default UrlForm;