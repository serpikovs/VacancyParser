# Парсер вакансий

### Описание

Созданное приложение при загрузке обращается к сайту https://ru.jooble.org/ и загружает вакансии и соответствующие им зарплаты с 3-х первых страниц. 
![Alt text](/screens/1.png)
Сводка зарплат по найденным вакансиям:
![Alt text](/screens/2.png)

### Установка и запуск

Открыть папку проекта редактором кода (например Visual Strudio Code), выполнить команды:

   npm i   
   npm start

перейти в браузере по адресу http://localhost:9000/   

### Использованные технологии

Сборка проекта - Webpack

Boilerplate - create-vanilla-js-app

UI - Bootstrap

Графики - Chart.io

### Особенности

Т.к. в современных браузерах используется технология CORS (https://developer.mozilla.org/ru/docs/Web/HTTP/CORS), которая ограничивает доступ к внешним доменам, был использован cors-proxy-webpack-plugin

В нашем случае, сайт https://ru.jooble.org/ является внешним по отношению к http://localhost:9000/ 
