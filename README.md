# Site RK Performance

Site one-page premium e dinâmico da RK Performance — fundo escuro, dourado metálico, mobile-first, com animações e imagens reais.

**🌐 Domínio:** [https://rkperformance.com.br](https://rkperformance.com.br)

## ✨ Funcionalidades Dinâmicas

- **Preloader animado** com barra de progresso e contagem
- **Hero interativa** — collage de imagens reais, animação de texto linha por linha, parallax no fundo
- **Marquee** — faixa animada com os serviços em scroll infinito
- **Contadores animados** — números que sobem ao entrar na tela (312%, 32x, etc.)
- **Processo horizontal** — seção de 5 passos com arrastar/scroll horizontal
- **Reveal on scroll** — tudo surge suavemente ao rolar (esquerda, direita, escala)
- **Hover effects** — imagens com parallax 3D, cards com elevação e linha dourada
- **Menu mobile fullscreen** com animação
- **FAQ acordeão** com animação suave
- **Botão flutuante WhatsApp** com efeito de hover
- **Imagens reais** via Unsplash (restaurantes, cozinhas, dashboards)

## 📞 Dados de contato configurados

| Canal | Valor |
|---|---|
| WhatsApp | `5542999246208` |
| Instagram | `@rkperformance.digital` |
| E-mail | `contato@rkperformance.com.br` |
| Domínio | `https://rkperformance.com.br` |

> ⚠️ Para alterar o WhatsApp, abra `index.html` e substitua todas as ocorrências de `5542999246208` pelo novo número no formato internacional (ex.: `5542999999999`).

## 🚀 Como publicar na Hostinger

### 1. Acesse o painel da Hostinger

1. Entre em [hPanel da Hostinger](https://hpanel.hostinger.com)
2. Vá em **Hospedagem** → selecione seu plano que contém `rkperformance.com.br`

### 2. Faça upload dos arquivos

1. No hPanel, abra **Gerenciador de Arquivos**
2. Navegue até `public_html`
3. Envie o arquivo `index.html` para dentro de `public_html` (substituindo o que existir)
4. Apague arquivos antigos se houver (ex.: `default.php`, `index.php`, etc.)

### 3. Configure o domínio (se ainda não estiver conectado)

Se o domínio `rkperformance.com.br` foi comprado na Hostinger, ele já estará apontado automaticamente. Se comprou em outro lugar, aponte os DNS:

- **Registro A:** `@` → IP do seu servidor Hostinger (mostrado no hPanel)
- **Registro CNAME:** `www` → `rkperformance.com.br`

### 4. Ative HTTPS

1. No hPanel, abra **SSL** (ou **Lets Encrypt**)
2. Clique em **Instalar SSL** para o domínio `rkperformance.com.br`
3. Após ativar, o site estará acessível em `https://rkperformance.com.br`

### 5. Verifique o site

- Acesse `https://rkperformance.com.br`
- Teste os links do WhatsApp (devem abrir com o número `5542999246208`)
- Teste o menu mobile e as animações
- Verifique no Google Search Console se o domínio está indexado

## 🎨 Personalização rápida

| O que mudar | Onde |
|---|---|
| Número WhatsApp | Buscar `5542999246208` (formato internacional) |
| Preços dos pacotes | Seção `Pacotes` no HTML |
| Instagram | Link já aponta para `@rkperformance.digital` |
| Imagens de fundo | URLs do Unsplash em `https://images.unsplash.com/...` |
| Textos | Todo o conteúdo está no próprio `index.html` |

## 📁 Estrutura

```
site/
├── index.html    (site completo — HTML + CSS + JS inline)
├── server.js     (servidor Node.js/Express para preview local)
├── package.json  (dependências — express)
├── .gitignore    (node_modules, logs, .env)
└── README.md     (este arquivo)
```

## 🖥️ Como rodar localmente

```bash
cd site
npm install        # primeira vez apenas
npm start          # sobe em http://localhost:3000
```
