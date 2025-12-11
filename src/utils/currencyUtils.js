// Limpa a string digitada: remove R$ e converte para um formato numérico com ponto (ex: "1234.56")
export function cleanCurrencyString(value) {
  if (typeof value === "number") {
    value = String(value); // Garante que é string
  }
  if (!value) return "";

  // Remove tudo que não for dígito.
  let cleaned = value.replace(/[^\d]/g, "");

  if (cleaned.length === 0) return "";

  // Trata a entrada como centavos para simular a digitação (ex: 1234 vira 12.34)
  // O número 2 representa as casas decimais.
  cleaned = cleaned.padStart(3, "0"); // Garante que há zeros suficientes, ex: '5' vira '005'

  const integerPart = cleaned.substring(0, cleaned.length - 2);
  const decimalPart = cleaned.substring(cleaned.length - 2);

  // Retorna o formato numérico puro com ponto (ex: "1234.56")
  return `${integerPart}.${decimalPart}`;
}

// Formata o valor numérico puro para o formato de moeda brasileiro (R$ 1.234,56)
export function formatToCurrency(value) {
  const numberValue = parseFloat(value);

  if (isNaN(numberValue)) return "";

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
