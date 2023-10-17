import React, { useEffect } from 'react';
import '../styles/profile.scss';
import { ReactSVG } from 'react-svg';
import MintIcon from './../images/itheum.svg';
import RestartIcon from './../images/restart.svg';
import { useNavigate } from 'react-router-dom';
import { logout } from '@multiversx/sdk-dapp/utils';
import Loading from './Loading';
import RadarChart from 'components/RadarChart';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';
import { SftMinter } from "@itheum/sdk-mx-data-nft";
// MultiversX Imports (need to interact with the Blockchain)
import { Address, Transaction } from "@multiversx/sdk-core/out";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import { refreshAccount } from "@multiversx/sdk-dapp/utils/account";


export default function Profile() {
    const navigate = useNavigate();
    const { address } = useGetAccount();
    const [profileImage, setProfileImage] = React.useState<string>('/img/tmp-layout.png');

    function fetchProfile() {
        console.warn('fetchProfile not implemented yet');
        // TODO bug: fetchProfile is called twice
        // TODO add catch
        // TODO add api call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    'Gaming': 40,
                    'Defi': 30,
                    'Launchpad': 85,
                    'Payement': 20,
                    'PFP-Community': 10,
                    'DAO': 15,
                    'Diamond Hand': 70,
                }); // TODO fake data
            }, 8000);
        });
    }

    function getNewProfile() {
        // logout
        logout();

        // go to home page
        navigate('/');
    }

    async function mintWithItheum() {
        try {
            // Itheum SDK Minter initialization
            const sftMinter = new SftMinter("devnet"); // or "mainnet"
            const mintTx = sftMinter.mint(
                new Address(address),
                'DeFi',
                'https://api.itheumcloud-stg.com/datamarshalapi/router/v1',
                'https://api.npoint.io/3ecfc9897cf64f09401b',
                'https://api.npoint.io/3ecfc9897cf64f09401b',
                0,
                1,
                'Test Title',
                'Test Description',
                1,
                {
                    nftStorageToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI1QjQ0MjZFMmRjOURBZUFiZjM4RjNBMDZBMzZiNTNGNzUwMTY5MTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NzM3MzA1OTk1NiwibmFtZSI6ImhhY2thdGhvbiJ9.EVtqRKYFdRbm7YLxn_FSDtKzP-PTLL2VvdWvsqsGFFE'
                }
            );
        
            await refreshAccount();
        
            const { sessionId, error } = await sendTransactions({
                transactions: mintTx,
                transactionsDisplayInfo: {
                processingMessage: "Minting Standard Data NFT",
                errorMessage: "Data NFT minting error",
                successMessage: "Data NFT minted successfully",
                },
                redirectAfterSign: false,
            });
        } catch(e) {
            console.log("Minting Standard Data NFT FAILED");
            console.error(e);
        }
    }

    function generateXUrl() {
        const hereDomain = window.location.hostname; // TODO add to tweet in a next update
        /*
       Just minted my Data NFT profile (by @Itheum) on the MultiversX blockchain using @Truly_KYC ! 🚀

        My scores are:
        🎮 Gaming: A/100
        💹 DeFi: ?/100
        🚀 Launchpad: ?/100
        💳 Payment: ?/100
        👥 PFP-Community: ?/100
        🔗 DAO: ?/100
        💎 Diamond Hand: ?/100
        */
        return "https://twitter.com/intent/tweet?text=Just%20minted%20my%20Data%20NFT%20profile%20(by%20%40Itheum)%20on%20the%20MultiversX%20blockchain%20using%20%40Truly_KYC%20!%20%F0%9F%9A%80%0A%0AMy%20scores%20are%3A%0A%F0%9F%8E%AE%20Gaming%3A%20" + profile['Gaming'] + "%2F100%0A%F0%9F%92%B9%20DeFi%3A%20" + profile['Defi'] + "%2F100%0A%F0%9F%9A%80%20Launchpad%3A%20" + profile['Launchpad'] + "%2F100%0A%F0%9F%92%B3%20Payment%3A%20" + profile['Payement'] + "%2F100%0A%F0%9F%91%A5%20PFP-Community%3A%20" + profile['PFP-Community'] + "%2F100%0A%F0%9F%94%97%20DAO%3A%20" + profile['DAO'] + "%2F100%0A%F0%9F%92%8E%20Diamond%20Hand%3A%20" + profile['Diamond Hand'] + "%2F100";
    }

    const [profile, setProfile] = React.useState({} as any);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchProfile().then((profile) => {
            setProfile(profile);
            setProfileImage('/img/tmp-layout.png'); // TODO: add real image
            setLoading(false);
        });
    }, []);

    if (loading) return (<Loading />);

    return (
        <div id='body-container' className='profile'>
            <div className="center-container">
                <h1>Your profile looks great!</h1>
                <p className="address">{address}</p>
                <div className="profile-picture"><img src={profileImage} alt={"Profile picture of " + address} /></div>
                <a className="share-on-x" href={generateXUrl()} target="_blank" rel="noreferrer">Share your profile on X</a>
                <div className="datas">
                    <div className="itheum" onClick={mintWithItheum}>
                        <span>Mint DataNFT with ITHEUM</span>
                        <ReactSVG src={MintIcon} className='svg' />
                    </div>
                    <div className="radar-tags">
                        <RadarChart profile={profile} />
                    </div>
                </div>
            </div>

            <div className="get-new" onClick={getNewProfile}>
                <ReactSVG src={RestartIcon} className='svg' />
                <span>Get another profile</span>
            </div>
        </div>
    );
}
