import React, { useEffect, useState } from 'react'; // Imports React library, along with useEffect and useState hooks for managing component state and side effects
import TokenRow from './TokenRow'; // Imports a TokenRow component to render individual token rows
import { AssestsTableStyle } from "../styles/AssetsTableStyle"; // Imports a styling object for the table layout
import { getImages } from '../utils/coinGecko'; // Imports a utility function to fetch token images


/**
 * AssetsTable component displays a table of tokens with their details.
 * @param {Object[]} tokens - Array of token data, where each token is represented by [symbol, data].
 * @returns {JSX.Element} The rendered AssetsTable component.
 */
const AssetsTable = ({ tokens }) => {
  // iconsMap will store the mapping from token names to icon URLs
  const [iconsMap, setIconsMap] = useState({});
  // loading indicates whether token icons are being fetched
  const [loading, setLoading] = useState(true);

  // useEffect to fetch token icons when tokens change
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        // Check if tokens array is non-empty
        if (tokens && tokens.length > 0) {
          // Extract token names from token data
          const tokenNames = tokens.map(([symbol, data]) => data.name);
          // Retrieve corresponding icon URLs
          const images = await getImages(tokenNames);
          // Update the icon mapping state
          setIconsMap(images);
        }
      } catch (error) {
        // Log any fetch errors
        console.error("Error fetching icons:", error);
      } finally {
        // Always stop loading, whether success or failure
        setLoading(false);
      }
    };

    // Call the async function to initiate icon fetching
    fetchIcons();
  }, [tokens]); // Rerun effect when tokens prop changes

  // Return the JSX structure for the table
  return (
    <div id="AssetsTable" className={AssestsTableStyle.tableContainer}>
      <table className={AssestsTableStyle.table}>
        <thead className={AssestsTableStyle.thead}>
          <tr>
            <th className={AssestsTableStyle.th}>Token Name</th>
            <th className={AssestsTableStyle.th}>Amount</th>
            <th className={AssestsTableStyle.th}>24h Change (%)</th>
            <th className={AssestsTableStyle.th}>Price (USD)</th>
            <th className={AssestsTableStyle.th}>Total (USD)</th>
          </tr>
        </thead>
        <tbody className={AssestsTableStyle.tbody}>
          {/* Show a spinner row when loading */}
          {loading && (
            <tr>
              <td colSpan="5">
                <div className={AssestsTableStyle.spinnerContainer}>
                  <div className={AssestsTableStyle.spinner}></div>
                </div>
              </td>
            </tr>
          )}
          {/* Show 'No Assets Found' if not loading and tokens array is empty */}
          {!loading && (!tokens || tokens.length === 0) && (
            <tr>
              <td colSpan="5">
                <div className={AssestsTableStyle.noDataContainer}>
                  No Assets Found.
                </div>
              </td>
            </tr>
          )}
          {/* Map through tokens array to display each token in a row */}
          {!loading &&
            tokens &&
            tokens.map(([symbol, data]) => (
              <TokenRow key={symbol} symbol={symbol} data={data} iconsMap={iconsMap} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the AssetsTable component by default
export default AssetsTable;
