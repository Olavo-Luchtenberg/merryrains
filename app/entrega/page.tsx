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
        Após a confirmação do pagamento, o usuário terá acesso ao produto por duas vias:
      </p>
      <ul>
        <li>
          <strong>Página de Sucesso:</strong> O site redirecionará automaticamente para uma
          página de confirmação contendo o botão de Download ou acesso ao Leitor Web.
        </li>
        <li>
          <strong>E-mail de Entrega:</strong> Um link de acesso será enviado para o
          endereço de e-mail cadastrado no momento da compra.
        </li>
      </ul>
      <p>
        <strong>Nota:</strong> É responsabilidade exclusiva do usuário preencher o e-mail
        corretamente e validar sua identidade via OTP (se solicitado).
      </p>

      <h2>3. Validade do Link e Armazenamento</h2>
      <p>
        <strong>Acesso Vitalício:</strong> Uma vez adquirido, o conteúdo fica vinculado à
        sua conta no merryrains.com de forma vitalícia, salvo em casos de descontinuidade da
        plataforma (com aviso prévio de 90 dias) ou violação dos Termos de Uso.
      </p>
      <p>
        <strong>Segurança do Arquivo:</strong> Recomendamos que o usuário realize o
        download e o backup do arquivo em local seguro. O merryrains.com garante a
        disponibilidade do link para re-download enquanto a conta do usuário estiver
        ativa.
      </p>

      <h2>4. Protocolo em Caso de Não Recebimento</h2>
      <p>Se você não visualizar o acesso imediatamente após o pagamento:</p>
      <ul>
        <li>
          <strong>Verifique a Caixa de Spam/Lixo Eletrônico:</strong> Filtros de e-mail
          podem desviar mensagens automáticas.
        </li>
        <li>
          <strong>Confirme a Transação:</strong> Verifique se o valor foi efetivamente
          debitado e se você recebeu o comprovante do Gateway de Pagamento.
        </li>
        <li>
          <strong>Suporte Técnico:</strong> Se após 30 minutos o e-mail não chegar e o
          acesso não estiver disponível na sua conta, entre em contato via{" "}
          <a href="mailto:suporte@merryrains.com" className="text-primary hover:underline">
            suporte@merryrains.com
          </a>{" "}
          com o assunto &quot;Urgente: Não Recebi meu Produto&quot;, anexando o comprovante
          de pagamento.
        </li>
      </ul>

      <h2>5. Requisitos Técnicos para Consumo</h2>
      <p>
        O usuário declara estar ciente de que, para acessar o conteúdo, necessita de:
      </p>
      <ul>
        <li>Conexão estável com a internet para o download inicial.</li>
        <li>
          Software compatível com o formato do arquivo (ex: Adobe Acrobat Reader para
          PDFs, leitores de ePub, ou navegador atualizado para Leitor Web).
        </li>
      </ul>

      <h2>6. Rastreabilidade de Entrega</h2>
      <p>
        Para fins de segurança e proteção contra fraudes, o merryrains.com registra o
        endereço IP, a data e a hora de cada download realizado. Estes logs servem como
        comprovante de entrega efetiva para fins legais e de disputa junto a operadoras de
        cartão.
      </p>
    </LegalPageLayout>
  )
}
