# Projeto Mapa do bairro

## Índice

-   [Visão geral do projeto](#visão-geral-do-projeto)
-   [Servidor Backend](#servidor-backend)
-   [Recursos usado](#recursos-usado)

## Visão geral do projeto

Projeto Mapa do bairro é um aplicativo de página única apresentando um mapa de seu bairro ou de um bairro que gostaria de visitar. Depois, você vai adicionar recursos a esse mapa, incluindo locais em destaque, dados de terceiros sobre esses locais e diversas formas de navegar pelo conteúdo.

## Servidor Backend

O servidor feito em express é responsável por fazer a busca dos dados consultado a API Yelp com segurança sem expor a API KEY no lado do cliente.

### `GET /api/info-location`

```json
{
    "id": "E8RJkjfdcwgtyoPMjQ_Olg",
    "alias": "four-barrel-coffee-san-francisco",
    "name": "Four Barrel Coffee",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/E17wpmhnO4bwfT_MVgaIJw/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco?adjust_creative=SievNtXqfMhXBryNjcG8Iw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=SievNtXqfMhXBryNjcG8Iw",
    "review_count": 2026,
    "categories": [
        {
            "alias": "coffee",
            "title": "Coffee & Tea"
        }
    ]
    ...
}
```

## Recursos usado

-   [Eslint](https://eslint.org/) para controle da qualidade do código.
-   [Prettier](https://prettier.io/) para formatar código.
-   [webpack](https://webpack.js.org/) para executar as tarefas de compilar o js, css e instanciar um servidor de desenolvimento.
-   [React](https://reactjs.org/) Uma biblioteca JavaScript para construir interfaces com o usuário.
-   [Express](https://expressjs.com/pt-br/) O Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móvel.
-   [Yelp](https://www.yelp.com/developers) API Restful para pesquisar e recuperar dados dos lugares.
