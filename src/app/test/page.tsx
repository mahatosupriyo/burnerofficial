import BurnerLoader from '@/components/atoms/lotties/loader'
import React from 'react'
import styles from './test.module.scss'
import NavBar from '@/components/navbar/navbar'
import Link from 'next/link'

const TestPage = () => {
  return (
    <div className={styles.profilewraper}>
      <NavBar />
      <div style={{
        marginTop: '10rem',
        padding: '4rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <div className={styles.pagelabel}>
          <h3 className={styles.pagename}>Edit account</h3>
          <p className={styles.pagedescription}>Add / change information about you here.</p>
        </div>
        <div className={styles.formscontainer}>

          <div className={styles.formsnavwraper}>
            <div className={styles.nav}>
              <Link href="/" className={styles.link}>Personal</Link>
              <Link href="/" className={styles.link}>About</Link>
            </div>

          </div>
          <div className={styles.formssettings}>
            <div className={styles.forms}>
              <label className={styles.label}>
                username
                <div className={styles.box}>
                  <p style={{userSelect: 'none',paddingLeft: '1.6rem', textWrap: 'nowrap'}}>eduburner.org/</p>
                  <input type="text" className={styles.usernameinputbox} />
                </div>
              </label>

              <label className={styles.label}>
                name
                <div className={styles.box}>
                  <input type="text" className={styles.inputbox} />
                </div>
              </label>
            </div>
            <button className={styles.updatebtn}>
              save changes
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TestPage
