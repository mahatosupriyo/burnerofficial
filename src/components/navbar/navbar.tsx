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
                    <Link draggable="false" href="/" className={styles.back}>
                        <Icon name="home" size={16.29} />
                    </Link>
                </div>

                <div style={{ width: '100%' }}>
                    <SearchBox />
                </div>


                <div className={styles.rightwraper}>
                    <UserBtn />
                </div>


            </div>
        </div>
    );
}
