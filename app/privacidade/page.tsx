import { LegalPageLayout } from "@/components/legal-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade | Merry Rains",
  description: "Política de Privacidade e Proteção de Dados (LGPD) do merryrains.com",
}

export default function PrivacidadePage() {
  return (
    <LegalPageLayout
      title="Política de Privacidade e Proteção de Dados (LGPD)"
      subtitle="merryrains.com – Ecossistema de Livros Digitais | Última atualização: 10 de março de 2026"
    >
      <p>
        O merryrains.com adota uma postura de &quot;Privacidade por Design&quot; (Privacy by
        Design). Esta Política detalha como tratamos seus dados sob a égide da Lei nº
        13.709/2018 (LGPD), com transparência total sobre a segurança da sua identidade
        digital.
      </p>

      <h2>1. Coleta, Finalidade e Minimização de Dados</h2>
      <p>
        Coletamos apenas o estritamente necessário para a segurança jurídica da transação:
      </p>
      <ul>
        <li>
          <strong>Identificação de Identidade (KYC - Know Your Customer):</strong> Nome, CPF
          e Data de Nascimento.
        </li>
        <li>
          <strong>Finalidade:</strong> Validação de maioridade e capacidade civil para
          contratar, via integração com sistemas governamentais (Serpro e parceiros
          autorizados).
        </li>
      </ul>
    </LegalPageLayout>
  )
}
