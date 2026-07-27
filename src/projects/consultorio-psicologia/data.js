import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined'

// Every piece of text shown on the page lives in this file. To use the landing
// page for a real practice, change the values here — the page itself does not
// need to be touched.

export const office = {
  name: 'Espaco Aurora',
  tagline: 'Psicologia clinica',
  headline: 'Um espaco para entender o que voce sente e seguir em frente.',
  intro:
    'Atendimento psicologico para adultos, casais e adolescentes, presencial em Sao Paulo ou online, de onde voce estiver. Sessoes de 50 minutos, com horarios fixos combinados junto com voce.',
}

export const psychologist = {
  name: 'Ana Ribeiro',
  crp: 'CRP 06/000000',
  approach: 'Terapia Cognitivo-Comportamental',
  bio: [
    'Sou psicologa clinica e atendo adultos e adolescentes ha mais de dez anos. Meu trabalho parte de uma ideia simples: voce nao precisa chegar organizado para comecar. A gente organiza junto.',
    'Trabalho com Terapia Cognitivo-Comportamental, uma abordagem pratica e com objetivos claros, em que olhamos para os pensamentos e comportamentos que sustentam o sofrimento e construimos, passo a passo, novas formas de responder a eles.',
  ],
  credentials: [
    'Graduacao em Psicologia pela Universidade de Sao Paulo',
    'Especializacao em Terapia Cognitivo-Comportamental',
    'Formacao em Terapia de Casal e Familia',
    'Supervisao clinica continuada',
  ],
}

export const highlights = [
  { icon: LaptopMacOutlinedIcon, label: 'Online e presencial' },
  { icon: ScheduleOutlinedIcon, label: 'Sessoes de 50 minutos' },
  { icon: LockOutlinedIcon, label: 'Sigilo profissional' },
]

export const services = [
  {
    icon: SelfImprovementOutlinedIcon,
    title: 'Terapia individual',
    description:
      'Para ansiedade, depressao, esgotamento, questoes de autoestima e momentos de transicao. Encontros semanais com objetivos definidos em conjunto.',
    detail: 'Adultos · 50 min',
  },
  {
    icon: FavoriteBorderIcon,
    title: 'Terapia de casal',
    description:
      'Um lugar neutro para conversas que travaram: comunicacao, ciumes, rotina, sexualidade e decisoes que envolvem os dois.',
    detail: 'Casais · 60 min',
  },
  {
    icon: GroupsOutlinedIcon,
    title: 'Adolescentes',
    description:
      'Acolhimento para questoes de escola, identidade, relacoes e ansiedade, com orientacao periodica aos responsaveis.',
    detail: '13 a 17 anos · 50 min',
  },
  {
    icon: LaptopMacOutlinedIcon,
    title: 'Atendimento online',
    description:
      'Mesma qualidade do presencial, por videochamada em ambiente seguro. Ideal para quem mora longe, viaja ou tem rotina imprevisivel.',
    detail: 'Brasil e exterior · 50 min',
  },
]

export const steps = [
  {
    title: 'Primeiro contato',
    description:
      'Voce envia uma mensagem contando, em poucas linhas, o que esta buscando. Respondo em ate um dia util com os horarios disponiveis.',
  },
  {
    title: 'Sessao inicial',
    description:
      'Na primeira conversa entendemos sua demanda, tiramos duvidas sobre o processo e combinamos como seguir. Sem compromisso de continuar.',
  },
  {
    title: 'Acompanhamento',
    description:
      'Definimos um horario fixo semanal e objetivos para o processo, revisados de tempo em tempo para acompanhar o que mudou.',
  },
]

export const faq = [
  {
    question: 'Como sei se preciso de terapia?',
    answer:
      'Nao existe um sofrimento minimo para procurar ajuda. Se algo vem atrapalhando seu sono, seu trabalho, suas relacoes ou simplesmente incomoda a ponto de voce pensar nisso todos os dias, ja e motivo suficiente para conversar.',
  },
  {
    question: 'Quanto tempo dura o processo?',
    answer:
      'Depende da demanda. Alguns processos focados duram poucos meses; outros acompanham mudancas mais longas. Revisamos os objetivos periodicamente para que a decisao de continuar seja sempre sua.',
  },
  {
    question: 'O atendimento online funciona igual?',
    answer:
      'Sim. A pesquisa em psicologia mostra resultados equivalentes ao presencial para a maior parte das demandas. Voce so precisa de conexao estavel e um lugar reservado durante a sessao.',
  },
  {
    question: 'Voce atende por convenio?',
    answer:
      'O atendimento e particular, com recibo para reembolso pelo seu plano de saude ou para declaracao no imposto de renda. Os valores sao informados no primeiro contato.',
  },
  {
    question: 'O que eu conto fica em sigilo?',
    answer:
      'Tudo o que acontece na sessao e protegido pelo sigilo profissional previsto no Codigo de Etica do psicologo. As excecoes sao apenas situacoes de risco a vida, sempre conversadas com voce antes.',
  },
]

export const contact = {
  whatsapp: '(11) 90000-0000',
  whatsappUrl: 'https://wa.me/5511900000000',
  email: 'contato@exemplo.com.br',
  address: 'Rua das Acacias, 120 — sala 43, Pinheiros, Sao Paulo',
  hours: ['Segunda a quinta, das 8h as 20h', 'Sexta, das 8h as 14h'],
}

export const contactChannels = [
  { icon: ChatBubbleOutlineIcon, label: 'WhatsApp', value: contact.whatsapp },
  { icon: PlaceOutlinedIcon, label: 'Consultorio', value: contact.address },
  { icon: ScheduleOutlinedIcon, label: 'Horarios', value: contact.hours.join(' · ') },
]
