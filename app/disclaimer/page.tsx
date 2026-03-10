import { LegalPageLayout } from "@/components/legal-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aviso Legal e Disclaimer | Merry Rains",
  description: "Aviso Legal e Isenção de Responsabilidade do merryrains.com",
}

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="AVISO LEGAL E ISENÇÃO DE RESPONSABILIDADE"
      subtitle="merryrains.com – Ecossistema de Livros Digitais | Última atualização: 10 de março de 2026"
    >
      <p>
        Todo o conteúdo disponibilizado pelo merryrains.com e suas obras digitais possui
        caráter exclusivamente informativo e educacional. O autor e a plataforma não
        garantem resultados financeiros, de saúde, profissionais ou de qualquer outra
        natureza, uma vez que o sucesso de qualquer metodologia depende da implementação
        individual, dedicação, contexto e fatores externos fora de nosso controle.
      </p>

      <p>
        Nenhuma informação contida em nossos livros deve ser interpretada como
        aconselhamento jurídico, médico ou financeiro profissional. Ao consumir este
        conteúdo, você concorda que o uso das estratégias e informações é por sua conta e
        risco, isentando o merryrains.com de qualquer responsabilidade por decisões
        tomadas ou perdas e danos decorrentes de sua aplicação.
      </p>
    </LegalPageLayout>
  )
}
