# Scripts de Testes de Performance

Este diretório contém exemplos de implementação dos principais tipos de testes de performance utilizando o **k6**.

Cada script demonstra uma estratégia diferente de geração de carga sobre uma aplicação.

## Executando os testes

A partir da raiz do projeto:

```bash
k6 run scripts/smoke.js
```

Utilizando variável de ambiente:

```bash
k6 run -e BASE_URL=https://test.k6.io scripts/load.js
```

Ou a flag `--env`.

---

## Resultados

Ao final da execução, o k6 apresenta automaticamente métricas como:

- Tempo médio de resposta
- Percentis (P90, P95)
- Número de requisições
- Taxa de erros
- Throughput
- Virtual Users

Exemplo:

```
✓ status is 200

checks.........................: 100.00%

http_req_duration..............: avg=120ms

http_req_failed................: 0.00%

iterations.....................: 450

vus............................: 20
```

---

## Gerando relatórios

Salvar saída JSON:

```bash
k6 run --out json=results/result.json scripts/load.js
```

Exportar para Grafana Cloud (quando configurado):

```bash
k6 cloud scripts/load.js
```

---

## Observações

Os valores utilizados nesta POC possuem finalidade didática.

Em ambientes reais, a quantidade de usuários virtuais, duração dos testes e thresholds devem ser definidos de acordo com os requisitos de desempenho da aplicação.