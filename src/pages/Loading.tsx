import React, { useEffect, useRef, useState } from 'react';
import '../styles/loading.scss';

export default function Loading() {
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const interval = setInterval(loop, 7500);
        loop();

        return () => clearInterval(interval);
    }, []);

    const loop = () => {
        addTransaction(20, 10);
        setTimeout(() => {
            addTransaction(69, 20);
            setTimeout(() => {
                addTransaction(30, 60);
            }, 2500);
        }, 2500);
    };

    const addTransaction = (x: number, y: number) => {
        // Add a transaction to the list of transactions
        setTransactions((prevTransactions) => [
            ...prevTransactions,
            { x, y, id: Date.now() },
        ]);
    };

    const removeTransaction = (id: any) => {
        // Delete a transaction from the list of transactions
        setTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction.id !== id)
        );
    };

    return (
        <div id='body-container' className='loading'>
            <div className="circle-center"></div>
            <div className="info-text">Our AI is analyzing your profile...</div>
            {transactions.map((transaction) => (
                <TransactionElement
                    key={transaction.id}
                    x={transaction.x}
                    y={transaction.y}
                    onAnimationComplete={() => removeTransaction(transaction.id)}
                />
            ))}
        </div>
    );
}

function TransactionElement({ x, y, onAnimationComplete }: { x: number, y: number, onAnimationComplete: () => void }) {
    const transactionRef = useRef(null);
    const [transactionText, setTransactionText] = useState('');
    const [style, setStyle] = useState<any>({ top: `${x}vh`, left: `${y}vw` });

    function randomHash() {
        return Math.random().toString(36).substring(2, 10);
    }

    useEffect(() => {
        // Generate random transaction text
        setTransactionText(`Txn Hash: ${randomHash()}...${randomHash()}`);

        const animationDuration = 3000;
        startAnimation(animationDuration);
    }, []);

    const startAnimation = (animationDuration: number) => {
        // Animation
        setTimeout(() => {
            setStyle({
                top: { x } + "vh",
                left: { y } + "vw",
                transform: "scale(1)",
                opacity: 1
            });
        }, animationDuration * 0.05);

        setTimeout(() => {
            if (!transactionRef.current) return;
            const center = (transactionRef.current as any).parentElement.getBoundingClientRect();
            setStyle({
                top: center.height / 2 - (transactionRef.current as any).offsetHeight / 2 + "px",
                left: center.width / 2 - (transactionRef.current as any).offsetWidth / 2 + "px",
                transform: "scale(0)",
            });
        }, animationDuration * 0.80);

        // Callback
        setTimeout(() => {
            onAnimationComplete();
        }, animationDuration);
    };

    return (
        <div className="transaction" style={style} ref={transactionRef}>
            {transactionText}
        </div>
    );
}