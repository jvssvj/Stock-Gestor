// 1. Limpa a string e mantém o formato decimal (ex: "10.50")
// Essa função está ótima para o "onChange" do input!
export function cleanCurrencyString(value: string | number): string {
  if (typeof value === "number") {
    // Se vier um número (ex: 10.5), transformamos em string fixando 2 casas
    value = value.toFixed(2).replace(".", "");
  }

  if (!value) return "0.00";

  // Remove tudo que não é número
  let cleaned = value.toString().replace(/[^\d]/g, "");

  if (cleaned.length === 0) return "0.00";

  // Transforma em decimal (ex: "1250" vira "12.50")
  cleaned = cleaned.padStart(3, "0");
  const integerPart = cleaned.substring(0, cleaned.length - 2);
  const decimalPart = cleaned.substring(cleaned.length - 2);

  return `${integerPart}.${decimalPart}`;
}

// 2. Formata para a moeda brasileira (R$)
// AJUSTE: Agora ela aceita um parâmetro para saber se o valor está em centavos
export function formatToCurrency(value: string | number, isCents = false): string | number {
  let numberValue = parseFloat(String(value));

  if (isNaN(numberValue)) return 0;

  // Se o valor estiver em centavos (vinda do localStorage), divide por 100
  if (isCents) {
    numberValue = numberValue / 100;
  }

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// 3. FUNÇÃO NOVA: Converte o valor do estado (10.50) para centavos (1050)
export function toCents(value: string | number): number {
  return Math.round(parseFloat(String(value)) * 100);
}
