import { LegalPageLayout } from "@/components/legal-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ Jurídico | Merry Rains",
  description: "Dúvidas frequentes sobre aspectos jurídicos e segurança do merryrains.com",
}

export default function FaqJuridicoPage() {
  return (
    <LegalPageLayout
      title="DÚVIDAS FREQUENTES (JURÍDICO E SEGURANÇA)"
      subtitle="merryrains.com – Ecossistema de Livros Digitais | Última atualização: 10 de março de 2026"
    >
      <h2>1. O acesso ao livro é vitalício?</h2>
      <p>
        Sim. Uma vez adquirido, o conteúdo estará disponível na sua biblioteca por tempo
        indeterminado, enquanto a plataforma estiver ativa. Recomendamos, contudo, que
        você faça o download e salve em local seguro.
      </p>

      <h2>2. Posso emprestar meu e-book para um amigo ou parente?</h2>
      <p>
        Não. A licença de uso é individual e intransferível. O arquivo está vinculado aos
        seus dados pessoais. O compartilhamento configura violação de direitos autorais e
        pode levar ao bloqueio da sua conta.
      </p>

      <h2>3. Meus dados de CPF e nascimento estão seguros com a validação do Serpro?</h2>
      <p>
        Absolutamente. A consulta ao Serpro/Governo Federal serve apenas para validar que
        você é uma pessoa real e maior de idade. Nós não armazenamos esses dados de forma
        que permita reconstruir a identidade; utilizamos apenas o resultado da validação
        (aprovado/recusado) para fins de segurança da transação.
      </p>
    </LegalPageLayout>
  )
}
