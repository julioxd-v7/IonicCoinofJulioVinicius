# 💰 IonicCoin

App de conversão de moedas em tempo real, desenvolvido com **Ionic Framework** + **Angular**, consumindo a API pública [Frankfurter](https://www.frankfurter.app/) para obter taxas de câmbio atualizadas.

---

## 📱 Sobre o projeto

O **IonicCoin** permite que o usuário converta valores entre diversas moedas internacionais de forma simples e rápida, com:

- Conversão de moedas em tempo real
- Histórico local das conversões realizadas
- Funcionamento offline com as últimas taxas salvas
- Configurações de frequência de atualização

Projeto desenvolvido como atividade prática envolvendo consumo de APIs REST com Ionic + Angular.

---

## 🖼️ Telas do aplicativo

> Substitua os placeholders abaixo pelas imagens reais do app. Salve as capturas de tela na pasta `screenshots/` na raiz do repositório.

| Conversor | Histórico | Ajustes |
|---|---|---|
| ![Tela de conversão](screenshots/home.png) | ![Tela de histórico](screenshots/history.png) | ![Tela de ajustes](screenshots/settings.png) |

---

## ✨ Funcionalidades

- **Conversão de moedas em tempo real** — consumo da API REST [Frankfurter](https://www.frankfurter.app/), que fornece taxas de câmbio baseadas em dados do Banco Central Europeu, sem necessidade de chave de API.
- **Seleção de moeda de origem e destino**, com mais de 15 moedas suportadas (USD, EUR, BRL, GBP, JPY, entre outras).
- **Conversão inversa** — botão para inverter rapidamente as moedas selecionadas.
- **Histórico de conversões** — todas as conversões realizadas são salvas localmente (`localStorage`) e podem ser consultadas, individualmente removidas ou limpas por completo.
- **Modo offline** — caso o dispositivo esteja sem internet, o app utiliza a última taxa de câmbio salva localmente, exibindo um aviso visual de que os dados podem estar desatualizados.
- **Atualização automática** — as taxas são buscadas automaticamente sempre que o usuário troca a moeda ou reabre o app.
- **Configurações** — o usuário pode escolher a frequência desejada de atualização das taxas (manual, a cada hora ou diariamente) e ativar notificações para variações significativas.

---

## 🛠️ Tecnologias utilizadas

- [Ionic Framework](https://ionicframework.com/) (componentes standalone)
- [Angular](https://angular.io/) 17
- TypeScript
- [Frankfurter API](https://frankfurter.dev/) — API REST gratuita de câmbio
- `localStorage` — persistência local do histórico, cache de taxas e configurações
- [Capacitor](https://capacitorjs.com/) — empacotamento para Android/iOS

---

## 📂 Estrutura do projeto

```
IonicCoin/
├── src/
│   ├── app/
│   │   ├── models/              # Interfaces TypeScript (histórico, taxas)
│   │   ├── services/            # ExchangeRateService e StorageService
│   │   ├── tabs/                # Navegação por abas (tab bar)
│   │   └── pages/
│   │       ├── home/            # Tela de conversão (principal)
│   │       ├── history/         # Tela de histórico de conversões
│   │       └── settings/        # Tela de configurações
│   ├── theme/                   # Variáveis de cor do Ionic
│   └── global.scss
├── capacitor.config.ts
├── angular.json
└── package.json
```

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Ionic CLI](https://ionicframework.com/docs/cli) instalado globalmente:

```bash
npm install -g @ionic/cli
```

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/IonicCoin.git
cd IonicCoin

# Instale as dependências
npm install

# Rode o projeto no navegador
ionic serve
```

O app abrirá automaticamente em `http://localhost:8100`.

### Build para Android/iOS (opcional)

```bash
ionic build
npx cap add android
npx cap sync
npx cap open android
```

---

## 🌐 API utilizada

Este projeto consome a **[Frankfurter API](https://frankfurter.dev/)**, uma API REST pública e gratuita de câmbio que não exige cadastro nem chave de autenticação.

Exemplo de endpoint utilizado:

```
GET https://api.frankfurter.dev/v1/latest?from=USD
```

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🎨 Identidade visual

O app segue um tema escuro "Cofre Digital", combinando **dourado** (dinheiro) e **verde** (crescimento) em tons profundos e dessaturados, com tipografia `Space Grotesk` (display), `Inter` (corpo) e `JetBrains Mono` (valores monetários, taxas e datas).

---

## 👤 Autoria

Desenvolvido por **Julio Vinicius**
Matrícula: 01810246 · Classe 3MB · Disciplina: Dispositivos Móveis



# IonicCoinJulioVinicius
