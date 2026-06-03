# 💖 Nosso Amor - Site Romântico

Um template de site romântico, interativo e altamente personalizável, construído para celebrar relacionamentos, criar memórias inesquecíveis e surpreender quem você ama. Ideal para presentear em aniversários de namoro, Dia dos Namorados, pedidos de casamento ou apenas para demonstrar seu amor.

## ✨ Funcionalidades

O site é repleto de seções interativas e emocionantes:

- **📸 Hero & Header:** Tela inicial deslumbrante com partículas interativas (corações que seguem o cursor) e uma frase de impacto.
- **⏱️ Contador de Tempo:** Mostra com precisão há quanto tempo vocês estão juntos (anos, meses, dias, horas, minutos e segundos).
- **⏳ Linha do Tempo:** Uma jornada visual pelos marcos mais importantes do relacionamento (O primeiro beijo, pedido de namoro, viagens, etc).
- **💌 Cartas de Amor:** "Abra quando..." - pequenas cartas virtuais para diferentes momentos (quando estiver triste, com saudade, etc).
- **🎲 Sorteador de Encontros (Vale-Date):** Um gerador interativo de ideias aleatórias para o próximo encontro do casal.
- **✨ Motivos para Amar:** Uma grade (bento-grid) elegante revelando os motivos que tornam a pessoa especial.
- **🖼️ Galeria de Fotos:** Mosaico de fotos que marcam a história de vocês, com animações suaves e imersivas.
- **🎵 Trilha Sonora (Spotify & Áudio Direto):** Player de música flutuante que suporta integração nativa com playlists do Spotify ou arquivos de áudio (MP3).

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/)** + **[Vite](https://vitejs.dev/)** - Framework e Bundler de alta performance.
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para um código mais seguro.
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização modular, responsiva e elegante.
- **[Framer Motion](https://www.framer.com/motion/)** - Animações fluidas, interações de entrada, scroll e hover.
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones bonitos e consistentes.

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/nosso-amor.git
   cd nosso-amor
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no seu navegador:**
   Abra `http://localhost:3000` (ou a porta informada no terminal) para ver o projeto rodando.

## ⚙️ Como Personalizar

O projeto foi criado para ser **facilmente customizável** por qualquer pessoa, sem precisar mexer na lógica pesada dos componentes.

Todo o conteúdo (textos, datas, links de fotos e músicas) está centralizado no arquivo `src/config.ts`. 

Basta abrir esse arquivo e editar o que desejar:
- `couple`: Nomes do casal.
- `startDate`: A data do início do relacionamento (Ano, Mês, Dia).
- `timeline`: Edite, adicione ou remova marcos da linha do tempo.
- `letters`: Modifique as cartas de amor interativas.
- `photos`: Substitua os links pelas fotos de vocês.
- `spotifyPlaylistId`: Coloque o ID da playlist do Spotify de vocês.

## 📦 Build e Deploy na Vercel

O projeto está configurado para ser feito o deploy rapidamente na Vercel e puxar as imagens românticas diretamente da API do Pexels.

### Configurando o Pexels na Vercel:
Para que as imagens apareçam corretamente no seu deploy da Vercel:
1. Vá até o seu painel do projeto na Vercel e acesse **Settings** > **Environment Variables**.
2. Adicione uma variável com o nome: `PEXELS_API_KEY`
3. O valor deve ser a sua chave de API gerada no site do Pexels.
4. Clique em **Save** e em seguida faça um novo deploy (vá em **Deployments** e clique em **Redeploy** no último).

*Isso acontece porque foi criada uma função Serverless dedicada (`api/photos.js`) para garantir que sua chave não vaze.*

Para gerar a versão otimizada pronta para hospedagem de outro local:

```bash
npm run build
```
Os arquivos otimizados estarão na pasta `dist/`.

## 📄 Licença

Este projeto é desenvolvido para fins pessoais. Fique à vontade para fazer um fork, personalizar e presentear o seu amor!
