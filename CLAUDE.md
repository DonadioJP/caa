# Criação Animal Agroecológica (CAA)

Portal educativo, aberto e em português do Brasil sobre produção animal em bases agroecológicas, para produtores, estudantes, pesquisadores e extensionistas. Começa pela bovinocultura de leite a pasto e foi feito para crescer para outras espécies. Autor: João Pedro Donadio (JP), engenheiro agrônomo e pesquisador.

## Como trabalhar com o JP

- O JP escreve em inglês ou em português: responda na língua da mensagem dele.
- Todo o conteúdo do site, os comentários do código, os nomes de arquivos, pastas e variáveis são em **português do Brasil**.
- O JP faz doutorado e trabalha no portal quando pode, sem cronograma fixo. Prefira entregas pequenas e completas a grandes mudanças pela metade.
- Explique em linguagem simples o que mudou e como ver o resultado (`npm run dev`).
- Faça commits pequenos, com mensagem em português que diga o que mudou.

## Comandos

```bash
npm install        # uma vez, e sempre que package.json mudar
npm run dev        # site local em http://localhost:4321, mostra rascunhos
npm run check      # erros de tipo e de esquema: rode antes de cada commit
npm run build      # site final em dist/ + índice de busca (Pagefind)
npm run preview    # abre o site final; a busca só funciona aqui
node marca/gerar-marca.mjs   # regenera os SVGs da marca em public/marca/
node marca/gerar-png.cjs     # regenera os PNGs da marca (usa Playwright)
```

Antes de dar uma tarefa por concluída: `npm run check` sem erros e `npm run build` completo.

## Stack

Astro (site estático) + MDX, Reveal.js (aulas), rehype-citation (citações a partir de `bibliografia/biblioteca.bib`, exportado do Zotero), Pagefind (busca), fontes Alegreya e Alegreya Sans via @fontsource, Shinylive para as calculadoras em R. Node 22 ou mais novo.

## Estrutura e convenções

- **Um guia = uma pasta.** `src/content/guias/<seção>/<subseção>/<slug>/` contém `guia.mdx` (obrigatório), `aula.md` (slides), `roteiro.md` (roteiro do vídeo, não publicado) e `imagens/`. O caminho da pasta é o endereço do guia e define a seção; não repita isso no frontmatter.
- **Esquema** de todo o conteúdo: `src/content.config.ts`. Mudou um campo? Atualize o esquema, os guias existentes e o README.
- **Taxonomia**: `src/data/taxonomia.ts` define seções, guias planejados (`planejados`) e materiais (`materiais`: ferramentas, Open Machines, apresentações, histórias). O slug planejado deve ser igual ao nome da pasta do guia.
- **Mapa da página inicial**: destinos em `src/data/mapa.ts`, desenho em `src/components/marca/MapaPropriedade.astro`.
- **Calculadoras**: `src/data/ferramentas.yaml`; código R em `ferramentas-shiny/<id>/app.R`, exportado com shinylive para `public/ferramentas/<id>/`.
- **Componentes do guia** (usáveis no MDX sem importar): `Protocolo`, `Checklist`, `Dica`, `Caderno`, `Aviso`. Ficam em `src/components/guia/` e são registrados em `src/components/guia/index.ts`.
- **Painel de produção** em `/painel/`: compara o planejado com o publicado.
- Rascunhos (`rascunho: true`) aparecem só no `npm run dev`.

## Modelo de guia (definido pelo JP)

Ordem: cabeçalho (título, tags) → botões "Iniciar aula" e "Resumo em PDF" → **A ciência por trás** → **Práticas no campo** → **Exemplo real** → **Calculadora** → **Referências** → **Caderno de Campo** (opcional).

- *A ciência por trás*, com subestrutura fixa: Contexto e importância; Mecanismos; Resumo das evidências; Controvérsias, lacunas e limitações; Direções futuras.
- *Práticas no campo*: protocolos numerados, métodos e equipamentos, checklists, árvores de decisão, dicas, links para guias relacionados.
- *Exemplo real*: vídeo do CAATube, entrevista ou estudo de caso.
- *Referências*: tabela com título, achado principal e link (DOI). As citações no texto levam à referência.
- Cada guia tem "Em 1 minuto" (2 a 5 frases para o produtor) e um selo de evidência (`forte`, `moderada`, `limitada`, `posicionamento`).
- Um guia pode ser publicado só com texto e referências e ganhar aula, calculadora e vídeo depois.

