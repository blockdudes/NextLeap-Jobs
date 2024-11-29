"use client";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address, Sender, SenderArguments } from "@ton/core";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
} {
  const [tonConnectUI] = useTonConnectUI();

  return {
    sender: {
      address:
        tonConnectUI !== null && tonConnectUI.connected
          ? Address.parse(tonConnectUI!.account!.address)
          : undefined,
      send: async (args: SenderArguments) => {
        if (!tonConnectUI) return;
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: tonConnectUI !== null && tonConnectUI.connected,
  };
}
