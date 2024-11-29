"use client";
import { TonConnectButton } from "@tonconnect/ui-react";
import BottomNavigation from "./BottomNavigation";
import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen pb-20">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-foreground/10 px-4 py-3">
          <div className="h-12 flex justify-between items-center">
            <img
              src="/logo.png"
              alt="Next Leap Jobs"
              className="w-12 h-12 rounded-full"
            />
            {/* <h1 className="text-lg font-semibold">NextLeap Jobs</h1> */}
            <TonConnectButton />
          </div>
        </header>

        <main className="flex-1 p-4">{children}</main>

        <BottomNavigation />
      </div>
      <Toaster containerStyle={{ zIndex: 9999 }} />
    </>
  );
};

export default RootLayout;
