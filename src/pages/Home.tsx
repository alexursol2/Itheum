import React, { useEffect } from 'react';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account';
import { useWebWalletLogin } from '@multiversx/sdk-dapp/hooks/login/useWebWalletLogin';
import Button from 'components/Button';
import '../styles/home.scss';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [initiateLogin] = useWebWalletLogin({ callbackRoute: "/" });

  const { address } = useGetAccount();
  
  const isConnected = address != "";

  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/profile');
    }
  }, [isConnected]);

  function connectWallet() {
    initiateLogin();
  }

  return (
    <div id='body-container' className='home'>
      <div className="center-container">
        <h1>Discover Your <span>MultiversX Profile</span></h1>
        <p className="description">TKYC (Truly Know Your Customer) is a cutting-edge on-chain analysis solution leveraging artificial intelligence for wallet clustering. In other words, with just a public wallet address, we can determine the type of user it belongs.</p>
        <p><a href="#" className="more-information">Click for more information about TKYC and all the potential of this project</a></p>
        <Button className='button' onClick={connectWallet}>Connect my wallet</Button>
      </div>
    </div>
  );
}
