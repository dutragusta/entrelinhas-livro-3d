# Entrelinhas — livro 3D

Homepage demonstrativa e responsiva para o projeto Entrelinhas, com livro em CSS 3D, animação flutuante, interação de abrir/fechar capa, inclinação com mouse e ajustes para dispositivos móveis.

## Testar no Windows
1. Baixe ou clone o repositório.
2. Abra a pasta no Visual Studio Code.
3. Abra `index.html` diretamente no navegador ou use a extensão Live Server.
4. As fontes do Google Fonts dependem de conexão com a internet.

## Arquivos
- `index.html`: estrutura e conteúdo.
- `style.css`: visual, animação e responsividade.
- `script.js`: interações do livro.
- `.github/workflows/pages.yml`: publicação automática pelo GitHub Pages.

## Publicar
Em **Settings → Pages**, escolha **GitHub Actions** como fonte de publicação. Depois, acompanhe o workflow na aba **Actions**.

## Observação
Esta demo usa CSS 3D e alterna entre a capa e uma página interna; não é uma reprodução exata do shader WebGL do site de referência.