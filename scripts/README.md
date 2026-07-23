# Scripts de Testes de Performance

Este diretório contém exemplos de implementação dos principais tipos de testes de performance utilizando o **k6**.

Cada script demonstra uma estratégia diferente de geração de carga sobre uma aplicação.

## Executando os testes

A partir da raiz do projeto:

```bash
k6 run scripts/workloads/smoke.js
```

Utilizando variável de ambiente:

```bash
k6 run -e BASE_URL=https://test.k6.io scripts/workloads/load.js
```

Ou a flag `--env`.

---

## Resultados

Ao final da execução, o k6 exibe automaticamente um resumo contendo as principais métricas coletadas durante o teste.

Entre elas:

- Tempo médio de resposta;
- Percentis (P90, P95);
- Número de requisições;
- Taxa de erros;
- Throughput;
- Virtual Users (VUs);
- Iterações executadas.

Exemplo:

```text
✓ status is 200

checks.........................: 100.00%

http_req_duration..............: avg=120ms

http_req_failed................: 0.00%

iterations.....................: 450

vus............................: 20
```

---

## Exportando resultados

Além da saída padrão no terminal, o k6 permite exportar as métricas para diferentes formatos.

### JSON

Salva todas as métricas em um arquivo JSON para posterior análise ou integração com outras ferramentas.

```bash
k6 run --out json=../results/result.json scripts/workloads/load.js
```

---

## Dashboard Web

As versões mais recentes do k6 (v0.49+) incluem um **Dashboard Web** integrado, permitindo acompanhar a execução dos testes em tempo real diretamente pelo navegador.

### Habilitando o dashboard

**Windows (PowerShell)**

```powershell
$env:K6_WEB_DASHBOARD="true"
k6 run scripts/workloads/load.js
```

**Linux / macOS**

```bash
K6_WEB_DASHBOARD=true k6 run scripts/workloads/load.js
```

Após iniciar a execução, acesse:

```text
http://localhost:5665
```

- Também é possível configurar opções como porta, endereço de escuta e exportação automática do dashboard por meio de outras variáveis de ambiente disponibilizadas pelo k6.

<br>

O dashboard apresenta métricas em tempo real, como:

- Tempo de resposta;
- Requisições por segundo (RPS);
- Quantidade de Virtual Users (VUs);
- Taxa de erros;
- Throughput;
- Duração das iterações.

---

## Grafana Cloud

Para cenários mais completos de observabilidade, o k6 pode enviar métricas diretamente para o **Grafana Cloud**, permitindo:

- Persistência das métricas;
- Dashboards compartilhados;
- Histórico das execuções;
- Comparação entre testes;
- Monitoramento contínuo.

Após configurar as credenciais do Grafana Cloud:

```bash
k6 cloud scripts/workloads/load.js
```

Essa abordagem é recomendada para ambientes de QA, Homologação e Produção.

---

## Observações

Os valores utilizados nesta POC possuem finalidade didática.

Em ambientes reais, a quantidade de Virtual Users (VUs), duração dos testes, thresholds e cenários devem ser definidos de acordo com os requisitos não funcionais e os objetivos de desempenho da aplicação.
