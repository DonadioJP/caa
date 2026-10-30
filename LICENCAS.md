# Licenças

Criação Animal Agroecológica é um projeto aberto. Tudo aqui pode ser usado, estudado, adaptado e compartilhado, desde que as obras derivadas continuem abertas e citem a fonte.

| O quê | Onde | Licença |
|---|---|---|
| **Conteúdo**: textos dos guias, aulas, roteiros, Caderno de Campo, figuras, marca (símbolo, assinaturas, paisagem, mapa) | `src/content/`, `public/marca/`, `marca/` (desenhos) | [CC BY-SA 4.0](LICENSES/CC-BY-SA-4.0.txt) |
| **Código**: site, componentes, scripts, ferramentas Shiny | todo o resto | [GPL-3.0-or-later](LICENSES/GPL-3.0-or-later.txt) |
| **Fontes** Alegreya e Alegreya Sans (Huerta Tipográfica) | `node_modules/@fontsource*`, servidas pelo site | [SIL OFL 1.1](LICENSES/OFL-1.1-Alegreya.txt) |
| **Estilo de citação** APA e termos em pt-BR (Citation Style Language) | `bibliografia/*.csl`, `*.xml` | CC BY-SA 3.0 (indicado em cada arquivo) |
| **Referências** (`biblioteca.bib`) | `bibliografia/` | dados bibliográficos, sem restrição |

As duas licenças principais conversam entre si: a CC BY-SA 4.0 é compatível, em mão única, com a GPLv3, então trechos de conteúdo podem entrar em código GPL.

## Como citar ou reutilizar

> Donadio, J. P. *Criação Animal Agroecológica* — [título do guia]. Licença CC BY-SA 4.0. [endereço do guia]

Ao adaptar um guia: mantenha o crédito, indique o que mudou e publique sua versão sob CC BY-SA 4.0.

## Imagens de terceiros

Toda imagem ou gráfico de outra fonte precisa de licença compatível (CC BY, CC BY-SA, CC0 ou domínio público) ou de permissão escrita. Registre a fonte e a licença na legenda da figura. Imagens sob CC BY-NC ou "todos os direitos reservados" não entram no portal.

## Dependências

Todo o software usado para construir e publicar o portal é de código aberto. Auditoria de licenças das dependências (out/2026): MIT, BSD, ISC, Apache-2.0, MPL-2.0, BlueOak, CC0, LGPL-3.0 (biblioteca de imagens libvips) e CPAL/AGPL (citeproc-js, que formata as citações). Para refazer:

```bash
npx license-checker --production --summary
```

## Ferramentas do fluxo de trabalho

Todo o fluxo, da escrita à publicação, usa software livre:

| Etapa | Ferramenta | Licença |
|---|---|---|
| Site | Astro, MDX, Pagefind (busca) | MIT |
| Aulas | Reveal.js | MIT |
| Resumos em PDF | Playwright + Chromium; qrcode-generator (QR code) | Apache-2.0 + BSD-3-Clause; MIT |
| Citações | Zotero + Better BibTeX; citeproc-js | AGPL-3.0; MIT; CPAL/AGPL |
| Calculadoras | R, Shiny, Shinylive (roda no navegador, sem servidor) | GPL; GPL-3; MIT |
| Editor | VSCodium | MIT |
| Imagens e diagramas | Inkscape, GIMP, draw.io | GPL; GPL; Apache-2.0 |
| Vídeo | OBS Studio, Kdenlive ou Shotcut, Audacity | GPL |
| Hospedagem de vídeo | PeerTube (CAATube) | AGPL-3.0 |
| Código e site no ar | Codeberg (Forgejo) + Codeberg Pages, ou GitHub Pages | Forgejo: GPL-3.0 |
| Estatísticas de visita (opcional) | nenhuma, ou Umami auto-hospedado, sem cookies | MIT |
