import React from "react";
import { SftMinter } from "@itheum/sdk-mx-data-nft";
import { useGetAccount } from "@multiversx/sdk-dapp/hooks";
import { Address } from "@multiversx/sdk-core/out";
import { refreshAccount } from "@multiversx/sdk-dapp/utils/account";
import { sendTransactions } from "@multiversx/sdk-dapp/services";

export const MinterTransaction: React.FC = () => {
  const { address } = useGetAccount();

  async function createTransaction() {
    const minter = new SftMinter("devnet");
    try {
      /// docs
      /// https://itheum.github.io/sdk-mx-data-nft/classes/SftMinter.html#mint
      const tx = await minter.mint(
        new Address(address),
        "DemoSTF",
        "https://api.itheumcloud-stg.com/datamarshalapi/router/v1",
        "https://api.npoint.io/3ecfc9897cf64f09401b",
        "https://api.npoint.io/3ecfc9897cf64f09401b",
        10,
        100,
        "Support transaction flow",
        "Flow of a mint",
        20 * 10 ** 18, /// the anti-spam tax
        {
          nftStorageToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI1QjQ0MjZFMmRjOURBZUFiZjM4RjNBMDZBMzZiNTNGNzUwMTY5MTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NzM3MzA1OTk1NiwibmFtZSI6ImhhY2thdGhvbiJ9.EVtqRKYFdRbm7YLxn_FSDtKzP-PTLL2VvdWvsqsGFFE",
        }
      );

      await refreshAccount();

      const { sessionId, error } = await sendTransactions({
        transactions: tx,
        transactionsDisplayInfo: {
          processingMessage: "Support",
          errorMessage: "Support error",
          successMessage: "Support success",
        },
        redirectAfterSign: false,
      });
    } catch (error) {
      console.log("Error");
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full tracking-wide ">
      <span>The following button is going to mint an STF, and send the transaction to the blockchain</span>
      <button className="mt-2 !rounded-xl p-2 border-0 !bg-gradient-to-r !from-blue-400 !to-purple-500 !shadow-xl" onClick={createTransaction}>
        Mint a SFT
      </button>
    </div>
  );
};
