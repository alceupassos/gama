# Blueprint Admin Cockpit 3D - GAMA Services

## Objetivo
Criar um cockpit executivo para dono e administradores com leitura imediata de saúde do negócio em seis pilares:
- Financeiro
- Comercial
- Operação
- Clientes
- Pessoas
- Risco e compliance

## Estrutura de Navegação (Admin)
- Dashboard Executivo (visão geral diária)
- Cockpit do Dono (prioridades estratégicas)
- Gestão do Negócio (análises por janela e áreas)
- Ordens de Serviço
- Equipe
- Clientes
- Orçamentos

## Princípios de UI/UX
- Hierarquia clara: KPIs críticos sempre na primeira dobra
- Leitura em 3 camadas: alerta -> causa -> ação
- Gráficos com linguagem visual distinta para reduzir confusão cognitiva
- Paleta metálica com grade técnica, mantendo contraste AA
- Tema claro/escuro/sistema funcional com mesma densidade informacional

## Sistema Visual
- Base metálica + grid industrial
- Cards com profundidade (efeito 3D), brilho controlado e microanimações
- Estados cromáticos padronizados:
  - Ciano: operação ativa
  - Verde: desempenho saudável
  - Âmbar: atenção
  - Vermelho: risco crítico

## Biblioteca de Gráficos (todos animados)
- Barras 3D por filial
- Linhas duplas para fluxo de caixa (receita x custo)
- Roscas concêntricas para capacidade e eficiência
- Radar executivo para saúde multidimensional
- Matriz gradeada de risco/compliance
- Camadas de funil comercial em barras metálicas

## KPIs essenciais do dono
- Receita recorrente (MRR estimada)
- Pipeline previsto (30-90 dias)
- Saúde de caixa
- Carga operacional
- SLA e produtividade de execução
- Risco crítico ativo
- Retenção/NPS

## Objetivo Micro SaaS (controle de funcionários)
- Tornar visível o controle diário de execução da equipe para reduzir percepção de falta de gestão.
- Unificar visão de OS + produtividade de funcionários + qualidade por cliente em uma única jornada.
- Exibir gargalos de alocação, disciplina e avanço em tempo real para decisão rápida do dono.

## Fases de Implementação
1. Foundation
- Revisar variáveis de tema do admin para suportar claro/escuro/sistema.
- Garantir consistência do grid metálico em todos os cards.

2. Information Architecture
- Inserir item "Cockpit do Dono" no menu admin.
- Separar visão estratégica (dono) da visão tática (gestão).

3. Data Visualization
- Introduzir novos gráficos 3D distintos entre si.
- Configurar animações de entrada e atualização de estado.

4. Operação e Qualidade
- Validar responsividade desktop/mobile.
- Rodar lint/build.
- Rodar preview para QA visual.

5. Expansão por menu operacional
- Ordens de Serviço: backlog 3D, ritmo diário e disciplina de execução.
- Equipe: matriz de presença, produtividade 3D por técnico e governança de pontualidade.
- Clientes: distribuição por segmento, retenção e risco de churn em grade.
- Orçamentos: funil comercial 3D, conversão semanal e velocidade de fechamento.

## Critérios de Aceite
- Toggle de tema funcionando no admin (claro/escuro/sistema)
- Item "Cockpit do Dono" visível e operacional
- Gestão do negócio com janela 7/30/90 dias
- Menus OS, Equipe, Clientes e Orçamentos com gráficos 3D animados e leitura executiva
- Todos os gráficos com animação e aparência grade/metálica
- Sem erros de lint/build
