package main

import (
    "encoding/json"
    "fmt"
    "time"
)

type ShortUrl struct {
    Target    string
    Alias     string
    CreatedOn time.Time

    hostname string
}

func (u ShortUrl) MarshalJSON() ([]byte, error) {
    j := struct {
        Url       string `json:"url"`
        Target    string `json:"targetUrl"`
        Alias     string `json:"alias"`
        CreatedOn int64  `json:"createdOn"`
    }{
        Url:       u.Url(),
        Target:    u.Target,
        Alias:     u.Alias,
        CreatedOn: u.CreatedOn.Unix(),
    }

    return json.Marshal(j)
}

func (u ShortUrl) WithHostname(h string) ShortUrl {
    u.hostname = h
    return u
}

func (u ShortUrl) Url() string {
    return fmt.Sprintf("%s/%s", u.hostname, u.Alias)
}
