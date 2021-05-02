package main

import nanoid "github.com/matoous/go-nanoid/v2"

type AliasGenerator interface {
    Gen() string
}

type NanoIdGenerator struct {
    Size int
}

func (g *NanoIdGenerator) Gen() string {
    id, err := nanoid.New(g.Size)
    if err != nil {
        return ""
    }

    return id
}
