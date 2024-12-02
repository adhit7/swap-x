import React, { useEffect, useState } from 'react';
import Logo from '../assets/moralis-logo.svg';
import Eth from '../assets/eth.svg';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Input, Popover, Radio, Modal, message, Button } from 'antd';
import { WalletOptions } from './WalletOptions';

function Header(props) {
  const { isConnected, address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    if (!isConnected) {
      setIsOpen(true);
    }
  }

  return (
    <header>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title='Select a Connector'
      >
        <div className='modalContent'>
          <WalletOptions setIsOpen={setIsOpen} />
        </div>
      </Modal>
      <div className='leftH'>
        <img src={Logo} alt='logo' className='logo' />
        <Link to='/' className='link'>
          <div className='headerItem'>Swap X</div>
        </Link>
        <Link to='/' className='link'>
          <div className='headerItem'>Tokens</div>
        </Link>
      </div>
      <div className='rightH'>
        <div className='headerItem'>
          <img src={Eth} alt='eth' className='eth' />
          Ethereum
        </div>
        <div className='connectButton' onClick={() => openModal()}>
          {isConnected
            ? address.slice(0, 4) + '...' + address.slice(38)
            : 'Connect'}
        </div>
      </div>
    </header>
  );
}

export default Header;
