import { LegalPageLayout } from "@/components/legal-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso e Propriedade Intelectual | Merry Rains",
  description: "Termo de Propriedade Intelectual e Licença de Uso do merryrains.com",
}

export default function TermosPage() {
  return (
    <LegalPageLayout
      title="Termo de Propriedade Intelectual e Licença de Uso"
      subtitle="merryrains.com – Ecossistema de Livros Digitais | Última atualização: 10 de março de 2026"
    >
      <p>
        Este documento estabelece as regras de proteção aos ativos intelectuais do
        merryrains.com. Ao acessar o site ou adquirir um produto digital, você concorda
        integralmente com os termos abaixo.
      </p>

      <h2>1. Titularidade e Direitos Autorais</h2>
      <p>
        Todo o conteúdo disponível no ecossistema merryrains.com, incluindo, mas não se
        limitando a:
      </p>
      <ul>
        <li>
          <strong>Obras Digitais:</strong> E-books, PDFs, audiolivros e materiais
          complementares.
        </li>
        <li>
          <strong>Identidade Visual:</strong> Logotipos, design de interface (UI/UX),
          ícones e paletas de cores.
        </li>
        <li>
          <strong>Conteúdo Web:</strong> Textos descritivos, posts de blog, imagens e
          vídeos.
        </li>
        <li>
          <strong>Tecnologia:</strong> Código-fonte, scripts de validação e algoritmos
          proprietários.
        </li>
      </ul>
      <p>
        São de propriedade exclusiva do merryrains.com ou de seus licenciantes, protegidos
        pela Lei de Direitos Autorais (Lei nº 9.610/98) e pela Lei de Propriedade
        Industrial (Lei nº 9.279/96).
      </p>

      <h2>2. Concessão de Licença de Uso (Uso Pessoal)</h2>
      <p>
        A aquisição de um livro digital no merryrains.com não transfere a propriedade da
        obra ao usuário, mas concede uma licença de uso pessoal, não exclusiva,
        intransferível e revogável.
      </p>
      <ul>
        <li>
          <strong>O que você PODE fazer:</strong> Armazenar o arquivo em seus dispositivos
          pessoais e realizar a leitura privada.
        </li>
        <li>
          <strong>O que você NÃO PODE fazer:</strong> Alugar, vender, doar, sublicenciar,
          emprestar ou distribuir o conteúdo a terceiros, seja de forma gratuita ou
          onerosa.
        </li>
      </ul>

      <h2>3. Proibições e Condutas Ilícitas</h2>
      <p>
        É terminantemente proibida, sob as penas da lei civil e criminal, qualquer uma das
        seguintes condutas:
      </p>
      <ul>
        <li>
          <strong>Reprodução e Distribuição:</strong> Copiar, reproduzir ou compartilhar o
          conteúdo em grupos de WhatsApp, Telegram, fóruns, drives compartilhados ou sites
          de pirataria.
        </li>
        <li>
          <strong>Engenharia Reversa:</strong> Tentar burlar sistemas de DRM (Digital
          Rights Management) ou scripts de proteção do site.
        </li>
        <li>
          <strong>Extração de Dados (Scraping):</strong> O uso de bots ou
          &quot;crawlers&quot; para minerar textos ou imagens do nosso catálogo.
        </li>
        <li>
          <strong>Treinamento de IA:</strong> Fica expressamente proibido o uso de
          qualquer conteúdo do site (textos ou livros) para o treinamento de modelos de
          Inteligência Artificial (LLMs) sem autorização prévia por escrito.
        </li>
      </ul>

      <h2>4. Rastreabilidade e Medidas de Proteção</h2>
      <p>
        Para garantir a integridade de nossas obras, o merryrains.com utiliza tecnologias
        de Marca d&apos;Água Dinâmica e Forense.
      </p>
      <ul>
        <li>
          Cada cópia digital é vinculada ao CPF e E-mail do comprador (validados via
          Serpro/Twilio).
        </li>
        <li>
          Esses dados podem estar inseridos de forma visível ou invisível (metadados) no
          arquivo.
        </li>
        <li>
          <strong>Consequência:</strong> Caso um arquivo seja encontrado em sites de
          pirataria, o titular da conta de origem será identificado e responsabilizado
          judicialmente.
        </li>
      </ul>

      <h2>5. Monitoramento e Penalidades</h2>
      <p>O monitoramento de infrações é contínuo. A violação destes termos sujeitará o infrator a:</p>
      <ul>
        <li>
          <strong>Bloqueio Imediato da Conta:</strong> Sem direito a reembolso.
        </li>
        <li>
          <strong>Notificação Extrajudicial:</strong> Com pedido de retirada de conteúdo
          (DMCA Take Down).
        </li>
        <li>
          <strong>Ações Judiciais:</strong> Busca e apreensão, além de indenizações por
          danos materiais e morais (conforme Art. 102 e seguintes da Lei 9.610/98).
        </li>
      </ul>

      <h2>6. Canal de Denúncias</h2>
      <p>
        Se você identificar qualquer conteúdo do merryrains.com sendo comercializado ou
        distribuído ilegalmente, pedimos que colabore com o ecossistema reportando para:
      </p>
      <p>
        <strong>E-mail:</strong>{" "}
        <a href="mailto:suporte@merryrains.com" className="text-primary hover:underline">
          suporte@merryrains.com
        </a>{" "}
        (Assunto: Denúncia de Pirataria)
      </p>
    </LegalPageLayout>
  )
}
