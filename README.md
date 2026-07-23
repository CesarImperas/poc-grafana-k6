# K6 Grafana Labs - POC

Autor: [Caio Cavalcanti](https://github.com/CesarImperas) - PDI @ VIRTUS UFCG

![k6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white)

## Objetivo

Esta _Proof of Concept_ (POC) tem como objetivo estudar e demonstrar a utilização do **k6** para testes de performance, explorando seus principais conceitos, tipos de testes e possibilidades de integração ao fluxo de QA. O projeto busca servir como base para futuras implementações de testes de carga em aplicações da equipe.

---

## O que é o k6

O **k6** é uma ferramenta open source para testes de performance desenvolvida pela [Grafana Labs](https://grafana.com/docs/k6/latest/). Os testes são escritos em **JavaScript (ES6+)** e executados por um runtime implementado em **Go**, permitindo gerar cargas elevadas com baixo consumo de recursos.

Principais características:

- Simulação de usuários virtuais (VUs);
- Scripts simples e versionáveis;
- Integração com CI/CD;
- Exportação de métricas para Grafana, Prometheus e outros backends;
- Suporte a HTTP, WebSocket, GraphQL e Browser Testing.

---

## Quando utilizar

O k6 é indicado para validar requisitos **não funcionais** relacionados ao **desempenho**.


Seu principal objetivo é **responder perguntas** como:
- A aplicação suporta 500 usuários simultâneos?
- Qual o tempo médio de resposta?
- Em qual ponto o sistema começa a degradar?
- Existe aumento da taxa de erros durantes picos de acesso?

<br>

Casos e tipos de testes comuns:

- [Smoke Testing](https://grafana.com/docs/k6/latest/testing-guides/test-types/smoke-testing/)
- [Load Testing](https://grafana.com/docs/k6/latest/testing-guides/test-types/load-testing/)
- [Stress Testing](https://grafana.com/docs/k6/latest/testing-guides/test-types/stress-testing/)
- [Soak Testing](https://grafana.com/docs/k6/latest/testing-guides/test-types/soak-testing/)
- [Spike Testing](https://grafana.com/docs/k6/latest/testing-guides/test-types/spike-testing/)
- [Breakpoint/Capacity Testing](https://grafana.com/docs/k6/latest/testing-guides/test-types/breakpoint-testing/)

Também pode ser utilizado antes de releases importantes, em pipelines CI/CD, benchmarks e validação de infraestrutura.

Abaixo, segue subtópicos relacionados a uma explicação breve, acompanhado de um exemplo, sobre cada um dos tipos de testes de performance, que a ferramente suporta e recomenda em qualquer projeto.

---

### Smoke Testing

O **Smoke Test** é utilizado para validar se a aplicação está operacional antes da execução de testes mais custosos.

**Objetivo**

Verificar rapidamente se o sistema responde corretamente sob uma carga mínima.

**Características**

- Poucos usuários virtuais (VUs);
- Curta duração;
- Execução rápida;
- Normalmente executado no início da pipeline.

**Exemplo**

Após realizar o deploy em um ambiente de QA, executa-se um Smoke Test com **1 VU durante 1 minuto** apenas para confirmar que a API está respondendo antes de iniciar os demais testes.

---

### Load Testing

O **Load Test** mede o comportamento da aplicação sob a carga esperada em produção.
- Também conhecida de **Average-Load test**, por sua carga em um valor médio.

**Objetivo**

Validar se o sistema atende aos requisitos de desempenho em condições normais de utilização.

**Características**

- Carga conhecida (normalmente uma média);
- Tempo de resposta;
- Throughput;
- Consumo de recursos.

**Exemplo**

Uma API de e-commerce recebe aproximadamente **500 usuários simultâneos** durante o horário comercial. O teste simula esse comportamento para verificar se o tempo médio de resposta permanece dentro do SLA (Service Level Agreement).

---

### Stress Testing

O **Stress Test** aumenta gradualmente a carga até antes do limite operacional do sistema.

**Objetivo**

Descobrir em qual ponto a aplicação começa a degradar.

**Características**

- Crescimento gradual;
- Busca pelo ponto de ruptura;
- Avalia estabilidade e recuperação.
    - Buscamos avaliar **disponibilidade**, **estabilidade** e **recuperabilidade** do sistema.

**Exemplo**

Uma plataforma de vendas normalmente suporta **500 usuários**, mas deseja-se descobrir se ela continua estável com **1.000, 2.000 ou 5.000 usuários simultâneos**.

---

### Spike Testing

O **Spike Test** simula um aumento repentino (pico) de acessos.

**Objetivo**

Avaliar como o sistema reage a picos inesperados de tráfego.

**Características**

- Crescimento instantâneo;
- Recuperação após o pico;
- Muito utilizado para eventos sazonais (por exemplo, black friday).

**Exemplo**

Durante a abertura das vendas de um show, milhares de usuários acessam o sistema ao mesmo tempo logo após a liberação dos ingressos.

---

### Soak Testing

O **Soak Test** mantém uma carga constante ("de molho") durante um longo período.

**Objetivo**

Encontrar problemas que aparecem apenas após horas de execução.

**Características**

- Longa duração;
- Vazamentos de memória;
- Crescimento de logs;
- Consumo de conexões.

**Exemplo**

Executar **400 usuários simultâneos durante 4 horas** para verificar se a aplicação continua estável sem aumento contínuo do consumo de memória.

---

### Breakpoint/Capacity Testing

O **Breakpoint/Capacity Test** busca determinar a capacidade máxima suportada pelo sistema antes que os requisitos de desempenho deixem de ser atendidos.
- Ou seja, até o limite operacional do sistema (diferente do stress test).

**Objetivo**

Identificar o limite operacional da aplicação.

**Características**

- Crescimento progressivo;
- Diversas execuções;
- Auxilia no planejamento de capacidade.

**Exemplo**

Uma empresa deseja descobrir quantos usuários simultâneos sua API suporta antes que o tempo de resposta ultrapasse **2 segundos**.

---

### Comparativo

| Tipo | Pergunta que responde |
|------|------------------------|
| Smoke | A aplicação está funcionando? |
| Load | A aplicação suporta a carga esperada? |
| Stress | Qual o ponto de degradação? |
| Spike | Como reage a aumentos repentinos de acesso? |
| Soak | Continua estável após várias horas? |
| Breakpoint/Capacity | Qual a capacidade máxima suportada? |

---

## Arquitetura da ferramenta

```text
Script JavaScript
        │
Runtime do k6
        │
Virtual Users (VUs)
        │
Requisições
        │
Sistema sob teste
        │
Coleta de métricas
        ├── Terminal
        ├── JSON
        ├── Prometheus
        ├── InfluxDB
        └── Grafana Cloud
```

---

## Estrutura desta POC

```text
poc-grafana-k6/
├── README.md
├── scripts/
├── data/
├── utils/
└── results/
```

- **scripts/**: cenários de testes.
- **data/**: massa de dados.
- **utils/**: funções compartilhadas.
- **results/**: resultados das execuções.

---

## Instalação

Instale o k6 conforme seu sistema operacional seguindo a [documentação oficial](https://grafana.com/docs/k6/latest/set-up/install-k6/).

Verifique a instalação:

```bash
k6 version
```

Executando via Docker:

```bash
docker run --rm grafana/k6 run script.js
```

---

## Executando um teste

```bash
k6 run scripts/smoke.js
```

Exemplo utilizando variáveis de ambiente:

```bash
k6 run -e BASE_URL=https://api.exemplo.com scripts/load.js
```

- Ou com a flag --env

---

## Estrutura de um script

```javascript
import http from 'k6/http'; // Importações

export const options = {}; // Inicialização/Options 

export function setup() {} // Configuração/Setup (opcional)

export default function() {} // Execução/Default -- Código VU

export function teardown() {} // Desmontagem/Teardown (opcional)
```

Fluxo de execução:

`Init → Setup → Default (VUs) → Teardown`

---

## Principais conceitos

- **Virtual User (VU):** usuário virtual executando o script.
- **Iteration:** execução completa da função principal.
- **Scenario:** define como o teste será executado.
- **Executor:** estratégia de distribuição da carga entre os VUs (`constant-vus`, `ramping-vus`, etc.).
- **Group:** organiza fluxos lógicos.
- **Tags:** categorizam métricas e requisições.
- **Sleep:** simula o tempo de interação do usuário; Uma espécie de "modo thinking" de um usuário humano.

---

## Métricas

O k6 coleta automaticamente métricas como:

- `http_req_duration`
- `http_req_failed`
- `iterations`
- `vus`
- `data_sent`
- `data_received`

Também permite criar métricas customizadas (`Counter`, `Gauge`, `Rate` e `Trend`).

---

## Checks

Checks validam respostas durante a execução.

```javascript
check(response, {
  "status 200": r => r.status === 200
});
```

Falhas em checks são registradas nas métricas, mas não interrompem o teste.

---

## Thresholds

Thresholds definem critérios mínimos de qualidade para aprovação do teste.

```javascript
thresholds: {
  http_req_duration: ['p(95)<500']
}
```

Quando não atendidos, o k6 retorna código de erro ao final da execução, permitindo reprovar pipelines de CI/CD.
- Contudo, em casos de condições não atendidas, o teste não é abortado como se imaginaria, para isso, é necessário indicar dentro do critério de avaliação do limite, um objeto com duas propriedades: threshold (com a avaliação), e abortOnFail (com seu valor verdadeiro - true).

---

## Cenários

Os cenários permitem configurar diferentes perfis de carga utilizando executores específicos.

Nesta POC serão explorados:

- Smoke
- Load
- Stress
- Spike
- Soak
- Breakpoint/Capacity

---

## Exemplos previstos -- DEMO

- Scripts para cada tipo de teste
- Requisição HTTP simples
- Checks
- Thresholds
- Groups
- Variáveis de ambiente
- Métricas customizadas
- Scenarios
- Utilização da biblioteca `browser`
- Relatórios/Dashboards

---

## Utilizando k6 em projetos com Cypress

As duas ferramentas possuem objetivos diferentes e complementares dentro da estratégia de qualidade.

| Cypress | k6 |
|----------|----|
| Testes funcionais (E2E) | Testes de performance e de carga |
| Executa no navegador | Executa diretamente contra APIs e serviços |
| Simula ações do usuário | Simula milhares de usuários virtuais (VUs) |
| Verifica regras de negócio | Mede desempenho da aplicação |
| Assertions | Métricas, Checks e Thresholds |
| Regressão | Carga, Stress, Spike e Soak |

<br>

Uma organização possível:

```text
qa-automation/
├── cypress/
├── k6/
└── <...>/
```

Fluxo sugerido em CI/CD:

```text
Build
 ↓
Deploy QA
 ↓
Cypress E2E
 ↓
k6 Smoke
 ↓
k6 Load
 ↓
Thresholds
 ↓
Deploy Checked
```

Essa abordagem permite validar primeiro o comportamento funcional da aplicação e, em seguida, seus requisitos de desempenho.

---

## Browser Testing (`k6/browser`)

Além dos testes tradicionais baseados em requisições HTTP, o k6 disponibiliza o módulo **`k6/browser`**, que permite automatizar navegadores reais utilizando uma API inspirada no Playwright.

Esse recurso possibilita validar métricas relacionadas à experiência do usuário (front-end), como tempo de carregamento de páginas, renderização e interações com elementos da interface.

### Quando utilizar

- Medição de Web Vitals; -- Baseado nas métricas do [Core Web Vitals](https://web.dev/explore/learn-core-web-vitals?hl=pt-br)
- Tempo de carregamento de páginas;
- Performance do Frontend;
- Fluxos críticos de navegação;
- Comparação entre versões da aplicação.

### Quando não utilizar

O módulo `k6/browser` não substitui ferramentas de automação funcional como **Cypress** ou **Playwright**. Seu foco é avaliar o desempenho percebido pelo usuário, e não realizar testes completos de regressão funcional.

### Exemplo

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function() { // Uso de assincronicidade
  const page = await browser.newPage();

  await page.goto('https://test.k6.io');

  await page.close();
}
```

### Principais métricas

Ao utilizar o módulo `k6/browser`, além das métricas tradicionais de requisições HTTP, o k6 permite coletar indicadores relacionados à experiência do usuário durante a navegação.

#### Core Web Vitals

As **Core Web Vitals** são métricas definidas pelo Google para avaliar a experiência do usuário em aplicações Web.

| Métrica | Descrição |
|----------|-----------|
| **LCP (Largest Contentful Paint)** | Tempo necessário para renderizar o maior elemento visível da página. Mede a velocidade de carregamento percebida pelo usuário. |
| **CLS (Cumulative Layout Shift)** | Mede a estabilidade visual da página, indicando mudanças inesperadas de layout durante o carregamento. Quanto menor, melhor. |
| **INP (Interaction to Next Paint)** | Mede o tempo de resposta da interface após uma interação do usuário (clique, toque ou teclado), indicando a capacidade de resposta da aplicação. |

> **Observação:** nas versões mais recentes das Core Web Vitals, o **INP (Interaction to Next Paint)** substituiu oficialmente o **FID (First Input Delay)** como principal métrica de responsividade, sendo atualmente a recomendação do Google para avaliar a experiência do usuário.

#### Outras métricas importantes

| Métrica | Descrição |
|----------|-----------|
| **FCP (First Contentful Paint)** | Tempo até que o primeiro conteúdo seja renderizado na tela. |
| **DOMContentLoaded** | Momento em que o HTML foi completamente carregado e processado. |
| **Load Event** | Indica quando todos os recursos da página (imagens, CSS, scripts etc.) terminaram de carregar. |
| **TTFB (Time To First Byte)** | Tempo entre o envio da requisição e o recebimento do primeiro byte da resposta do servidor. Mede a responsividade inicial do backend. |

### Benefícios

A utilização do `k6/browser` permite avaliar aspectos que não podem ser medidos apenas por testes baseados em HTTP, como:

- Tempo de carregamento percebido pelo usuário;
- Performance de renderização do Frontend;
- Estabilidade visual da interface;
- Tempo de resposta das interações;
- Comparação da experiência do usuário entre diferentes versões da aplicação.

Dessa forma, o módulo complementa os testes tradicionais de carga, permitindo analisar tanto o desempenho da infraestrutura quanto a experiência real do usuário durante a navegação.

---

## Executando o k6 em ambientes Cloud

Embora o k6 seja frequentemente utilizado de forma local, ele também pode ser executado em **ambientes de nuvem** utilizando containers Docker.

Essa abordagem facilita sua integração com pipelines de CI/CD e plataformas de infraestrutura como código.

### Exemplo

```bash
docker run --rm \
  -v $(pwd):/app \
  grafana/k6 run /app/scripts/load.js
```

### Principais cenários de utilização

- AWS EC2;
- AWS ECS;
- Kubernetes;
- GitHub Actions;
- GitLab CI/CD;
- Jenkins.

Essa estratégia elimina a necessidade de instalar o k6 diretamente na máquina responsável pela execução, tornando os ambientes mais padronizados e reprodutíveis.

---

## Grafana Cloud

O [**Grafana Cloud**](https://grafana.com/auth/sign-up/create-user?pg=k6-cloud&plcmt=free&cta=create-free-account&redirectPath=k6) permite armazenar e visualizar as métricas geradas pelo k6 de forma centralizada, possibilitando o acompanhamento da evolução da performance da aplicação ao longo do tempo.

Diferentemente do Dashboard Web local, o Grafana Cloud mantém um histórico das execuções e oferece recursos voltados para observabilidade.

### Principais recursos

- Histórico das execuções;
- Dashboards persistentes;
- Comparação entre testes;
- Compartilhamento de dashboards;
- Alertas e monitoramento;
- Integração com observabilidade da aplicação.

### Quando utilizar

- Ambientes de QA;
- Homologação;
- Produção;
- Execuções automatizadas em pipelines;
- Testes recorrentes de performance.

---

> **Observação**
>
> Os testes E2E continuam sendo responsabilidade do Cypress, enquanto o k6 complementa a estratégia de qualidade validando os requisitos não funcionais da aplicação.
> 
> Essa POC tem caréter introdutório, e poderá ser expandida com outros assuntos, tais como:
> 1. Execução distribuída;
> 2. Execução parametrizada por ambientes (DEV, QA e PROD). 

---

## Referências

- [Documentação oficial do k6](https://grafana.com/docs/k6/latest/)
- [Test Types](https://grafana.com/docs/k6/latest/testing-guides/test-types/)
- [JavaScript API](https://grafana.com/docs/k6/latest/javascript-api/)
- [Material no Notion](https://app.notion.com/p/caio-computacao/K6-Grafana-Labs-375ea6f96d24802eba09ef61343f8e16?source=copy_link)
