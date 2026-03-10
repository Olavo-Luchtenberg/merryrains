import { LegalPageLayout } from "@/components/legal-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Reembolso | Merry Rains",
  description: "Política de Reembolso, Trocas e Direito de Arrependimento do merryrains.com",
}

export default function ReembolsoPage() {
  return (
    <LegalPageLayout
      title="Política de Reembolso, Trocas e Direito de Arrependimento"
      subtitle="merryrains.com – Ecossistema de Livros Digitais | Última atualização: 10 de março de 2026"
    >
      <p>
        O merryrains.com preza pela transparência e pelo respeito ao Código de Defesa do
        Consumidor (CDC). Abaixo, detalhamos como proceder em casos de desistência ou
        problemas técnicos com seus produtos digitais.
      </p>

      <h2>1. Direito de Arrependimento (Art. 49 do CDC)</h2>
      <p>
        Conforme a legislação brasileira, o consumidor tem o prazo de 7 (sete) dias
        corridos, a contar da confirmação do pagamento e disponibilização do acesso, para
        desistir da compra realizada em ambiente virtual.
      </p>
      <p>
        <strong>Condição para o Estorno Integral:</strong> O reembolso será processado de
        forma plena desde que o conteúdo digital não tenha sido integralmente consumido ou
        baixado. Em caso de acesso total ao material, o direito ao reembolso poderá ser
        avaliado conforme as circunstâncias específicas.
      </p>
    </LegalPageLayout>
  )
}
