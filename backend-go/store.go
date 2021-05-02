package main

type Store interface {
    Get(a string) (ShortUrl, bool)
    Delete(a string) error
    Put(u ShortUrl) (ShortUrl, error)
    List() []ShortUrl
}
