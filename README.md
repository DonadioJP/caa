# Criação Animal Agroecológica

> Projeto aberto. Conteúdo sob **CC BY-SA 4.0**, código sob **GPL-3.0-or-later**, fontes sob **SIL OFL**. Detalhes em [LICENCAS.md](LICENCAS.md); para participar, veja [CONTRIBUINDO.md](CONTRIBUINDO.md).

Portal educativo sobre produção animal em bases agroecológicas.
Feito com [Astro](https://astro.build): o conteúdo é escrito em Markdown/MDX, e o site é gerado como páginas estáticas, leves e rápidas no celular.

## Rodar no computador

```bash
npm install
npm run dev        # site local em http://localhost:4321, mostra rascunhos
npm run build      # gera o site final em dist/ + índice de busca
npm run preview    # abre o site final (a busca só funciona aqui)
npm run check      # confere erros de tipo e de esquema
```

## Estrutura

```
caa/
├── bibliografia/
│   ├── biblioteca.bib         ← exportação automática do Zotero (Better BibTeX)
│   ├── apa.csl                ← estilo de citação
│   └── locales-pt-BR.xml      ← termos em português ("et al.", "In", etc.)
├── ferramentas-shiny/         ← código R das calculadoras (exportadas com shinylive)
├── public/                    ← arquivos servidos como estão (favicon, ferramentas, PDFs)
└── src/
    ├── content.config.ts      ← ESQUEMA: os campos de cada tipo de conteúdo
    ├── data/
    │   ├── taxonomia.ts       ← árvore de seções + guias planejados
    │   └── ferramentas.yaml   ← lista de calculadoras
    ├── content/
    │   ├── guias/             ← um guia = uma pasta (veja abaixo)
    │   ├── caderno/           ← entradas avulsas do Caderno de Campo
    │   └── builds/            ← Open Machines
    ├── components/guia/       ← Protocolo, Checklist, Dica, Caderno, Quiz…
    ├── layouts/               ← Base (todas as páginas) e Guia (template do guia)
    ├── lib/                   ← funções auxiliares
    ├── pages/                 ← rotas do site
    └── styles/                ← paleta e tema das aulas
```

## Um guia = uma pasta

O caminho da pasta é o endereço do guia **e** define a seção. Não é preciso repetir área, sistema ou categoria no frontmatter.

```
src/content/guias/producao/bovinocultura-leite/bezerras/colostro/
├── guia.mdx       → a página do guia                      (obrigatório)
├── aula.md        → os slides da aula                     (opcional)
├── roteiro.md     → roteiro do vídeo, não é publicado     (opcional)
└── imagens/       → figuras usadas no guia e na aula
```

Endereços gerados:

- Guia: `/producao/bovinocultura-leite/bezerras/colostro/`
- Aula: `/aulas/producao/bovinocultura-leite/bezerras/colostro/`

### guia.mdx

Campos principais do frontmatter (a lista completa está em `src/content.config.ts`):

| Campo | O que é |
|---|---|
| `titulo`, `descricao` | Título e 1–2 frases de resumo |
| `emUmMinuto` | 2 a 5 pontos essenciais, para o produtor |
| `evidencia` | `forte`, `moderada`, `limitada` ou `posicionamento` |
| `nivel` | `introdutorio`, `intermediario` ou `avancado` |
| `tags` | Viram páginas `/tags/<tag>/` |
| `video` | Status, formato e URL do PeerTube (independente da aula) |
| `calculadora` | id de uma ferramenta em `ferramentas.yaml` |
| `relacionados`, `builds` | Ligações com outros guias e Open Machines |
| `rascunho: true` | Aparece só no `npm run dev` |

No corpo, use os componentes sem importar nada:

```mdx
<Protocolo titulo="Fornecimento de colostro">
1. Primeiro passo
2. Segundo passo
</Protocolo>

<Checklist titulo="Antes de fornecer">
- Item que o leitor pode marcar no celular
</Checklist>

<Dica>Truque de campo.</Dica>

<Caderno>Reflexão em primeira pessoa.</Caderno>
```

Citações como no Quarto: `[@godden2008]`. As referências citadas aparecem automaticamente no fim da página.

### aula.md — slides

Você escreve só o miolo. Separe os slides com uma linha `---` entre linhas em branco. O **primeiro** slide que você escreve é o "Por que é importante?". Notas do apresentador começam com `Note:`.

Os slides de título, "O que você vai aprender", pontos-chave, teste de conhecimento e agradecimentos são gerados a partir do frontmatter, e o mesmo teste aparece também na página do guia.

Na apresentação: **F** = tela cheia, **S** = notas do apresentador, **Esc** = visão geral.

### roteiro.md — vídeo

O vídeo **não** é a gravação dos slides. Ele conta o tema com outra linguagem: campo, demonstração, entrevista ou você explicando para a câmera. O roteiro tem, para cada bloco, o que você **fala** e o que aparece **na tela**, e lista as imagens a captar (`imagensNecessarias`).

Quando o vídeo estiver no PeerTube, atualize o guia:

```yaml
video:
  status: publicado
  formato: campo
  url: https://<instancia>/videos/embed/<id>
  duracao: "6:40"
```

## Identidade visual

O conceito é **o corte da paisagem**: céu, pasto e solo. Cada camada tem uma função na interface:

| Camada | Token | Função |
|---|---|---|
| Pasto (verde) | `--pasto` | a marca e a prática: botão, "Em 1 minuto", Protocolo |
| Céu (azul) | `--ceu` | aprender: links, aula, vídeo, teste, calculadora |
| Terra (marrom) | `--terra` | o campo: Dica, Checklist, Caderno, selo de evidência |
| Sol (âmbar) | `--sol` | só avisos |

- Cores, fontes e escala: `src/styles/global.css` (temas Dia e Anoitecer). Todo texto passa contraste AA.
- Fontes: Alegreya (títulos) e Alegreya Sans (texto), servidas pelo próprio site.
- O desenho do símbolo e da paisagem fica em `marca/simbolo.mjs` e `marca/paisagem.mjs`; o site e os arquivos da marca usam o mesmo desenho.
- Para regenerar os arquivos da marca em `public/marca/` e o favicon:

```bash
node marca/gerar-marca.mjs   # SVGs (texto em contornos)
node marca/gerar-png.cjs     # PNGs (ícone 180/512, assinaturas)
```

## Mapa da propriedade (página inicial)

A paisagem da página inicial é um mapa clicável (`src/components/marca/MapaPropriedade.astro`). Os destinos ficam em `src/data/mapa.ts`:

| Elemento | Seção |
|---|---|
| Sol e nuvem | Clima e Ambiente |
| Casa | Gestão, Economia e Sociedade |
| Galpão e silo | Infraestrutura e Equipamentos |
| Árvore | Árvores e Sistemas Silvipastoris |
| Vaca | Bovinocultura de Leite a Pasto |
| Bezerra | Bezerras |
| Cerca elétrica | Manejo do Pastoreio |
| Pasto | Pastagens e Forragem |
| Açude | Água |
| Área degradada com muda | Restauração Ecológica |
| Solo | Solo |
| Raízes da árvore | Fundamentos |

Nome, descrição e contagem de guias aparecem sozinhos, vindos de `taxonomia.ts`. Para mudar um destino, troque o `caminho` em `mapa.ts`; para mover um marcador, troque `pino`.

Mouse: passar por cima mostra o resumo. Toque: o primeiro toque mostra o resumo, o segundo abre. Teclado: Tab percorre os elementos, Enter abre. No celular o desenho desliza para os lados.

## Completude dos guias

Cada guia mostra o que já tem: **Texto · Aula · Calculadora · Vídeo**. Um guia pode ser publicado só com texto e referências e ganhar o resto depois.

O **painel de produção** em `/painel/` compara os guias planejados (em `taxonomia.ts`) com o que já existe. Para que um guia planejado seja reconhecido, o nome da pasta deve ser igual ao slug planejado.

## Novo guia, passo a passo

1. Crie a pasta na seção certa, com o nome do slug planejado.
2. Copie `guia.mdx` de um guia existente e preencha.
3. Adicione as referências no Zotero (vão para `biblioteca.bib` sozinhas).
4. Rode `npm run dev` e confira.
5. Quando der: `aula.md`, depois `roteiro.md`, depois o vídeo.

## Pendências

- [ ] Template do resumo em PDF
- [ ] Componente de árvore de decisão
- [ ] Primeira calculadora (colostro)
- [ ] Repositório público e hospedagem aberta (Codeberg + Codeberg Pages, ou GitHub Pages)
- [ ] Escolher a instância do PeerTube para o CAATube
- [ ] Configurar exportação automática do Zotero para `bibliografia/biblioteca.bib`
- [ ] Substituir o conteúdo de exemplo do guia de colostro
