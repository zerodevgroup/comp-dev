module.exports = {
  apps : [{
    name: "comp-dev-web",
    script: "server.js",
    args: "",
    instances: 4,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G"
  }]
}
