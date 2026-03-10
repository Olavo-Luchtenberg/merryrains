import { LegalPageLayout } from "@/components/legal-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Entrega | Merry Rains",
  description: "Política de Entrega e Disponibilização de Conteúdo do merryrains.com",
}

export default function EntregaPage() {
  return (
    <LegalPageLayout
      title="Política de Entrega e Disponibilização de Conteúdo"
      subtitle="merryrains.com – Ecossistema de Livros Digitais | Última atualização: 10 de março de 2026"
    >
      <p>
        No merryrains.com, a entrega dos seus livros digitais é processada de forma
        automatizada e instantânea. Por não operarmos com logística física, o acesso ao
        conteúdo é liberado no momento em que a instituição financeira confirma o seu
        pagamento.
      </p>

      <h2>1. Prazos de Disponibilização</h2>
      <p>
        A liberação do conteúdo ocorre nos seguintes prazos, contados a partir da
        confirmação do pagamento:
      </p>
      <ul>
        <li>
          <strong>Pix e Cartão de Crédito:</strong> Disponibilização imediata (em tempo
          real).
        </li>
        <li>
          <strong>Boleto Bancário</strong> (se aplicável): De 24 a 48 horas úteis (prazo de
          compensação bancária).
        </li>
      </ul>

      <h2>2. Métodos de Acesso ao Conteúdo</h2>
      <p>
        Após a confirmação do pagamento, o usuário receberá acesso ao conteúdo através de
        e-mail de confirmação e na área &quot;Biblioteca&quot; do site, onde poderá ler
        online ou fazer o download do material conforme disponibilizado.
      </p>
    </LegalPageLayout>
  )
}
