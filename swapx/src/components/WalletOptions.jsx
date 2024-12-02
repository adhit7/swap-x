import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useConnect } from 'wagmi';

export function WalletOptions({ setIsOpen }) {
  const { connectors, connect } = useConnect();

  const hanldeRedirect = () => {
    window.location.assign('https://metamask.io/');
    setIsOpen(false);
  };

  return (
    <>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => {
            connect({ connector });
            setIsOpen(false);
          }}
        />
      ))}
      <Button style={{ margin: '8px' }} onClick={hanldeRedirect}>
        Don't Have an Account?
      </Button>
    </>
  );
}

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button disabled={!ready} onClick={onClick} style={{ margin: '8px' }}>
      {connector.name}
    </Button>
  );
}
