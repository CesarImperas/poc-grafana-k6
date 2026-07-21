# Exemplos

Este diretório reúne pequenos exemplos independentes demonstrando os principais recursos do **k6**.

O objetivo é apresentar cada conceito de forma isolada, facilitando o estudo e servindo como apoio à POC.

## Exemplos disponíveis

| Arquivo | Conceito |
|----------|----------|
| http-get.js | Requisição HTTP simples |
| checks.js | Validação de respostas |
| thresholds.js | Critérios de aprovação |
| groups.js | Organização lógica do script |
| env.js | Variáveis de ambiente |
| custom-metrics.js | Métricas customizadas |
| scenarios.js | Configuração de cenários |
| lifecycle.js | Ciclo de vida do script |

## Como executar

Todos os exemplos podem ser executados da mesma forma.

```bash
k6 run examples/http-get.js
```

Exemplo utilizando variável de ambiente:

```bash
k6 run -e BASE_URL=https://test.k6.io examples/env.js
```

## Comentários

### Cenários (`scenarios.js`)

Este exemplo demonstra como o k6 permite executar múltiplos cenários simultaneamente utilizando diferentes executores.

Foram utilizados dois executores:

- **constant-arrival-rate**: mantém uma taxa constante de novas iterações por segundo, independentemente do tempo de resposta da aplicação.
- **per-vu-iterations**: distribui um número fixo de iterações para cada Virtual User (VU).

Cada cenário executa uma função diferente (`exec`), permitindo representar diferentes comportamentos de usuários dentro de um mesmo teste.
