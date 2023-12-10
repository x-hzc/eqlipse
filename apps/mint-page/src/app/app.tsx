import { useDApp, ConnectButton, MintForm } from '@chocolate-factory/dapp';
import { useEthers } from '@usedapp/core';
import { environment } from '../environments/environment';

export function App() {
  const { account, connect } = useDApp(environment);
  const { deactivate } = useEthers();

  const controller = {
    canMint: () => true,
    amount: 0,
    mint: () => console.log('mint'),
    canIncreaseAmount: () => true,
    canDecreaseAmount: () => true,
  };

  return (
    <div className="flex flex-col">
      <ConnectButton
        account={account || ''}
        connect={connect}
        disconnect={deactivate}
        connectButtonClassNames=""
        disconnectButtonClassNames=""
      ></ConnectButton>
      <div className="w-8/12 mx-auto">
        <MintForm
          controller={controller}
          statusClassNames=""
          mintButtonClassNames=""
          inputsControlClassNames="flex flex-row justify-between"
          inputButtonsClassNames=""
          inputAmountClassNames=""
        />
      </div>
    </div>
  );
}

export default App;
