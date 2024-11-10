import React from 'react';
import styles from './navbar.module.scss';
import Link from 'next/link';
import SearchBox from '../atoms/searchbox/searchbox';
import Icon from "../atoms/icons";
import UserBtn from "../atoms/userbtn/userbtn";

export default function NavBar() {

    return (
        <div className={styles.navwraper}>
            <div className={styles.nav}>

                <div className={styles.leftwraper}>
                    <Link draggable="false" href="/" className={styles.primarybutton}>
                        <div className={styles.iconwraper}>
                            <Icon name="home" size={16.80} fill='#ffffff5c' />
                        </div>
                    </Link>
                    <Link href="/series" className={styles.primarybutton}>
                        <Icon name='series' size={26.80} fill='#ffffff5c' />
                    </Link>
                </div>

                <div style={{ width: '100%' }}>
                    <SearchBox />
                </div>


                <div className={styles.rightwraper}>
                    <Link href='/settings' className={styles.primarybutton}>
                        <Icon name='settings' size={26.80} fill='#ffffff5c' />
                    </Link>
                    <UserBtn />
                </div>


            </div>
        </div>
    );
}
