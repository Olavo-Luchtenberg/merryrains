import { LegalPageLayout } from "@/components/legal-page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Cookies | Merry Rains",
  description: "Política de Gestão de Cookies e Tecnologias de Rastreamento do merryrains.com",
}

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Política de Gestão de Cookies e Tecnologias de Rastreamento"
      subtitle="merryrains.com – Ecossistema de Livros Digitais | Última atualização: 10 de março de 2026"
    >
      <p>
        No merryrains.com, utilizamos cookies e tecnologias similares para garantir que sua
        experiência de aquisição de livros digitais seja fluida, segura e personalizada.
        Esta política explica de forma transparente o que são essas tecnologias, como as
        utilizamos e como você pode gerenciá-las.
      </p>

      <h2>1. O que são Cookies?</h2>
      <p>
        Cookies são pequenos arquivos de texto enviados pelo nosso servidor para o seu
        navegador ou dispositivo. Eles permitem que o site &quot;lembre&quot; de você durante sua
        navegação ou em visitas futuras, garantindo que você não precise preencher seus
        dados de validação repetidamente e que seu carrinho de compras não se perca.
      </p>

      <h2>2. Categorias de Cookies que Utilizamos</h2>
      <p>
        Dividimos nossas tecnologias de rastreamento em quatro níveis de necessidade e
        funcionalidade:
      </p>

      <h3>A. Cookies Estritamente Necessários (Obrigatórios)</h3>
      <p>
        Esses cookies são essenciais para o funcionamento básico do site. Sem eles, o
        ecossistema de venda digital não opera.
      </p>
      <ul>
        <li>
          <strong>Finalidade:</strong> Manter o login ativo, gerenciar o carrinho de
          compras e garantir a segurança durante o processo de validação de CPF e
          maioridade.
        </li>
        <li>
          <strong>Base Legal:</strong> Execução de Contrato e Segurança.
        </li>
      </ul>

      <h3>B. Cookies Funcionais</h3>
      <p>
        Permitem que o site forneça funcionalidades avançadas e personalização.
      </p>
      <ul>
        <li>
          <strong>Finalidade:</strong> Lembrar suas preferências de idioma, tema da interface
          ou o último capítulo visualizado em nosso leitor web (se aplicável).
        </li>
        <li>
          <strong>Base Legal:</strong> Interesse Legítimo.
        </li>
      </ul>

      <h3>C. Cookies de Desempenho e Analíticos</h3>
      <p>
        Ajudam-nos a entender como os usuários interagem com o site, coletando
        informações de forma anônima.
      </p>
      <ul>
        <li>
          <strong>Finalidade:</strong> Identificar erros de carregamento, páginas mais
          visitadas e a eficácia de nossas campanhas de lançamento de e-books. Utilizamos
          ferramentas como Google Analytics (anonimizado).
        </li>
        <li>
          <strong>Base Legal:</strong> Interesse Legítimo (com opção de Opt-out).
        </li>
      </ul>

      <h3>D. Cookies de Segurança e Prevenção à Fraude</h3>
      <ul>
        <li>
          <strong>Finalidade:</strong> Monitorar padrões de acesso para prevenir ataques de
          &quot;botnets&quot; e tentativas de fraude de identidade durante o checkout.
        </li>
        <li>
          <strong>Base Legal:</strong> Prevenção à Fraude (Art. 7º, IX, LGPD).
        </li>
      </ul>

      <h2>3. Cookies de Terceiros</h2>
      <p>
        Como operamos com tecnologias globais, alguns cookies são gerenciados por parceiros
        confiáveis:
      </p>
      <ul>
        <li>
          <strong>Gateways de Pagamento:</strong> Para garantir que a transação financeira
          ocorra em ambiente isolado e seguro.
        </li>
        <li>
          <strong>Validação de Identidade:</strong> Cookies temporários que facilitam a
          comunicação com as APIs de validação governamental.
        </li>
        <li>
          <strong>Infraestrutura:</strong> Cookies de balanceamento de carga (AWS) para
          garantir que o site não caia durante picos de acesso.
        </li>
      </ul>

      <h2>4. Controle e Gestão de Preferências</h2>
      <p>Você tem o poder de decidir. Com exceção dos Cookies Estritamente Necessários:</p>
      <ul>
        <li>
          <strong>Banner de Cookies:</strong> Ao acessar o site pela primeira vez, você
          verá nosso centro de preferências.
        </li>
        <li>
          <strong>Configurações do Navegador:</strong> Você pode bloquear ou excluir
          cookies diretamente nas configurações do seu browser (Chrome, Firefox, Safari,
          Edge).
        </li>
        <li>
          <strong>Modo Incógnito:</strong> Navegar em aba anônima impedirá que cookies
          persistentes fiquem gravados após o fechamento da sessão.
        </li>
      </ul>

      <h2>5. Retenção de Dados de Cookies</h2>
      <ul>
        <li>
          <strong>Cookies de Sessão:</strong> São apagados automaticamente quando você
          fecha o navegador.
        </li>
        <li>
          <strong>Cookies Persistentes:</strong> Permanecem no seu dispositivo por um
          período determinado (ex: 30 dias para lembrar seu login) ou até serem excluídos
          manualmente por você.
        </li>
      </ul>

      <h2>6. Contato e Transparência</h2>
      <p>
        Se tiver dúvidas técnicas sobre como os cookies afetam a segurança da sua
        identidade digital no merryrains.com, entre em contato com nosso Encarregado de
        Dados (DPO):
      </p>
      <p>
        <strong>Canal:</strong>{" "}
        <a
          href="mailto:suporte@merryrains.com"
          className="text-primary hover:underline"
        >
          suporte@merryrains.com
        </a>
      </p>
      <p>
        <strong>Assunto:</strong> Gestão de Cookies / LGPD
      </p>
    </LegalPageLayout>
  )
}
