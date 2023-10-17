import React from 'react';
import style from './../styles/modules/Footer.module.scss';

export default function FooterSection() {
    return (
        <footer className={style.footer}>
            <img src="/img/tkyc_logo.png" alt="Logo TKYC" />
            <p>was created to demonstrate the potential of blockchain-based data processes for the MultiversX Hackathon.</p>
        </footer>
    );
}