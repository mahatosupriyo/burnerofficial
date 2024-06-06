"use client"

import NavBar from "@/components/navbar/navbar";
import styles from "./home.module.scss"
import ProfileBadge from "@/components/atoms/badge/badge";


export default function Home() {

  return (
    <>
      <div className={styles.wraper}>
        <NavBar />
        <div className={styles.container}>


          <div className={styles.wraprelease}>
            <div className={styles.releasehead}>
              <h4 className={styles.displayr}>June 2024</h4>
              <h1 className={styles.displaymega}>relases</h1>
            </div>
          </div>

          <div className={styles.floatcontainer}>
            <ProfileBadge
              avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQforSqRztdqhlKNeETQJssJWQM2Yezo7kcmBrf9HrdLHqr_WW-9hnk8ugVarLeJ_14woA&usqp=CAU"
              name="Darshan Raval"
              creator="Artist"
              href="/"
              verified={false}
            />

            <ProfileBadge
              avatar="https://media.licdn.com/dms/image/D4D03AQGeNzdp3-Y95g/profile-displayphoto-shrink_200_200/0/1695730364777?e=2147483647&v=beta&t=UtBxXGkCb8sBCZLH63kFqTjX2oL05v4JbtZJOTMHvm0"
              name="Supriyo Mahato"
              creator="UX"
              href="/"
              verified={true}
            />


            <ProfileBadge
              avatar="https://upload.wikimedia.org/wikipedia/commons/5/52/Kartik_Aaryan_in_2022.jpg"
              name="Kartik Aaryan"
              creator="Artist"
              href="/"
              verified={false}
            />
          </div>


        </div>
      </div>
    </>
  );
}
