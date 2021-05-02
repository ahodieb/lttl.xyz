package main

import (
    "github.com/gin-contrib/cors"
    "github.com/gin-contrib/gzip"
    "github.com/gin-contrib/location"
    "github.com/gin-contrib/static"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.Use(gzip.Gzip(gzip.DefaultCompression))
    r.Use(cors.Default())
    r.Use(location.Default())

    r.Use(static.Serve("/", static.LocalFile("../ui/build", false)))

    handlers := NewApiWithInMemoryStore()

    r.GET("/:alias", handlers.Redirect)
    api := r.Group("api/urls/")
    {
        api.GET("/:alias", handlers.Get)
        api.POST("/", handlers.Shorten)
        api.GET("/", handlers.List)

    }

    r.Run()
}
