# Ferramentas Shiny

Cada ferramenta numa pasta própria (`<id>/app.R`), com o mesmo `id` usado em
`src/data/ferramentas.yaml`.

Para publicar uma ferramenta como app que roda no navegador (sem servidor Shiny):

```r
# install.packages("shinylive")
shinylive::export("ferramentas-shiny/planejador-prv", "public/ferramentas/planejador-prv")
```

Depois mude o `status` da ferramenta para `pronta` em `src/data/ferramentas.yaml`.
