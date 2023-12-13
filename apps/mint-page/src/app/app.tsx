import {
  useDApp,
  ConnectButton,
  MintForm,
  useContract,
  MULTI_STAGE_ABI,
} from '@chocolate-factory/dapp';
import { TransactionState } from '@usedapp/core';
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useEthers } from '@usedapp/core';
import { environment } from '../environments/environment';
import {
  useMultiStageController,
  useStageController,
  BALANCE_LIMIT_EXTENSION,
  buildMultiStageContract,
  WHITELIST_EXTENSION,
  PRICE_EXTENSION,
  MULTI_MINT_EXTENSION,
} from '@chocolate-factory/dapp';
import { stageOne, stageTwo, stageThree } from '@mint-page/whitelist-addresses';
import { BigNumber, Contract } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Interface } from '@ethersproject/abi';
import { formatEther } from 'ethers/lib/utils';
import BackgroundVideo from './components/BackgroundVideo';

const stages = [
  {
    id: 1,
    functionName: 'publicMint',
    transactionName: 'Public Mint',
    extensions: [BALANCE_LIMIT_EXTENSION, PRICE_EXTENSION],
  },
  {
    id: 2,
    functionName: 'multiStageMint',
    transactionName: 'Whitelist Mint',
    extensions: [
      BALANCE_LIMIT_EXTENSION,
      WHITELIST_EXTENSION,
      PRICE_EXTENSION,
      MULTI_MINT_EXTENSION,
    ],
    addresses: stageOne,
  },
  {
    id: 3,
    functionName: 'multiStageMint',
    transactionName: 'Whitelist Mint',
    extensions: [
      BALANCE_LIMIT_EXTENSION,
      WHITELIST_EXTENSION,
      PRICE_EXTENSION,
      MULTI_MINT_EXTENSION,
    ],
    addresses: stageTwo,
  },
  {
    id: 3,
    functionName: 'multiStageMint',
    transactionName: 'Whitelist Mint',
    extensions: [
      BALANCE_LIMIT_EXTENSION,
      WHITELIST_EXTENSION,
      PRICE_EXTENSION,
      MULTI_MINT_EXTENSION,
    ],
    addresses: stageThree,
  },
];

enum multiStage {
  Disabled = 0,
  PublicMint = 1,
  stageOne = 2,
  stageTwo = 3,
  stageThree = 4,
}

export function App() {
  const { account, connect } = useDApp(environment);
  const { deactivate } = useEthers();

  const controller = useMultiStageController(environment, stages);

  const contract = buildMultiStageContract(environment.tokenAddress);

  const { isWhitelisted: stageOneEligible } = useStageController(
    stages[1],
    contract,
    environment
  );
  const { isWhitelisted: stageTwoEligible } = useStageController(
    stages[2],
    contract,
    environment
  );

  const { isWhitelisted: stageThreeEligible } = useStageController(
    stages[3],
    contract,
    environment
  );

  // const controller = {
  //   canMint: () => true,
  //   amount: 0,
  //   mint: () => console.log('mint'),
  //   canIncreaseAmount: () => true,
  //   canDecreaseAmount: () => true,
  // };

  return (
    <div className="flex flex-col">
      <BackgroundVideo />
      <div className="z-50 text-white">
        {/* <img src="/assets/images/menu.png" alt="" /> */}
        <div className="fixed w-full my-10  ">
          <div className="flex justify-between max-w-[1200px] mx-auto">
            <img
              src="/assets/images/eqlipse.png"
              className="w-[107px] h-[47px]"
              alt=""
            />
            <div className="hidden md:flex justify-between space-x-14 text-2xl uppercase">
              <a href="">About</a>
              <a href="">Mint</a>
              <a href="">Team</a>
              <a href="">FAQ</a>
            </div>

            <div className="flex justify-between space-x-4">
              <a href="">
                <img
                  className="max-w-[33px]"
                  src="/assets/images/opensea.png"
                  alt=""
                />
              </a>

              <a href="">
                <img
                  className="max-w-[33px]"
                  src="/assets/images/x.png"
                  alt=""
                />
              </a>
              <a href="">
                <img
                  className="max-w-[33px]"
                  src="/assets/images/discord.png"
                  alt=""
                />
              </a>
            </div>
          </div>
          <img src="/assets/images/distressed-line.png" alt="" />
        </div>
        <div className=" mt-40"></div>
        {controller.currentStageId !== undefined && (
          <>
            {' '}
            <div className="text-4xl">
              <div className="flex justify-center items-center text-sm mt-4">
                Minted / Supply
              </div>

              <div className="flex justify-center items-center mb-10">
                {controller.currentSupply} / {controller.maxSupply}
              </div>
            </div>
          </>
        )}
        <div className="max-w-xl mx-auto bg-white rounded-2xl text-black p-10">
          <div className="text-3xl text-black text-center uppercase">
            {controller.currentStageId === multiStage.Disabled && (
              <>
                <span> Mint is not live yet</span> <br />
              </>
            )}

            {controller.currentStageId === multiStage.stageOne && (
              <span>VIP Members Stage</span>
            )}

            {controller.currentStageId === multiStage.stageTwo && (
              <span>
                <span>Presale Stage</span>
              </span>
            )}

            {controller.currentStageId === multiStage.stageThree && (
              <span>FCFS Stage</span>
            )}

            {controller.currentStageId === multiStage.PublicMint && (
              <span>Public Mint</span>
            )}

            {/* {controller.currentStageId !== multiStage.Disabled && (
              <div>
                {stageOneEligible ? (
                  <div className="text-lg mb-5">
                    <span className="text-black">
                      Eligible for VIP Members Stage
                    </span>
                  </div>
                ) : stageTwoEligible ? (
                  <div className="text-lg mb-5">
                    <span className="text-black">
                      Eligible for Presale Stage
                    </span>
                  </div>
                ) : stageThreeEligible ? (
                  <div className="text-lg mb-5">
                    <span className="text-black">Eligible for FCFS Stage</span>
                  </div>
                ) : (
                  <div className="text-lg mb-5">
                    <span className="text-black">Eligible for public mint</span>
                  </div>
                )}
              </div>
            )} */}
          </div>
          {account ? (
            <>
              <div className="text-center mt-4">
                {stageOneEligible ? (
                  <div className="text-lg mb-5">
                    <span className="text-black">
                      Eligible for VIP Members Stage
                    </span>
                  </div>
                ) : stageTwoEligible ? (
                  <div className="text-lg mb-5">
                    <span className="text-black">
                      Eligible for Presale Stage
                    </span>
                  </div>
                ) : stageThreeEligible ? (
                  <div className="text-lg mb-5">
                    <span className="text-black">Eligible for FCFS Stage</span>
                  </div>
                ) : (
                  <div className="text-lg mb-5">
                    <span className="text-black">Eligible for public mint</span>
                  </div>
                )}
              </div>
              <div className="w-8/12 mx-auto text-center">
                <MintForm
                  controller={controller}
                  statusClassNames=""
                  mintButtonClassNames="mint-btn"
                  inputsControlClassNames="flex flex-row justify-between input-control"
                  inputButtonsClassNames=""
                  inputAmountClassNames=""
                />
                {controller.currentStageId !== multiStage.Disabled && (
                  <div>{controller.totalPrice} ETH</div>
                )}
              </div>
            </>
          ) : (
            <div className="w-8/12 mx-auto">
              <ConnectButton
                account={account || ''}
                connect={connect}
                disconnect={deactivate}
                connectButtonClassNames=""
                disconnectButtonClassNames=""
              ></ConnectButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
