/**
 * Formata CPF com pontuação automática: xxx.xxx.xxx-xx
 */
export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

/**
 * Remove formatação do CPF (apenas números)
 */
export function unformatCPF(value: string): string {
  return value.replace(/\D/g, "")
}

/**
 * Valida CPF (formato e dígitos verificadores)
 */
export function isValidCPF(cpf: string): boolean {
  const digits = unformatCPF(cpf)
  if (digits.length !== 11) return false
  if (/^(\d)\1+$/.test(digits)) return false // sequência repetida

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i)
  let check = 11 - (sum % 11)
  if (check >= 10) check = 0
  if (check !== parseInt(digits[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i)
  check = 11 - (sum % 11)
  if (check >= 10) check = 0
  if (check !== parseInt(digits[10])) return false

  return true
}
