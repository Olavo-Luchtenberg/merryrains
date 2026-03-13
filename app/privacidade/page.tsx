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
          <br />
          <strong>Finalidade:</strong> Validação de maioridade e capacidade civil para
          contratar, via integração com sistemas governamentais (Serpro/Datavalid).
          Proteção contra falsidade ideológica.
        </li>
        <li>
          <strong>Entrega e Comunicação:</strong> Endereço de e-mail e número de celular
          (WhatsApp/SMS).
          <br />
          <strong>Finalidade:</strong> Envio do produto digital, suporte técnico e
          autenticação em duas etapas (2FA).
        </li>
        <li>
          <strong>Dados Técnicos e Geográficos:</strong> Endereço IP, registros de acesso
          (logs), tipo de navegador e ID do dispositivo.
          <br />
          <strong>Finalidade:</strong> Prevenção a fraudes e cumprimento do Art. 15 do
          Marco Civil da Internet.
        </li>
      </ul>

      <h2>2. Bases Legais para o Tratamento (Art. 7º, LGPD)</h2>
      <p>Não tratamos dados sem amparo legal. Nossas operações baseiam-se em:</p>
      <ul>
        <li>
          <strong>Execução de Contrato:</strong> Para que você receba o livro digital
          adquirido.
        </li>
        <li>
          <strong>Cumprimento de Obrigação Legal/Regulatória:</strong> Manutenção de
          registros fiscais e de acesso.
        </li>
        <li>
          <strong>Prevenção à Fraude e Segurança do Titular:</strong> Garantir que ninguém
          se passe por você em nossa plataforma.
        </li>
      </ul>

      <h2>3. Transferência Internacional e Compartilhamento</h2>
      <p>
        O merryrains.com opera com parceiros globais de alta tecnologia. O compartilhamento
        ocorre apenas com:
      </p>
      <ul>
        <li>
          <strong>Gateways de Pagamento:</strong> Processamento criptografado de valores.
        </li>
        <li>
          <strong>APIs de Validação Governamental:</strong> Apenas para conferência de
          autenticidade (CPF/Nascimento).
        </li>
        <li>
          <strong>Provedores de Infraestrutura (Nuvem e APIs):</strong> Como utilizamos
          ferramentas de classe mundial (ex: Twilio, SendGrid, AWS), seus dados podem ser
          processados em servidores nos EUA, sempre sob cláusulas contratuais que garantem
          nível de proteção equivalente à LGPD.
        </li>
      </ul>

      <h2>4. Ciclo de Vida e Retenção de Dados (Art. 15 e 16)</h2>
      <p>Os dados não são mantidos para sempre. Seguimos a seguinte tabela de retenção:</p>
      <ul>
        <li>
          <strong>Dados de Transação/Fiscais:</strong> Mantidos por 5 anos após a compra
          (conforme Código Civil e Tributário).
        </li>
        <li>
          <strong>Logs de Acesso:</strong> Mantidos por 6 meses (conforme Marco Civil da
          Internet).
        </li>
        <li>
          <strong>Dados de Cadastro (Inativos):</strong> Excluídos ou anonimizados após 24
          meses de inatividade, salvo se houver base legal para manutenção.
        </li>
      </ul>

      <h2>5. Segurança de Nível Militar</h2>
      <p>
        Implementamos uma arquitetura de &quot;Defesa em Profundidade&quot;:
      </p>
      <ul>
        <li>
          <strong>Criptografia em Repouso e em Trânsito:</strong> Protocolos TLS 1.3 para
          tráfego e AES-256 para armazenamento.
        </li>
        <li>
          <strong>Monitoramento Ativo:</strong> Bloqueio automático de tentativas de acesso
          não autorizadas e inspeções de código.
        </li>
        <li>
          <strong>Sigilo Profissional:</strong> Nossa equipe é treinada e vinculada a termos
          de confidencialidade rigorosos.
        </li>
      </ul>

      <h2>6. Direitos do Titular (Art. 18)</h2>
      <p>
        Você é o dono dos seus dados. A qualquer momento, via nosso canal oficial, você
        pode solicitar:
      </p>
      <ul>
        <li>Acesso, correção ou exclusão de dados.</li>
        <li>Informação sobre com quem compartilhamos seus dados.</li>
        <li>Revogação de consentimento para marketing.</li>
      </ul>
      <p>
        <strong>Prazo de Resposta:</strong> Comprometemo-nos a responder em até 15 dias
        corridos.
      </p>

      <h2>7. Encarregado de Proteção de Dados (DPO)</h2>
      <p>
        Para exercer seus direitos ou tirar dúvidas técnicas, entre em contato com nosso
        Encarregado:
      </p>
      <p>
        <strong>Canal:</strong>{" "}
        <a href="mailto:suporte@merryrains.com" className="text-primary hover:underline">
          suporte@merryrains.com
        </a>{" "}
        (Assunto: LGPD/DPO)
      </p>

      <h2>Aviso de Consentimento e Aceite</h2>
      <p>
        Ao clicar em &quot;Finalizar Compra&quot;, você declara ciência e autoriza
        expressamente a validação de seus dados junto aos órgãos competentes para fins de
        verificação de identidade e proteção contra fraude, bem como o processamento
        técnico necessário para a entrega do seu produto digital.
      </p>
    </LegalPageLayout>
  )
}
