package main

import (
	"net/http"
	"net/url"
	"strings"

	"github.com/gin-contrib/location"
	"github.com/gin-gonic/gin"
)

type HostNameResolver interface {
	Resolve(c *gin.Context) string
}

type Api struct {
	Store            Store
	hostnameResolver HostNameResolver
}

type fromLocation struct{}

func (r *fromLocation) Resolve(c *gin.Context) string {
	return location.Get(c).String()
}

type staticHostName struct {
	hostname string
}

func (r *staticHostName) Resolve(c *gin.Context) string {
	return r.hostname
}

func NewApiWithInMemoryStore() Api {
	store := NewInMemory()
	return Api{&store, &fromLocation{}}
}

func (a *Api) WithStaticHostName(hostname string) Api {
	return Api{a.Store, &staticHostName{hostname}}
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

	u, valid := parseUrl(req.Url)

	if !valid {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid url", "url": req.Url})
		return
	}

	if strings.HasSuffix(u.Host, "lttl.xyz") {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blocked url", "url": req.Url})
		return
	}

	hostname := a.hostnameResolver.Resolve(c)
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

func parseUrl(uri string) (*url.URL, bool) {
	_, err := url.ParseRequestURI(uri)
	if err != nil {
		return nil, false
	}

	u, err := url.Parse(uri)
	if err != nil || u.Scheme == "" || u.Host == "" {
		return nil, false
	}

	return u, true
}
