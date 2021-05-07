package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-contrib/location"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	config := config()
	r := gin.Default()
	if config.ReleaseMode {
		gin.SetMode("release")
	}
	r.Use(gzip.Gzip(gzip.DefaultCompression))
	r.Use(cors.Default())
	r.Use(location.Default())
	r.Use(static.Serve("/", static.LocalFile(config.StaticAssets, false)))
	handlers := HandlersFromConfig(config)
	r.GET("/:alias", handlers.Redirect)
	api := r.Group("api/urls/")
	{
		api.GET("/:alias", handlers.Get)
		api.POST("/", handlers.Shorten)
		api.GET("/", handlers.List)

	}
	r.Run()
}

type Config struct {
	Environment  string
	StaticAssets string
	HostName     string
	ReleaseMode  bool
}

func config() Config {
	environment := os.Getenv("ENVIRONMENT")
	if environment == "APP_ENGINE" {
		return Config{environment, "ui", "lttl.xyz", true}
	}
	return Config{environment, "../ui/build", "", false}
}

func (c *Config) hasHostName() bool {
	return c.HostName != ""
}

func HandlersFromConfig(c Config) Api {
	handlers := NewApiWithInMemoryStore()
	if c.hasHostName() {
		handlers = handlers.WithStaticHostName(c.HostName)
	}
	return handlers
}
