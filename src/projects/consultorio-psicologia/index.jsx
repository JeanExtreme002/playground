import { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import { contact, contactChannels, faq, highlights, office, psychologist, services, steps } from './data.js'

export const meta = {
  title: 'Espaco Aurora — Psicologia',
  author: 'Victor Chaves',
  description:
    'Landing page de um consultorio de psicologia: apresentacao, servicos, perguntas frequentes e formulario de contato.',
  icon: SpaOutlinedIcon,
  github: 'JeanExtreme002',
  tags: ['landing page', 'psicologia', 'mui'],
}

// Small heading reused by every section below, so all of them line up the same
// way: a short label on top, a title, and an optional line of context.
function SectionHeading({ overline, title, description }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" color="text.secondary">
        {overline}
      </Typography>
      <Typography variant="h3" sx={{ mt: 0.5 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 620 }}>
          {description}
        </Typography>
      )}
    </Box>
  )
}

// Two columns on wide screens, one column on phones.
function Columns({ children }) {
  return (
    <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
      {children}
    </Box>
  )
}

const EMPTY_FORM = { name: '', contactInfo: '', message: '' }

// The site is static, so there is no server to receive the form. Instead the
// message is handed over to WhatsApp already written: the visitor only presses
// send. `encodeURIComponent` is what keeps line breaks and accents intact.
function buildWhatsAppUrl({ name, contactInfo, message }) {
  const lines = [`Ola! Sou ${name.trim()}.`, `Meu contato: ${contactInfo.trim()}.`]
  if (message.trim()) lines.push(message.trim())
  return `${contact.whatsappUrl}?text=${encodeURIComponent(lines.join('\n'))}`
}

