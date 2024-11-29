"use client";
import React from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { DecentralisedJobMarketplaceProvider } from "./useDecentralisedJobMarketplaceContract";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TonConnectUIProvider manifestUrl="https://hs4q0fkm-3000.inc1.devtunnels.ms/tonconnect-manifest.json">
      <DecentralisedJobMarketplaceProvider>
        {children}
      </DecentralisedJobMarketplaceProvider>
    </TonConnectUIProvider>
  );
};

export default AppProvider;
