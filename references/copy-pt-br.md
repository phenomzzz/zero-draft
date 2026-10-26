# Copy em português brasileiro

Aplique primeiro as [salvaguardas e sinais de modelo](copy-deslop.md). Escreva e revise direto em PT-BR; não traduza de um rascunho inglês. Preserve acentos, nomes próprios, regionalismos e termos de domínio aprovados. Não converta para PT-PT nem imponha informalidade.

## Registro

- "Você" como padrão, com um só tratamento por texto. Não misture imperativo de "você" e de "tu" ("Reserve"/"Reserva") salvo escolha regional da marca.
- Ordem direta e verbos concretos: "fazer", "ter", "usar" em vez de "realizar", "possuir", "utilizar" quando o sentido é o mesmo; "reservar" em vez de "efetuar a realização da reserva".
- Títulos em caixa de frase: "Nossas bicicletas", não "Nossas Bicicletas". Title Case é decalque do inglês.
- Proximidade vem de informação e vocabulário local, não de "né", "kkk", exclamações ou relatos que o autor não forneceu. "Pra" e "tá" dependem da marca: nem obrigatórios, nem proibidos.
- Anglicismo consolidado (site, e-mail, app, check-in) não é problema. O problema é decalque de estrutura e de marketing.

## Decalques e marketês: pistas, não proibições

| Pista | Por que soa artificial | Caminho |
| --- | --- | --- |
| "Eleve sua experiência", "Desbloqueie", "Leve ao próximo nível", "Potencialize", "Alavanque" | Decalque de elevate/unlock/next level; promete sem dizer o quê | Diga o que muda: "Devolução até as 19h" |
| "Soluções completas", "de ponta", "experiência única e inesquecível", "excelência" | Elogio intercambiável | Nomeie serviço, lugar ou dado |
| "Mergulhe em", "Descubra", "Explore", "no coração de" | Convite genérico (dive into, nestled in) | Diga o que há e a distância real |
| "Estamos animados em anunciar", "no final do dia", "faz total sentido" | Fórmula traduzida | Anuncie direto |
| "Eventualmente" (= às vezes), "suportar" (= aguentar), "endereçar um problema", "aplicar para a vaga", "performar" | Falso cognato ou decalque | "No fim", "ser compatível com", "resolver", "candidatar-se", "render" |
| "É importante ressaltar", "Vale destacar" | Anuncia importância sem entregar | Afirme o conteúdo |
| "Não se trata de X, mas de Y", "Mais do que X, Y" | Antítese teatral | Mantenha só se há distinção real |
| ", proporcionando…", ", garantindo…" em cascata | Consequência vaga | Frase própria com consequência concreta; gerúndio legítimo não é erro |
| "Além disso", "Dessa forma", "Por fim" em série | Conectivo de redação escolar | Revise acúmulo; ocorrência isolada é normal |

"Jornada", "através de", "conta com", travessões, perguntas e listas não são proibidos. Limiares de um corpus pequeno de blogs não valem para títulos, cartões, instruções ou CTAs. Parágrafos curtos podem servir à interface; não alongue texto para parecer humano.

## Convenções tipográficas e de formato

- **Aspas:** duplas curvas “ ” como padrão; simples ‘ ’ só dentro de outra citação. Evite « » (uso lusitano/editorial) e aspas retas no texto final. Se a citação é só parte da frase, o ponto fica fora das aspas.
- **Travessão (—):** incisos e diálogo, com espaço dos dois lados em incisos ("o caiaque duplo — o maior da frota — fica…"). Use pouco; vírgula, dois-pontos ou parênteses costumam bastar. Meia-risca (–) só para intervalos em tabelas ("seg.–sex."); na prosa, "das 10h às 12h". Hífen só em palavras compostas.
- **Números:** vírgula decimal e ponto de milhar: "4,8", "1.250", "20%".
- **Moeda:** "R$ 1.250,00", com espaço não separável após R$. Valores redondos ("R$ 480") são válidos se consistentes. Gere com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`, não por concatenação.
- **Datas:** "16 de outubro de 2026"; curta DD/MM/AAAA. Meses e dias da semana em minúscula ("sexta-feira"). Use `Intl.DateTimeFormat('pt-BR')`; nunca MM/DD.
- **Horas:** 24 h, "14h", "14h30" (ou "14:30" em campos e tabelas); sem AM/PM.
- **Outros:** ordinais com º/ª, não ° (grau): "1º andar", "nº 12"; telefone "(11) 99999-9999"; CEP "01000-000"; abreviações de dia "seg., ter., qua., qui., sex., sáb., dom.".

PT-BR costuma ocupar mais espaço que o inglês: teste rótulos, botões e nomes longos na interface; evite abreviação obscura só para caber.

## Voz de marca e tarefa

Separe expressão do convite e precisão operacional. Uma locadora à beira do lago pode usar uma frase sensorial e ainda apresentar frota, preços, retirada e regras com clareza. Não troque todo o acolhimento por burocracia.

| Trecho | Decisão | Motivo |
| --- | --- | --- |
| "Aqui o dia começa mais devagar." | Manter se aprovado e coerente | Expressão deliberada de marca; se todo título repetir essa forma, varie os demais |
| "Uma experiência única e inesquecível em um verdadeiro paraíso." | Refinar/substituir | Elogio genérico sem informação distintiva |
| "Bikes elétricas com capacete e cadeado, a duas quadras do lago." | Manter se confirmado | Informa o que importa |
| "Consultar disponibilidade" | Manter quando houver consulta | Não promete reserva confirmada |
| "Trocar pela bike aro 29" | Manter se substitui a escolha | Explica o efeito melhor que "Confirmar" |
| "A devolução precisa ser depois da retirada. Escolha outra data." | Manter/refinar conforme o estado | Orienta recuperação sem culpar a pessoa |

Exemplos ilustrativos não são fonte de instalações, políticas ou funcionalidades de um cliente. Confirme formatos e termos ("bike", "retirada", "devolução", número de pessoas) no contexto real.

## Limite da evidência

Zero-Lero tem exemplos nativos, mas corpus pequeno e enviesado; não importe seus limiares como norma. Preserve a prioridade semântica de Humanizar: modalidade, condições e compromissos não somem para deixar a frase mais direta. Use a orientação de linguagem simples do gov.br para clareza funcional, não como voz obrigatória da marca.