export default function PsychologyOffice() {
  const [openQuestion, setOpenQuestion] = useState(faq[0].question)
  const [form, setForm] = useState(EMPTY_FORM)
  const [feedback, setFeedback] = useState(null)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setFeedback(null)
  }

  function handleSubmit(event) {
    event.preventDefault() // keeps the page from reloading

    if (!form.name.trim() || !form.contactInfo.trim()) {
      setFeedback({ severity: 'warning', text: 'Preencha seu nome e um telefone ou e-mail para o retorno.' })
      return
    }

    // The form keeps what was typed: if the new tab is blocked, the visitor can
    // use the link inside the alert instead of writing everything again.
    const url = buildWhatsAppUrl(form)
    window.open(url, '_blank', 'noopener,noreferrer')

    setFeedback({
      severity: 'success',
      text: `Prontinho, ${form.name.trim().split(' ')[0]}! Abrimos o WhatsApp com sua mensagem escrita — falta so enviar.`,
      url,
    })
  }

  return (
    <Stack spacing={7}>
      {/* ─────────── Hero ─────────── */}
      <Box component="section">
        <Typography variant="overline" color="primary">
          {office.tagline}
          <Box component="span" sx={{ color: 'text.disabled' }}>
            {' · '}
          </Box>
          <Box component="span" sx={{ color: 'text.secondary' }}>
            {psychologist.crp}
          </Box>
        </Typography>

        <Typography variant="h1" sx={{ mt: 1.5, maxWidth: 780 }}>
          {office.headline}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2.5, maxWidth: 620 }}>
          {office.intro}
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mt: 4 }}>
          <Button
            variant="contained"
            href={contact.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            startIcon={<ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />}
          >
            Agendar uma conversa
          </Button>
          <Button variant="outlined" color="inherit" href="#como-funciona">
            Como funciona
          </Button>
        </Stack>

        <Stack direction="row" spacing={2.5} flexWrap="wrap" useFlexGap sx={{ mt: 4 }}>
          {highlights.map(({ icon: Icon, label }) => (
            <Stack key={label} direction="row" spacing={1} alignItems="center">
              <Icon sx={{ fontSize: 18, color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Divider />

      {/* ─────────── Services ─────────── */}
      <Box component="section">
        <SectionHeading
          overline="ATENDIMENTOS"
          title="Como posso ajudar"
          description="Cada processo comeca com uma conversa sobre o que voce esta buscando. A partir dai definimos o formato que faz mais sentido."
        />

        <Columns>
          {services.map(({ icon: Icon, title, description, detail }) => (
            <Card key={title} sx={{ p: 3 }}>
              <Icon sx={{ fontSize: 22, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {description}
              </Typography>
              <Chip label={detail} size="small" variant="outlined" sx={{ mt: 2.5 }} />
            </Card>
          ))}
        </Columns>
      </Box>

      {/* ─────────── How it works ─────────── */}
      <Box component="section" id="como-funciona">
        <SectionHeading overline="PRIMEIROS PASSOS" title="Do primeiro contato a primeira sessao" />

        <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {steps.map((step, index) => (
            <Card key={step.title} sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: 'primary.main',
                  fontFamily: (theme) => theme.typography.fontFamilyMono,
                }}
              >
                {index + 1}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {step.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>

      {/* ─────────── About ─────────── */}
      <Box component="section">
        <SectionHeading overline="QUEM ATENDE" title={psychologist.name} />

        <Card sx={{ p: { xs: 3, md: 4 } }}>
          <Columns>
            <Box>
              <Typography variant="overline" color="text.secondary">
                {psychologist.approach}
              </Typography>
              {psychologist.bio.map((paragraph) => (
                <Typography key={paragraph} variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {paragraph}
                </Typography>
              ))}
              <Typography
                variant="body2"
                color="text.disabled"
                sx={{ mt: 2.5, fontFamily: (theme) => theme.typography.fontFamilyMono }}
              >
                {psychologist.crp}
              </Typography>
            </Box>

            <Box>
              <Typography variant="overline" color="text.secondary">
                FORMACAO
              </Typography>
              <Stack spacing={1.25} sx={{ mt: 2 }}>
                {psychologist.credentials.map((credential) => (
                  <Stack key={credential} direction="row" spacing={1.25} alignItems="flex-start">
                    <CheckCircleOutlineIcon sx={{ fontSize: 17, color: 'primary.main', mt: 0.25 }} />
                    <Typography variant="body2" color="text.secondary">
                      {credential}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Columns>
        </Card>
      </Box>

      {/* ─────────── FAQ ─────────── */}
      <Box component="section">
        <SectionHeading overline="DUVIDAS FREQUENTES" title="Antes de marcar" />

        <Card sx={{ px: { xs: 1, sm: 2 } }}>
          {faq.map((item, index) => (
            <Accordion
              key={item.question}
              disableGutters
              elevation={0}
              square
              expanded={openQuestion === item.question}
              onChange={() => setOpenQuestion(openQuestion === item.question ? null : item.question)}
              sx={{
                bgcolor: 'transparent',
                borderTop: index === 0 ? 0 : 1,
                borderColor: 'divider',
                '&::before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 20 }} />} sx={{ px: 1, py: 0.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 1, pt: 0, pb: 2.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 620 }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Card>
      </Box>

      {/* ─────────── Contact ─────────── */}
      <Box component="section">
        <SectionHeading
          overline="CONTATO"
          title="Vamos conversar"
          description="Escreva contando brevemente o que voce procura. O retorno chega em ate um dia util, sempre por onde voce preferir."
        />

        <Columns>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2.5}>
              {contactChannels.map(({ icon: Icon, label, value }) => (
                <Stack key={label} direction="row" spacing={1.75} alignItems="flex-start">
                  <Icon sx={{ fontSize: 19, color: 'text.disabled', mt: 0.25 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value}
                    </Typography>
                  </Box>
                </Stack>
              ))}

              <Stack direction="row" spacing={1.75} alignItems="flex-start">
                <EmailOutlinedIcon sx={{ fontSize: 19, color: 'text.disabled', mt: 0.25 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    E-mail
                  </Typography>
                  <Link
                    href={`mailto:${contact.email}`}
                    variant="body2"
                    underline="hover"
                    color="text.secondary"
                    sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}
                  >
                    {contact.email}
                  </Link>
                </Box>
              </Stack>

              <Divider />

              <Button
                variant="outlined"
                color="inherit"
                href={contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                startIcon={<ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />}
              >
                Falar no WhatsApp
              </Button>
            </Stack>
          </Card>

          <Card sx={{ p: 3 }}>
            <Stack component="form" onSubmit={handleSubmit} spacing={2}>
              <TextField
                label="Seu nome"
                size="small"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                fullWidth
              />
              <TextField
                label="Telefone ou e-mail"
                size="small"
                value={form.contactInfo}
                onChange={(event) => updateField('contactInfo', event.target.value)}
                fullWidth
              />
              <TextField
                label="Como posso ajudar?"
                placeholder="Conte em poucas linhas o que voce esta buscando."
                size="small"
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                multiline
                minRows={4}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />}
              >
                Enviar pelo WhatsApp
              </Button>

              <Typography variant="body2" color="text.disabled">
                Ao enviar, o WhatsApp abre com sua mensagem ja escrita — voce so confirma.
              </Typography>

              {feedback && (
                <Alert severity={feedback.severity} variant="outlined">
                  {feedback.text}
                  {feedback.url && (
                    <>
                      {' '}
                      <Link href={feedback.url} target="_blank" rel="noreferrer" underline="hover">
                        Nao abriu? Toque aqui.
                      </Link>
                    </>
                  )}
                </Alert>
              )}
            </Stack>
          </Card>
        </Columns>
      </Box>
    </Stack>
  )
}
