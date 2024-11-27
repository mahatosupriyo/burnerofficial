import React from 'react';
import styles from './navbar.module.scss';
import Link from 'next/link';
import SearchBox from '../atoms/searchbox/searchbox';
import Icon from "../atoms/icons";
import UserBtn from "../atoms/userbtn/userbtn";
import UploadControls from '../atoms/uploadpost/uploadpost';
import ButtonWrapper from './buttonwraper';

export default function NavBar() {

    return (
        <div className={styles.navwraper}>
            <div className={styles.nav}>

                <div className={styles.leftwraper}>

                    <ButtonWrapper>
                        <Link draggable="false" href="/" className={styles.primarybutton}>
                            <div className={styles.iconwraper}>
                                <Icon name="home" size={16} fill='#ffffff5c' />
                            </div>
                        </Link>
                    </ButtonWrapper>

                    <UploadControls />
                </div>

                <div style={{ width: '100%' }}>
                    <SearchBox />
                </div>


                <div className={styles.rightwraper}>
                    <ButtonWrapper>
                        <Link href='/settings' className={styles.primarybutton}>
                            <Icon name='settings' size={26.80} fill='#ffffff5c' />
                        </Link>
                    </ButtonWrapper>

                    <ButtonWrapper>
                        <UserBtn />
                    </ButtonWrapper>

                </div>


            </div>
        </div>
    );
}
