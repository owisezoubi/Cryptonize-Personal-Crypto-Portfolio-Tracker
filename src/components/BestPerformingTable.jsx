// src/components/BestPerformingTable.jsx

import React, { useState, useEffect } from 'react'; // React library with state and effect hooks
import BuildTableRow from './BestPerformingRow'; // Row component for rendering each token
import { BestPerformingTableStyle } from '../styles/BestPerformingTableStyle'; // Styling classes for the table
import { getImages } from '../utils/coinGecko'; // Utility function to fetch icons
import { sortTokensByPNL } from '../utils/bestperformingTableUtils'; // Utility function to sort tokens by PNL
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component

// The BestPerformingTable component displays a top 10 list of tokens ranked by selected PNL criteria.
const BestPerformingTable = ({ tokens }) => {
  // Stores the current filter choice (24h, 7d, or 30d PNL)
  const [selectedFilter, setSelectedFilter] = useState('PNL_24h');
  // Maps token names to their icon URLs
  const [iconsMap, setIconsMap] = useState({});
  // Controls the loading spinner while fetching icons
  const [loading, setLoading] = useState(true);

  // Fetches token icons whenever the tokens prop changes
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        // If there are no tokens, stop loading immediately
        if (!tokens || tokens.length === 0) {
          setLoading(false);
          return;
        }

        // Extract token names, ensuring they exist
        const tokenNames = tokens.map(([_, data]) => data?.name).filter(Boolean);
        // If no valid token names, stop loading
        if (tokenNames.length === 0) {
          setLoading(false);
          return;
        }

        // Fetch the icons from CoinGecko utilities
        const images = await getImages(tokenNames);
        setIconsMap(images);
      } catch (error) {
        console.error('Error fetching token icons:', error);
      } finally {
        // Always stop loading, whether success or error
        setLoading(false);
      }
    };

    fetchIcons();
  }, [tokens]);

  // Handles filter selection changes (24h, 7d, 30d)
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Sorts tokens by the current filter and takes the top 10
  const sortedData = tokens && tokens.length > 0 
    ? sortTokensByPNL(tokens, selectedFilter) 
    : [];
  const topData = sortedData.slice(0, 10);

  return (
    <>
      {/* Filter Selection */}
      <div className={BestPerformingTableStyle.filterContainer}>
        <div className="text-lg font-semibold">Choose Criteria</div>
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className={BestPerformingTableStyle.selectClass}
        >
          <option value="PNL_24h">24h PNL</option>
          <option value="PNL_week">7d PNL</option>
          <option value="PNL_month">30d PNL</option>
        </select>
      </div>

      {/* Table of Best Performing Tokens */}
      <div className={BestPerformingTableStyle.tableContainer}>
        <table className={BestPerformingTableStyle.table}>
          <thead className={BestPerformingTableStyle.thead}>
            <tr>
              <th className={BestPerformingTableStyle.th}>Rank</th>
              <th className={BestPerformingTableStyle.th}>Token Name</th>
              <th className={BestPerformingTableStyle.th}>Price (USD)</th>
              <th className={BestPerformingTableStyle.th}>PNL</th>
              <th className={BestPerformingTableStyle.th}>Balance</th>
              <th className={BestPerformingTableStyle.th}>Balance (USD)</th>
            </tr>
          </thead>
          <tbody className={BestPerformingTableStyle.tbody}>
            {loading && (
              <tr>
                <td colSpan="6">
                  {/* Use the LoadingSpinner component here */}
                  <LoadingSpinner/>
                </td>
              </tr>
            )}
            {!loading && topData.length === 0 && (
              <tr>
                <td colSpan="6">
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No Data Available.
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              topData.map(([symbol, data], index) => (
                <BuildTableRow
                  key={symbol}
                  symbol={symbol}
                  data={data}
                  index={index + 1}
                  styles={BestPerformingTableStyle}
                  selectedFilter={selectedFilter}
                  iconsMap={iconsMap}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BestPerformingTable;
