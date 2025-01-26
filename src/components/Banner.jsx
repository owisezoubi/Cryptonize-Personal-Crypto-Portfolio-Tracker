import React from "react";    // Imports React library
import CryptoTable from "./CryptoTable";    // Imports a CryptoTable component
import { BannerStyle } from "../styles/BannerStyle";    // Imports CSS module or styled classes for the Banner component
import WalletConnectComponent from "./WalletConnectComponent";    // Imports a component to handle Wallet connection
import SearchUsingAddress from "./SearchUsingAddress";    // Imports a component allowing address-based portfolio searches
import FeaturesSection from "./FeaturesSection";    // Imports a component that showcases specific features of the application


function Banner({ handleConnect }) {
  // Renders the banner section with a title, description, and several functional components
  return (
    <div className={BannerStyle.background}>
      <div className={BannerStyle.container}>
        {/* Header Text */}
        <h1 className={BannerStyle.gradientText}>
          Personal Crypto <span className={BannerStyle.textHighlight}>Portfolio Tracker</span>
        </h1>
        <p className={BannerStyle.description}>
          Connect to your portfolio and seamlessly monitor your cryptocurrency performance.
        </p>

        {/* WalletConnect, Search, and Features Section */}
        <div className={BannerStyle.featuresContainer}>
          <div className={BannerStyle.walletSearchContainer}>
            {/* Component for wallet connection functionality */}
            <WalletConnectComponent handleConnect={handleConnect} />
            {/* Component for searching by a specific address */}
            <SearchUsingAddress handleConnect={handleConnect} />
          </div>
          <div className={BannerStyle.featuresSectionContainer}>
            {/* Displays a set of features related to the app */}
            <FeaturesSection />
          </div>
        </div>

        {/* Crypto Table */}
        <div className={BannerStyle.cryptoTableContainer}>
          {/* Table showing real-time or fetch-based cryptocurrency data */}
          <CryptoTable />
        </div>
      </div>
    </div>
  );
}

// Exports the Banner component as the default export
export default Banner;
