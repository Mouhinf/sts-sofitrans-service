/**
 * Formats a BigInt amount in CFA Francs (fr-FR locale).
 */
export function formatFCFA(amount: bigint | number): string {
  return `${new Intl.NumberFormat("fr-FR").format(Number(amount))} FCFA`;
}