**Aula** (Reveal.js): título → por que é importante → o que você vai aprender → temas → protocolos → pontos-chave → teste (1 múltipla escolha + 2 questões práticas) → agradecimentos. Título, destaques, pontos-chave, teste e agradecimentos são gerados do frontmatter de `aula.md`; o autor escreve só o miolo.

**Vídeo**: não é a gravação dos slides. O roteiro (`roteiro.md`) diz, por bloco, o que se fala e o que aparece na tela (campo, demonstração, entrevista).

**Resumo em PDF** (a fazer): título, mensagem científica principal, pontos práticos, um diagrama, link para o guia.

## Escrita

- *A ciência por trás*: terceira pessoa, formal e rigorosa, acessível a leigos sem perder profundidade. Perspectiva agroecológica sempre apoiada em evidências, deixando claro o que é posicionamento.
- Citações no formato (Autor et al., Ano), escritas como `[@chave]` (sintaxe Pandoc), com DOI ou link estável no `.bib`.
- Sempre indique quando a evidência é limitada.
- *Práticas no campo*: direto, verbos no imperativo.
- *Caderno de Campo*: o único lugar em primeira pessoa e em tom narrativo.
- Termos de campo do Brasil (piquete, PRV, recria, ordenha). Sem emoji. Sem pontos de exclamação.
- **Nunca invente referências, dados ou números.** Se faltar a fonte, deixe `[referência a confirmar]` e avise o JP. Textos de exemplo devem ser marcados como tal.

## Identidade visual

Conceito: **o corte da paisagem** (céu, pasto, solo). Tokens em `src/styles/global.css`, com temas Dia (claro) e Anoitecer (escuro).

- `--pasto` (verde) = marca e prática: botão principal, Em 1 minuto, Protocolo.
- `--ceu` (azul) = aprender: links, foco do teclado, aula, vídeo, teste, calculadora.
- `--terra` (marrom, terra roxa) = o campo: Dica, Checklist, Caderno de Campo, selo de evidência.
- `--sol` (âmbar) = só avisos.
- `--ilu-*` = só ilustração (símbolo, paisagem, mapa). Nunca texto.
- Títulos em Alegreya, texto em Alegreya Sans (19 px, entrelinha 1,6).
- Um raio (`--raio`, 8 px). Sem sombras, exceto o menu aberto. Sem barras coloridas no topo ou na lateral de cartões (exceto a borda do Aviso). Sem gradientes, sem emoji como ícone.
- Todo texto com contraste mínimo de 4,5:1 nos dois temas. Teste os dois temas e a largura de celular (400 px) a cada mudança visual.
- As aulas são sempre no tema claro.
- O desenho do símbolo e da paisagem fica em `marca/simbolo.mjs` e `marca/paisagem.mjs`. Não edite `public/marca/` à mão: rode os geradores.

## Público e acessibilidade

Produtores rurais no celular, com sinal fraco. Páginas leves, nada que dependa de JavaScript para o conteúdo principal, imagens otimizadas, alvos de toque grandes, navegação por teclado com foco visível.

## Código aberto (princípio do projeto)

- Conteúdo sob CC BY-SA 4.0, código sob GPL-3.0-or-later, fontes sob SIL OFL. Veja `LICENCAS.md`.
- **Só adicione dependências de código aberto**, com licença compatível (MIT, BSD, Apache-2.0, ISC, MPL, LGPL, GPL). Confira a licença antes de instalar e avise o JP.
- Nada de serviços proprietários de rastreamento, anúncios ou CDNs de terceiros para fontes e scripts: tudo é servido pelo próprio site.
- Imagens de terceiros só com licença aberta (CC BY, CC BY-SA, CC0, domínio público), com fonte e licença na legenda.
- Hospedagem prevista: Codeberg Pages (ou GitHub Pages). Vídeos no PeerTube (CAATube).

## Pendências

A lista atualizada fica no fim do `README.md`. Próximo passo combinado: completar o modelo de guia (PDF de resumo, tabela de referências com "achado principal", blocos Exemplo real e Árvore de decisão, Caderno de Campo no fim da página).
