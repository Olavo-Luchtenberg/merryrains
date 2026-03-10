import { LegalPageLayout } from "@/components/legal-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Declaração de Acessibilidade | Merry Rains",
  description: "Compromisso de acessibilidade digital do merryrains.com",
}

export default function AcessibilidadePage() {
  return (
    <LegalPageLayout
      title="DECLARAÇÃO DE ACESSIBILIDADE"
      subtitle="merryrains.com – Ecossistema de Livros Digitais | Última atualização: 10 de março de 2026"
    >
      <p>
        No merryrains.com, acreditamos que o conhecimento deve ser acessível a todos.
        Estamos empenhados em garantir que nosso ecossistema digital seja utilizável por
        pessoas com diferentes habilidades.
      </p>

      <h2>Nossas Ações</h2>
      <ul>
        <li>Estruturação de site compatível com leitores de tela.</li>
        <li>Contraste de cores otimizado para leitura clara.</li>
        <li>Formatos de arquivos que permitem ajuste de fonte e zoom.</li>
      </ul>

      <p>
        Se você encontrar qualquer barreira de acesso em nosso site ou em nossos livros
        digitais, por favor, entre em contato conosco através do e-mail{" "}
        <a href="mailto:suporte@merryrains.com" className="text-primary hover:underline">
          suporte@merryrains.com
        </a>
        . Seu feedback é fundamental para nossa evolução constante em inclusão digital.
      </p>
    </LegalPageLayout>
  )
}
