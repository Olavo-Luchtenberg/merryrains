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
        forma plena desde que o conteúdo digital não tenha sido integralmente consumido.
      </p>
      <p>
        <strong>Monitoramento de Acesso:</strong> Para fins de conformidade e prevenção
        de fraude, nosso sistema registra o histórico de downloads e a visualização das
        páginas no leitor web. O acesso excessivo ou o download completo do arquivo pode
        ser interpretado como consumo do produto, o que, sob certas jurisprudências,
        descaracteriza a natureza do &quot;arrependimento&quot; por uso efetivo do bem.
      </p>

      <h2>2. Defeitos Técnicos e Incompatibilidade</h2>
      <p>
        Caso você encontre dificuldades para abrir ou ler o arquivo (corrupção de dados
        ou erro de servidor):
      </p>
      <p>
        <strong>Suporte Técnico:</strong> O usuário deve entrar em contato com{" "}
        <a href="mailto:suporte@merryrains.com" className="text-primary hover:underline">
          suporte@merryrains.com
        </a>{" "}
        informando o erro. Comprometemo-nos a resolver o problema técnico ou enviar um
        novo arquivo em até 48 horas úteis.
      </p>
      <p>
        <strong>Impossibilidade de Entrega:</strong> Se o problema persistir e o
        merryrains.com não conseguir entregar o arquivo em formato funcional após o
        suporte, o reembolso será realizado imediatamente, independente do prazo de 7
        dias.
      </p>

      <h2>3. Procedimento de Reembolso</h2>
      <p>Uma vez solicitada a desistência dentro do prazo legal:</p>
      <p>
        <strong>Cancelamento de Acesso:</strong> O link de download será invalidado e o
        acesso à área de membros (se houver) será revogado instantaneamente.
      </p>
      <p>
        <strong>Cartão de Crédito:</strong> Notificaremos a operadora do cartão em até 5
        dias úteis. O estorno poderá aparecer em sua fatura em até 2 ciclos
        subsequentes, conforme as regras da sua instituição financeira.
      </p>
      <p>
        <strong>Pix:</strong> O reembolso será creditado na conta de origem da transação
        em até 72 horas após a aprovação da solicitação.
      </p>

      <h2>4. Exceções e Perda de Garantia</h2>
      <p>Não haverá direito a reembolso nas seguintes situações:</p>
      <ul>
        <li>
          Solicitações feitas após o prazo de 7 (sete) dias corridos.
        </li>
        <li>
          Identificação de violação dos Termos de Propriedade Intelectual (ex: tentativa
          de compartilhamento ou pirataria do arquivo antes da solicitação de reembolso).
        </li>
        <li>
          Incompatibilidade de software de terceiros no dispositivo do usuário (ex: o
          usuário não possui um leitor de PDF instalado), desde que o arquivo do site
          esteja funcionando perfeitamente.
        </li>
      </ul>

      <h2>5. Como solicitar</h2>
      <p>
        Para iniciar um processo de devolução, envie um e-mail para{" "}
        <a href="mailto:suporte@merryrains.com" className="text-primary hover:underline">
          suporte@merryrains.com
        </a>{" "}
        com os seguintes dados:
      </p>
      <ul>
        <li>
          <strong>Assunto:</strong> Solicitação de Reembolso - [Seu Nome Completo]
        </li>
        <li>Número do Pedido / CPF do Comprador.</li>
        <li>
          <strong>Motivo (Opcional):</strong> Seu feedback nos ajuda a melhorar nossas
          obras.
        </li>
      </ul>
    </LegalPageLayout>
  )
}
