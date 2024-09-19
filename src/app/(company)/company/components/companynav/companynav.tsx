import React from 'react';
import styles from './companynav.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CompanyNav = () => {
  const pathname = usePathname();

  return (
    <div className={styles.companynavwraper}>
      <Link href="/" style={{textDecoration: 'none', padding: '1rem'}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 697 272" fill="none">
          <path d="M0 0H697V272H0V0Z" fill="#1A1A1A" />
          <path d="M26 25H235V135.5L130.5 246H26V25Z" fill="white" />
          <path d="M244 25H342.5C403.527 25 453 74.4725 453 135.5C453 196.527 403.527 246 342.5 246H244V25Z" fill="white" />
          <path d="M671 25V147.5C671 205.214 624.214 252 566.5 252C508.786 252 462 205.214 462 147.5V25H671Z" fill="white" />
        </svg>
      </Link>


      <div className={styles.companynav}>
        <Link
          className={`${styles.linkchip} ${pathname === '/company/terms' ? styles.active : ''
            }`}
          href="/company/terms"
        >
          Terms
        </Link>

        <Link
          className={`${styles.linkchip} ${pathname === '/company/delivery' ? styles.active : ''
            }`}
          href="/company/delivery"
        >
          shipping
        </Link>

        <Link
          className={`${styles.linkchip} ${pathname === '/company/cancellation' ? styles.active : ''
            }`}
          href="/company/cancellation"
        >
          refunds
        </Link>
      </div>
    </div>

  );
};

export default CompanyNav;
