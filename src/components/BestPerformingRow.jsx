import React from 'react';    // Imports React library
import { getValue, formatPrice } from '../utils/bestperformingTableUtils';    // Imports utility functions to get the PNL value and format prices

/**
 * BuildTableRow component displays a single row in the BestPerformingTable.
 * @param {string} symbol - The token symbol.
 * @param {Object} data - The data for the token, including name, price, balance, and balanceInUsd.
 * @param {number} index - The rank of the token in the list.
 * @param {Object} styles - The styling classes for the table.
 * @param {string} selectedFilter - The currently selected filter criteria for PNL.
 * @param {Object} iconsMap - A mapping of token names to their icon URLs.
 * @returns {JSX.Element} The rendered table row for a token.
 */
const BuildTableRow = ({ symbol, data, index, styles, selectedFilter, iconsMap }) => {
  // Calculates the PNL (profit/loss percentage) using a utility function
  const pnl = getValue(data, selectedFilter);

  // Retrieves the icon URL by formatting the token name to match the iconsMap keys
  const iconUrl = iconsMap[data.name.toLowerCase().replace(/\s+/g, '-')];

  // Renders a table row with token details
  return (
    <tr key={symbol} className={styles.tableRow}>
      {/* Displays the rank of the token */}
      <td className={styles.tableCell}>
        <div className="text-lg">{index}</div>
      </td>

      {/* Displays token icon, name, and symbol together */}
      <td className={`${styles.tableCell} flex items-center`}>
        <div className="flex items-center space-x-3">
          {/* Token icon or placeholder */}
          <div className="flex-shrink-0 flex items-center justify-center">
            {iconUrl ? (
              <img src={iconUrl} alt={`${data.name} icon`} className="w-8 h-8" />
            ) : (
              <div className="w-8 h-8" />
            )}
          </div>
          {/* Token name and symbol */}
          <div className="flex flex-col items-start">
            <div className={`${styles.tokenSymbolText}`}>{data.name}</div>
            <div className="text-left">{symbol}</div>
          </div>
        </div>
      </td>

      {/* Displays the token price */}
      <td className={styles.tableCell}>
        <div className="text-lg text-center">
          {formatPrice(data.price.rate)}
        </div>
      </td>

      {/* Displays the PNL with dynamic text color based on its value */}
      <td className={styles.tableCell}>
        <div
          className={`text-lg text-center ${
            pnl === 0
              ? "text-gray-500 dark:text-gray-400"
              : pnl > 0
                ? "text-green-500 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
          }`}
        >
          {pnl.toFixed(1)}%
        </div>
      </td>

      {/* Displays the token balance */}
      <td className={styles.tableCell}>
        <div className="text-lg text-center">
          {data.balance.toFixed(2)}
        </div>
      </td>

      {/* Displays the total balance in USD */}
      <td className={styles.tableCell}>
        <div className="text-lg text-center">
          {data.balanceInUsd.toFixed(2)}
        </div>
      </td>
    </tr>
  );
};

export default BuildTableRow;
