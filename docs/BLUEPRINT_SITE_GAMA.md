# Blueprint Completo - GAMA Services (Site ideal)

## 1) Objetivo
- Posicionar o site como canal primário de aquisição e relacionamento com clientes.
- Reduzir atrito na conversão (orçamento automático guiado).
- Preservar área interna para gestão do dono (admin dashboard), sem poluir jornada do cliente.

## 2) Princípios de UX/UI (Frontend Specialist)
- Clareza antes de complexidade: visitante entende em 5 segundos o que a GAMA faz.
- Conversão progressiva: CTA principal sempre visível (Orçamento / WhatsApp / Acompanhar chamado).
- Confiança técnica: visual industrial premium + prova de execução + SLA.
- Jornada dual: público cliente na home; gestão interna em rota separada.
- Acessibilidade: contraste, foco visível, feedback de interação, motion com fallback.

## 3) Arquitetura da informação
- `/` Home Cliente (serviços, benefícios, acompanhamento, contato)
- `/orcamento` Wizard automático (estimativa em tempo real)
- `/dashboard/client` Portal de acompanhamento
- `/dashboard/admin` Operação e gestão (incluindo Gestão do Negócio)
- `/login` Entrada de perfis

## 4) Design System
- Tokens: cor, tipografia, espaçamento, elevação, bordas, estados.
- Temas: claro/escuro com paridade visual.
- Componentes: header, hero, cards, estatísticas, tabelas, forms, stepper, badges, CTA.
- Motion: entrada em cascata, hover de profundidade, transições suaves.

## 5) Conteúdo e mensagem
- Headline cliente-first: manutenção sem dor, previsibilidade, retorno rápido.
- Seções principais:
  - Serviços (ar condicionado, elétrica, hidráulica/predial, suporte)
  - Acompanhamento em tempo real
  - Benefícios mensuráveis (SLA, tempo de resposta, satisfação)
  - Contato imediato (WhatsApp + orçamento)
- Área interna do dono/admin com acesso discreto.

## 6) Estratégia de imagem (image pipeline)
- Hero e blocos visuais orientados a cliente.
- Assets em `public/images/landing/` com naming versionado.
- Política: evitar dependência de imagens remotas críticas.
- Opcional: pipeline Canva para campanhas e variações comerciais.

## 7) Orçamento automático (implementado)
- Fluxo em passos:
  1. Serviço + perfil + urgência + recorrência
  2. Escopo + adicionais + descrição/endereço
  3. Contato e envio
- Motor de preço:
  - Base por serviço
  - Multiplicadores por urgência/perfil
  - Fator de escala por área e quantidade
  - Adicionais opcionais
  - Faixa estimada (mínimo/máximo) com margem técnica
- Saída:
  - Resumo detalhado
  - Protocolo automático
  - Envio para API de leads (com fallback resiliente)

## 8) Benchmark competitivo (diretrizes)
- Superar concorrência em:
  - Clareza de oferta
  - Velocidade de orçamento
  - Transparência de estimativa
  - UX mobile
  - Prova visual de operação

## 9) Qualidade e operação
- Build e lint obrigatórios em cada release.
- Validação visual em tema claro/escuro.
- Preview local estável para QA manual.
- Evolução contínua via backlog de melhorias por métricas de conversão.

## 10) Status de execução
- [x] Home cliente modernizada com design system e tema funcional.
- [x] Imagens locais de landing criadas e integradas.
- [x] Dashboard admin com gestão do negócio modernizada.
- [x] Correções de carregamento de avatares SVG remotos.
- [x] Wizard de orçamento automático com cálculo em tempo real.
- [x] Blueprint salvo em arquivo no repositório.

## 11) Evidências de validação (31/03/2026)
- Instalação de dependências: `npm install` (OK)
- Qualidade estática: `npm run lint` (OK)
- Build de produção: executado com aviso de lockfiles múltiplos no workspace (sem erro de código)
- Validação HTTP local (dev server):
  - `GET /` => `200 OK`
  - `GET /orcamento` => `200 OK`
  - `GET /dashboard/admin` => `200 OK`
  - `GET /images/landing/client-hero.svg` => `200 OK`
  - `GET /images/landing/client-support.svg` => `200 OK`
  - `GET /images/landing/client-service.svg` => `200 OK`

## 12) Próximo refinamento recomendado
- Ajustar `turbopack.root` no `next.config` para remover o warning de múltiplos lockfiles e estabilizar o fluxo de build no monorepo.
