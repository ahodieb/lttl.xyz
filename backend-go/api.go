package main

import (
    "github.com/gin-contrib/location"
    "github.com/gin-gonic/gin"
    "net/http"
)

type Api struct {
    Store Store
}

func NewApiWithInMemoryStore() Api {
    store := NewInMemory()
    return Api{&store}
}

func (a *Api) Get(c *gin.Context) {
    alias := c.Param("alias")
    url, found := a.Store.Get(alias)

    if found {
        c.JSON(http.StatusOK, url)
    } else {
        c.AbortWithStatus(http.StatusNotFound)
    }
}

func (a *Api) Shorten(c *gin.Context) {
    var req struct {
        Url   string `json:"url" binding:"required"`
        Alias string
    }

    c.BindJSON(&req)

    hostname := location.Get(c).String()
    shortUrl, err := a.Store.Put(ShortUrl{Target: req.Url, Alias: req.Alias}.WithHostname(hostname))

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err})
        return
    }

    c.JSON(http.StatusCreated, shortUrl)
}

func (a *Api) List(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"urls": a.Store.List()})
}

func (a *Api) Redirect(c *gin.Context) {
    alias := c.Param("alias")
    url, found := a.Store.Get(alias)

    if !found {
        c.AbortWithStatus(http.StatusNotFound)
        return
    }

    c.Redirect(http.StatusPermanentRedirect, url.Target)
}
