import { useCallback } from 'react';

/**
 * A custom hook to manage table column sorting order logic.
 * It provides a function to update the order based on user interaction.
 * The order cycles through 'ASC', 'DESC', and no order ('') when the same column is clicked.
 * Clicking a new column sets the order to 'ASC'.
 *
 * @param {string} order The current sorting order.
 * @param {Function} setOrder The function to update the sorting order.
 * @returns {Function} The function to handle updating the order based on column clicks.
 */
function useColumnOrderHandler(order, setOrder) {
  const handleSetOrder = useCallback(
    (column) => {
      const currentColumn = order.split(':')[0];
      const currentDirection = order.split(':')[1];

      if (currentColumn === column) {
        // Cycle through 'ASC', 'DESC', and no order ('')
        switch (currentDirection) {
          case 'ASC':
            setOrder(`${column}:DESC`);
            break;
          case 'DESC':
            setOrder('');
            break;
          default:
            setOrder(`${column}:ASC`);
            break;
        }
      } else {
        // Default to ascending order for a new column
        setOrder(`${column}:ASC`);
      }
    },
    [order, setOrder],
  );

  return handleSetOrder;
}

export { useColumnOrderHandler };
