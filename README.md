---
# Monitor de Investimentos Inteligente

Este projeto é um monitor de investimentos em tempo real, desenvolvido para fornecer uma visão clara e concisa dos principais ativos do mercado. Ele exibe informações como preço atual, variação percentual, mínimas e máximas de 52 semanas, e identifica oportunidades de compra com base em critérios pré-definidos.

## Funcionalidades

- **Dashboard em Tempo Real**: Visualização limpa e moderna dos principais ativos da B3.
- **Indicadores Chave**: Preço atual, variação percentual, e o intervalo de 52 semanas (mínima e máxima).
- **Análise de Oportunidades**: O sistema identifica automaticamente ativos que estão próximos de suas mínimas históricas como potenciais oportunidades.
- **Design Responsivo**: O dashboard se adapta perfeitamente a diferentes tamanhos de tela (desktop e mobile).

## Tecnologias Utilizadas

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express, Axios
- **Dados**: API brapi.dev para dados de mercado em tempo real

## Estrutura do Projeto

```
investment-monitor/
├── backend/ # Servidor Node.js (API)
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── Procfile
├── frontend/ # Aplicação React (UI)
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vercel.json
└── README.md
```

## Como Rodar Localmente

Para rodar o projeto em sua máquina local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd investment-monitor
    ```

2.  **Configurar e Iniciar o Backend:**
    ```bash
    cd backend
    npm install
    node index.js
    ```
    O backend estará rodando em `http://localhost:3001`.

3.  **Configurar e Iniciar o Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```
    O frontend estará rodando em `http://localhost:5173` (ou outra porta disponível).

    **Nota**: Certifique-se de que o backend esteja rodando antes de iniciar o frontend, pois o frontend tentará se conectar a ele.

## Deploy em Produção

Para colocar o Monitor de Investimentos online permanentemente, você pode usar serviços de hospedagem como Vercel para o frontend e Render para o backend.

### Deploy do Backend (Render)

1.  **Crie uma conta no Render**: Se você ainda não tem uma, crie uma conta gratuita em [render.com](https://render.com/).

2.  **Crie um novo Web Service**: No seu dashboard do Render, clique em `New > Web Service`.

3.  **Conecte seu repositório GitHub**: Autorize o Render a acessar seu repositório onde o código do `investment-monitor` está hospedado. Selecione o repositório.

4.  **Configure o Web Service (Backend)**:
    -   **Root Directory**: `backend` (o Render detectará o `Procfile` e `package.json` automaticamente)
    -   **Name**: `investment-monitor-backend` (ou o nome que preferir)
    -   **Environment**: `Node`
    -   **Region**: Escolha a região mais próxima dos seus usuários.
    -   **Build Command**: `npm install`
    -   **Start Command**: `node index.js`
    -   **Health Check Path**: `/api/market-summary`
    -   **Environment Variables**: Adicione `PORT` com o valor `3001`.

5.  **Crie o Web Service**: Clique em `Create Web Service`. O Render irá construir e fazer o deploy do seu backend. Anote a URL pública do seu backend após o deploy (ex: `https://investment-monitor-backend.onrender.com`).

### Deploy do Frontend (Vercel)

1.  **Crie uma conta no Vercel**: Se você ainda não tem uma, crie uma conta gratuita em [vercel.com](https://vercel.com/).

2.  **Crie um novo Projeto**: No seu dashboard do Vercel, clique em `Add New... > Project`.

3.  **Conecte seu repositório GitHub**: Autorize o Vercel a acessar seu repositório. Selecione o repositório `investment-monitor`.

4.  **Configure o Projeto (Frontend)**:
    -   **Root Directory**: `frontend`
    -   **Framework Preset**: `Vite` (o Vercel deve detectar automaticamente)
    -   **Build & Output Settings**: Mantenha os padrões, ou configure manualmente:
        -   **Build Command**: `npm run build`
        -   **Output Directory**: `dist`
    -   **Environment Variables**: Adicione uma variável de ambiente chamada `VITE_BACKEND_URL` com o valor da URL pública do seu backend (ex: `https://investment-monitor-backend.onrender.com`).

5.  **Crie o Projeto**: Clique em `Deploy`. O Vercel irá construir e fazer o deploy do seu frontend.

### Configuração Adicional (Importante!)

Após o deploy do backend no Render e do frontend no Vercel, você precisará garantir que o frontend saiba a URL correta do backend. O arquivo `vercel.json` no diretório `frontend` já está configurado para reescrever as requisições `/api/(.*)` para o seu backend. No entanto, você precisará **atualizar manualmente** a URL de destino no `vercel.json` com a URL real do seu backend do Render.

1.  **Edite `vercel.json`**: No seu repositório GitHub, edite o arquivo `investment-monitor/frontend/vercel.json`.
2.  **Atualize a URL**: Substitua `https://your-backend-url.com/api/$1` pela URL do seu backend do Render (ex: `https://investment-monitor-backend.onrender.com/api/$1`).
3.  **Commit e Push**: Faça commit da alteração e envie para o GitHub. O Vercel detectará a mudança e fará um novo deploy automaticamente.

Com esses passos, seu Monitor de Investimentos estará online e acessível publicamente!
---
