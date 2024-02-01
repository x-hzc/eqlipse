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
    id: 4,
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

  const message = encodeURIComponent(
    'I just minted my Eqlipse Power Source to become one of the Shadows!\n\n' +
      'Looking forward to building in the Refinery.\n\n' +
      '#jointheshadows'
  );

  const tweetUrl = 'https://pic.twitter.com/7u80FJXbeq';

  const twitterIntentURL = `https://twitter.com/intent/tweet?text=${message}%20${tweetUrl}`;

  return (
    <div className="flex flex-col">
      <BackgroundVideo />
      <div className="z-50 text-white">
        {/* <img src="/assets/images/menu.png" alt="" /> */}
        <div className="fixed w-full menu-custom">
          <div className="flex justify-between max-w-[1200px] mx-auto px-4 items-center">
            <img
              src="/assets/images/eqlipse.png"
              className="w-[100px] mt-5"
              alt=""
            />
            <div className="hidden md:flex justify-between space-x-14 text-xs uppercase mt-10">
              <a href="https://eqlipse.io/" target="_blank">
                About
              </a>
              <a href="https://eqlipse.io/" target="_blank">
                Mint
              </a>
              <a href="https://eqlipse.io/" target="_blank">
                Team
              </a>
              <a href="https://eqlipse.io/" target="_blank">
                FAQ
              </a>
            </div>

            <div className="flex justify-between space-x-4 mt-4">
              <a href="https://opensea.com">
                <img
                  className="max-w-[33px]"
                  src="/assets/images/opensea.png"
                  alt=""
                />
              </a>

              <a href="https://twitter.com/eqlipsenft">
                <img
                  className="max-w-[33px]"
                  src="/assets/images/x.png"
                  alt=""
                />
              </a>
              <a href="https://discord.com/invite/eqlipse">
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
        <div className=" mt-28"></div>
        {controller.currentStageId !== undefined && (
          <>
            {' '}
            <div className="text-4xl">
              <div className="flex justify-center items-center text-sm mt-4">
                Minted / Supply
              </div>

              <div className="flex justify-center items-center mb-10">
                {controller.currentSupply} / 500
              </div>
            </div>
          </>
        )}
        <div className="px-4">
          <div className="max-w-[700px] mx-auto mint-container rounded-2xl text-white px-4 py-0 ">
            <div className="grid md:grid-cols-2 gap-4 ">
              <div className="order-2  md:order-1">
                <div className="text-center uppercase mt-10 small-heading-style ">
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
                      <span>Shadow Presale Stage</span>
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
                    <span className="text-white">
                      Eligible for VIP Members Stage
                    </span>
                  </div>
                ) : stageTwoEligible ? (
                  <div className="text-lg mb-5">
                    <span className="text-white">
                      Eligible for Presale Stage
                    </span>
                  </div>
                ) : stageThreeEligible ? (
                  <div className="text-lg mb-5">
                    <span className="text-white">Eligible for FCFS Stage</span>
                  </div>
                ) : (
                  <div className="text-lg mb-5">
                    <span className="text-white">Eligible for public mint</span>
                  </div>
                )}
              </div>
            )} */}
                </div>
                {account ? (
                  <>
                    <div className="text-center mt-4 heading-style">
                      {stageOneEligible && (
                        <div className="text-lg mb-5">
                          <span>Eligible for VIP Members Stage</span>
                        </div>
                      )}
                      {stageTwoEligible && (
                        <div className="text-lg mb-5">
                          <span>Eligible for Presale Stage</span>
                        </div>
                      )}
                      {stageThreeEligible && (
                        <div className="text-lg mb-5">
                          <span>Eligible for FCFS Stage</span>
                        </div>
                      )}
                      {!stageOneEligible &&
                        !stageTwoEligible &&
                        !stageThreeEligible && (
                          <div className="text-lg mb-5">
                            <span className="text-white">
                              Eligible for public mint
                            </span>
                          </div>
                        )}
                    </div>
                  </>
                ) : (
                  <div className="w-8/12 mx-auto">
                    <ConnectButton
                      account={account || ''}
                      connect={connect}
                      disconnect={deactivate}
                      connectButtonClassNames="connect-btn-new"
                      disconnectButtonClassNames=""
                    ></ConnectButton>
                  </div>
                )}
              </div>
              <div className="order-1 md:order-2 home-mint-section-mint-case-image">
                <img
                  src="/assets/images/box.png"
                  className="mx-auto max-w-[200px]"
                  alt=""
                />
              </div>
            </div>

            <div className="w-full mx-auto text-center">
              {controller.currentStageId !== multiStage.Disabled && account && (
                <MintForm
                  containerClassName="mint-updated"
                  buttonText="Mint"
                  controller={controller}
                  statusClassNames="hidden"
                  mintButtonClassNames="mint-btn"
                  inputsControlClassNames="hidden"
                  inputButtonsClassNames=""
                  inputAmountClassNames=""
                />
              )}

              {controller.status && (
                <div className="text-center text-base mt-0">
                  {controller.status}
                </div>
              )}
              {controller.status.toLowerCase().includes('success') && (
                <div className="text-center text-[#8ac0c6] text-base mt-2">
                  <a
                    href={twitterIntentURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TWEET YOUR SUCCESSFUL MINT!
                  </a>
                </div>
              )}

              {controller.error && (
                <div className="text-center text-base mt-0">
                  {controller.error === 'Address is not whitelisted.'
                    ? 'Address is not whitelisted for this stage.'
                    : controller.error}
                </div>
              )}

              {controller.currentStageId !== multiStage.Disabled && (
                <div className="my-5">{controller.totalPrice} ETH</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
