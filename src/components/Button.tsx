import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import style from './../styles/modules/Button.module.scss';

type BoutonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Bouton({ children, ...props }: BoutonProps) {
    return (
        <button {...props} className={style.button + " " + props.className}>
            {children}
        </button>
    );
}

export default Bouton;
