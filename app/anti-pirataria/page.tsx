import { LegalPageLayout } from "@/components/legal-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política Anti-Pirataria | Merry Rains",
  description: "Tolerância Zero contra a Pirataria no merryrains.com",
}

export default function AntiPiratariaPage() {
  return (
    <LegalPageLayout
      title="TOLERÂNCIA ZERO CONTRA A PIRATARIA"
      subtitle="merryrains.com – Ecossistema de Livros Digitais | Última atualização: 10 de março de 2026"
    >
      <p>
        O merryrains.com investe pesadamente na proteção de seus autores e obras. Cada
        exemplar digital comercializado é único e contém Marcas d&apos;Água Forenses e
        Metadados Invisíveis que vinculam o arquivo diretamente ao CPF e E-mail do
        comprador (validados via Serpro).
      </p>

      <h2>Monitoramento Ativo</h2>
      <p>
        Utilizamos ferramentas de varredura automatizada que monitoram a internet, redes
        sociais, grupos de Telegram e servidores de compartilhamento 24h por dia.
      </p>

      <h2>Consequências</h2>
      <p>
        A identificação de compartilhamento não autorizado resultará no bloqueio imediato
        da conta do infrator, sem direito a reembolso, e na abertura de processo judicial
        de reparação por danos materiais e morais, conforme a Lei 9.610/98.
      </p>

      <h2>Denúncia</h2>
      <p>
        Se você identificar qualquer conteúdo do merryrains.com sendo distribuído
        ilegalmente, reporte para:{" "}
        <a href="mailto:suporte@merryrains.com" className="text-primary hover:underline">
          suporte@merryrains.com
        </a>{" "}
        (Assunto: Denúncia de Pirataria)
      </p>
    </LegalPageLayout>
  )
}
