// src/utils/formatters.js

/**
 * Formatea un número al estilo de moneda colombiana (puntos para miles).
 * @param {number} price - El precio a formatear.
 * @returns {string} - El precio formateado como un string, ej: "$ 1.500.000".
 */
export const formatColombianPrice = (price) => {
  // Si el precio no es un número válido, devuelve un valor por defecto.
  if (typeof price !== 'number') {
    return '$ 0';
  }

  // 'es-CO' es el código de localización para español de Colombia.
  // Esto asegura que use '.' para los miles y ',' para los decimales.
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP', // Moneda de referencia
    minimumFractionDigits: 0, // No queremos decimales en la vista principal
    maximumFractionDigits: 0,
  });

  // El formateador por defecto añade "COP". Lo reemplazamos por solo "$" para un look más limpio.
  return formatter.format(price).replace('COP', '$');
};