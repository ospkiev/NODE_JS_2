1. Склонити репозиторій, перейти в папку /hw_4
2. npm i.
3. npm run build: frontend.
4. npm run dev, перейти в в папки /backen і /frontend і також виконати команду npm i.
Локально все працию
5. Повернутись в /hw_4, cбілдити образ командою - docker build -t brew-api --file docker/multi.Dockerfile .
6. Запустит застосунок - docker run -p 3000:3000 -e ENABLE_SWAGGER=true brew-api
Перейти на http://localhost:3000. Але сторінка /docs буде пуста, не можу зрозуміти чому локально в dev mode працію а після білда образу ні!