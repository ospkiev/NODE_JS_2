Посилання на образи в DockerHub

1. https://hub.docker.com/repository/docker/karpenkopd/redis-like/general
2. https://hub.docker.com/repository/docker/karpenkopd/kv/general

## Як запустити додатки

1. Сколнити репозиторій https://github.com/ospkiev/NODE_JS_2/tree/main/hw_3, перейти в папку /hw_3
2. Підняти (запустити) Docker daemon на власній машині.
3. Виконати команду docker-compose  up --build
4. Зробити POST запит - 
curl -X POST http://localhost:8080/kv   -H "Content-Type: application/json"   -d '{"key":"foo","value":"bar"}'
5. Зробити GET запит -
curl http://localhost:8080/kv/foo


