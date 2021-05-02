package main

import (
    "fmt"
    "strings"
    "time"
)

type InMemory struct {
    data      map[string]ShortUrl
    generator AliasGenerator
}

func NewInMemory() InMemory {
    return InMemory{
        data:      make(map[string]ShortUrl),
        generator: &NanoIdGenerator{Size: 5},
    }
}

func (s *InMemory) Put(u ShortUrl) (ShortUrl, error) {
    if len(strings.TrimSpace(u.Alias)) == 0 {
        u.Alias = s.generateId()
    } else {
        _, found := s.Get(u.Alias)
        if found {
            return ShortUrl{}, fmt.Errorf("alias <%s> already exists", u.Alias)
        }
    }

    u.CreatedOn = time.Now().UTC()
    s.data[u.Alias] = u

    fmt.Println(u)
    fmt.Println(s.data)
    return u, nil
}

func (s *InMemory) List() []ShortUrl {
    urls := make([]ShortUrl, 0, len(s.data))
    for _, u := range s.data {
        urls = append(urls, u)
    }

    return urls
}

func (s *InMemory) Get(a string) (ShortUrl, bool) {
    u, ok := s.data[a]
    return u, ok
}

func (s *InMemory) Delete(a string) error {
    delete(s.data, a)
    return nil
}

func (s *InMemory) generateId() string {
    i := s.generator.Gen()
    _, found := s.Get(i)

    for found {
        i = s.generator.Gen()
        _, found = s.Get(i)
    }

    return i
}
