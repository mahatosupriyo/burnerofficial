import SmoothScrolling from '@/components/smoothscroll'
import React from 'react'
import styles from './plans.module.scss'
import FAQ from '@/components/atoms/FAQ/faq'
import Footer from '@/components/footer/footer'
import Logo from '@/components/base/logo'

const BurnerPlans = () => {

    const faqData = [
        {
            question: "Is there a limit on the number of devices I can use for accessing the courses?",
            answer: "You can access your courses from max 2 devices for your convenience."
        },
        {
            question: "How often are new courses and resources added to the platform?",
            answer: "We regularly update our content library with new courses, tutorials, and resources to ensure our subscribers have access to the latest industry trends and technologies."
        },
        {
            question: "Can I access the platform on mobile devices?",
            answer: "Yes, our platform is optimized for mobile devices, allowing you to access courses and resources on the go via our mobile app or mobile-friendly website."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept major credit cards, debit cards, and other secure payment methods. All transactions are processed through a secure and encrypted connection."
        }
    ]

    return (
        <SmoothScrolling>
            <div className={styles.wraper}>
                <div className={styles.container}>
                    <nav className={styles.nav}>
                        <Logo width='100' fill='#fafafa' />
                    </nav>

                    <section className={styles.hero}>
                        <p className={styles.subhead}>burner pro plans</p>
                        <h1 className={styles.headingtext}>
                            UNLEASH YOUR DESIGN SUPER POWERS WITH BURNER PRO
                        </h1>
                    </section>

                    <section className={styles.plans}>
                        <h1 className={styles.headingtext}>
                            pay using
                            various ways
                        </h1>
                        <div className={styles.methods}>
                            {/* UPI Logo */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 160 43" fill="none">
                                <path d="M122.002 42.7077H113.519L125.317 0.0996094H133.8L122.002 42.7077Z" fill="#66686C" />
                                <path d="M117.598 1.44663C117.01 0.635865 116.103 0.226742 114.87 0.226742H68.2235L65.9131 8.57195H74.4008V8.56711H108.349L105.879 17.4851H71.9302L71.9333 17.4666H63.4491L56.4074 42.888H64.896L69.6216 25.8254H107.783C108.974 25.8254 110.096 25.419 111.151 24.606C112.204 23.7922 112.897 22.7887 113.229 21.5904L117.954 4.52428C118.299 3.28592 118.179 2.25827 117.598 1.44663Z" fill="#66686C" />
                                <path d="M51.4643 40.048C50.9958 41.735 49.4596 42.9021 47.7083 42.9021H3.9406C2.74799 42.9021 1.86156 42.4957 1.27867 41.6836C0.69622 40.8706 0.571285 39.865 0.904301 38.6671L11.5837 0.224147H20.0745L10.5358 34.5596H44.5L54.0387 0.224147H62.5277L51.4643 40.048Z" fill="#66686C" />
                                <path d="M148.451 0.179829L159.191 21.5391L136.613 42.8926L148.451 0.179829Z" fill="#27803B" />
                                <path d="M140.923 0.179829L151.655 21.5391L129.068 42.8926L140.923 0.179829Z" fill="#E9661C" />
                            </svg>
                            {/* UPI Logo */}

                            {/* CRED Logo */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 48 53" fill="none">
                                <path d="M23.6239 52.9942C23.3307 52.9951 23.0425 52.9199 22.7877 52.7758L1.05568 40.6054C0.792779 40.4579 0.574045 40.2434 0.421983 39.9841C0.269921 39.7247 0.189971 39.4297 0.190432 39.1295V1.6975C0.190432 1.24885 0.369697 0.818577 0.688761 0.501332C1.00782 0.184086 1.44059 0.00585938 1.89189 0.00585938H45.3532C45.8045 0.00585938 46.2373 0.184086 46.5564 0.501332C46.8754 0.818577 47.0547 1.24885 47.0547 1.6975V39.1295C47.0551 39.4297 46.9752 39.7247 46.8231 39.9841C46.6712 40.2434 46.4523 40.4579 46.1894 40.6054L24.4574 52.7758C24.2035 52.9195 23.9161 52.9948 23.6239 52.9942ZM3.59325 38.1534L23.6239 49.3714L43.6519 38.1534V3.38915H3.59325V38.1534Z" fill="#111111" />
                                <path d="M23.6243 36.0491C23.3313 36.0487 23.0434 35.9734 22.7881 35.8307L15.9084 31.9738C15.6455 31.8266 15.4267 31.6127 15.2742 31.3538C15.1216 31.095 15.041 30.8005 15.0405 30.5005V23.4209H18.4433V29.5271L23.627 32.421L29.6731 29.0325L31.3428 31.9791L24.4631 35.8359C24.2065 35.9774 23.9176 36.0508 23.6243 36.0491Z" fill="#111111" />
                                <path d="M23.6241 44.5225C23.3311 44.5222 23.0432 44.447 22.7878 44.3042L8.48071 36.2905C8.21808 36.1432 7.99962 35.9291 7.84756 35.6703C7.69559 35.4114 7.61545 35.117 7.61545 34.8173V16.4591C7.61545 16.0104 7.79472 15.5802 8.11378 15.2628C8.43285 14.9456 8.86561 14.7674 9.31682 14.7674H30.3291V18.1586H11.0129V33.8359L23.6188 40.8972L36.2219 33.8359V26.5011H39.6247V34.8173C39.6247 35.117 39.5446 35.4114 39.3925 35.6703C39.2406 35.9291 39.022 36.1432 38.7595 36.2905L24.4522 44.3042C24.1994 44.4458 23.9143 44.521 23.6241 44.5225Z" fill="#111111" />
                                <path d="M39.6294 20.0348H36.2266V10.7716H13.6373V7.38826H37.9307C38.3819 7.38826 38.8147 7.56649 39.1338 7.88373C39.4528 8.20098 39.6321 8.63125 39.6321 9.07991L39.6294 20.0348Z" fill="#111111" />
                            </svg>
                            {/* CRED Logo */}

                            {/* MasterCard Logo */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 105 65" fill="none">
                                <path d="M66.2588 7.15186H38.0406V57.8485H66.2588V7.15186Z" fill="#FF5A00" />
                                <path d="M39.919 32.5002C39.919 22.2002 44.7612 13.0585 52.1914 7.1519C46.7231 2.85239 39.8251 0.253906 32.301 0.253906C14.4768 0.253906 0.0546875 14.676 0.0546875 32.5002C0.0546875 50.3244 14.4768 64.7465 32.301 64.7465C39.8251 64.7465 46.7231 62.148 52.1914 57.8485C44.7508 52.0254 39.919 42.8002 39.919 32.5002Z" fill="#EB001B" />
                                <path d="M104.328 32.5002C104.328 50.3244 89.906 64.7465 72.0818 64.7465C64.5577 64.7465 57.6597 62.148 52.1914 57.8485C59.7156 51.9315 64.4638 42.8002 64.4638 32.5002C64.4638 22.2002 59.6216 13.0585 52.1914 7.1519C57.6493 2.85239 64.5473 0.253906 72.0714 0.253906C89.906 0.253906 104.328 14.77 104.328 32.5002Z" fill="#F79E1B" />
                            </svg>
                            {/* MasterCard Logo */}

                            {/* VISA Logo */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 139 45" fill="none">
                                <g clip-path="url(#clip0_2678_227)">
                                    <path d="M60.1065 44.183H48.9316L55.9212 0.964844H67.0954L60.1065 44.183Z" fill="#00579F" />
                                    <path d="M100.616 2.02161C98.4121 1.14715 94.9161 0.181641 90.5933 0.181641C79.5577 0.181641 71.7866 6.06636 71.7389 14.4797C71.6473 20.6871 77.3028 24.1348 81.5328 26.2046C85.8562 28.3195 87.3258 29.6999 87.3258 31.5851C87.2818 34.4804 83.8323 35.815 80.6149 35.815C76.1534 35.815 73.7629 35.127 70.13 33.5162L68.6585 32.8256L67.0947 42.5272C69.7157 43.7212 74.5444 44.7808 79.5577 44.8273C91.2832 44.8273 98.9168 39.0336 99.0073 30.0678C99.0519 25.148 96.0655 21.3782 89.6271 18.2978C85.7187 16.3203 83.3251 14.9869 83.3251 12.9636C83.3709 11.1243 85.3496 9.24032 89.7616 9.24032C93.3945 9.14804 96.0637 10.0213 98.0857 10.8951L99.0965 11.354L100.616 2.02161Z" fill="#00579F" />
                                    <path d="M115.468 28.8723C116.388 26.3895 119.93 16.7803 119.93 16.7803C119.883 16.8725 120.848 14.2516 121.4 12.6426L122.181 16.3666C122.181 16.3666 124.297 26.7116 124.756 28.8723C123.01 28.8723 117.675 28.8723 115.468 28.8723ZM129.262 0.964844H120.618C117.953 0.964844 115.928 1.74581 114.778 4.55067L98.1787 44.1824H109.904C109.904 44.1824 111.835 38.8483 112.249 37.6994C113.536 37.6994 124.942 37.6994 126.597 37.6994C126.918 39.2167 127.93 44.1824 127.93 44.1824H138.277L129.262 0.964844Z" fill="#00579F" />
                                    <path d="M39.5975 0.964844L28.6537 30.4355L27.4578 24.4585C25.4345 17.5618 19.089 10.0687 12.0078 6.34297L22.032 44.1372H33.8491L51.414 0.964844H39.5975Z" fill="#00579F" />
                                    <path d="M18.4913 0.964844H0.51206L0.328125 1.83808C14.3531 5.42452 23.6415 14.0695 27.4577 24.4603L23.5492 4.59772C22.9058 1.83747 20.9283 1.05589 18.4913 0.964844Z" fill="#FAA61A" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2678_227">
                                        <rect width="137.949" height="44.6456" fill="white" transform="translate(0.328125 0.177734)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* VISA Logo */}

                            {/* AmazonPay Logo */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 86 85" fill="none">
                                <path d="M23.8413 21.25L23.2862 21.3434C21.549 21.5612 19.874 22.2111 18.4821 23.2629C18.1713 23.4489 17.8927 23.6981 17.5846 23.9478C17.5527 23.8867 17.5223 23.8221 17.5223 23.761C17.4586 23.4183 17.4278 23.0505 17.3667 22.7078C17.2737 22.15 16.9647 21.8674 16.4069 21.8674H14.9491C14.0513 21.8674 13.8959 22.0571 13.8959 22.9257V49.8203C13.9278 50.224 14.1733 50.4369 14.5133 50.4688H17.211C17.5829 50.4688 17.7992 50.224 17.8284 49.8203C17.8603 49.6954 17.8595 49.5716 17.8595 49.4467V40.1032C17.9844 40.228 18.0786 40.2911 18.1397 40.3522C20.4028 42.2434 23.0066 42.8607 25.8594 42.3029C28.4625 41.7769 30.2579 40.1965 31.4054 37.8723C32.3032 36.1059 32.6705 34.3098 32.7024 32.3575C32.7635 30.2192 32.5782 28.1609 31.6803 26.1475C30.6258 23.6692 28.8305 22.0257 26.1344 21.4679C25.7306 21.3749 25.2982 21.3422 24.8945 21.2811C24.5226 21.2493 24.1813 21.25 23.8413 21.25ZM44.4843 21.25C44.3595 21.2819 44.2408 21.3123 44.116 21.3123C42.8755 21.3734 41.6644 21.5281 40.4584 21.8362C39.6828 22.0222 38.9402 22.3 38.1965 22.547C37.7316 22.7011 37.5116 23.0438 37.5116 23.5379C37.5435 23.9417 37.5116 24.3741 37.5116 24.7778C37.5435 25.3967 37.7935 25.5571 38.3832 25.4004C39.374 25.1534 40.3652 24.8756 41.3559 24.6896C42.9045 24.4107 44.4862 24.2851 46.0666 24.5029C46.9034 24.6569 47.6782 24.8753 48.2041 25.5872C48.6689 26.1768 48.857 26.9186 48.8889 27.6624C48.9208 28.7169 48.92 29.5521 48.92 30.6039C48.92 30.665 48.9208 30.7252 48.8889 30.7544H48.7333C47.3998 30.4144 46.0389 30.23 44.6763 30.137C43.2499 30.0759 41.8263 30.1384 40.4636 30.6351C38.822 31.1929 37.4857 32.1822 36.7127 33.7946C36.123 35.035 36.0287 36.3392 36.2146 37.67C36.4936 39.4683 37.3631 40.8299 38.9435 41.6959C40.4629 42.5326 42.0742 42.6225 43.7476 42.3755C45.6681 42.0966 47.3703 41.2917 48.8578 40.0513C48.9189 39.9902 48.9835 39.9619 49.0445 39.9008C49.1375 40.3975 49.2006 40.8634 49.2936 41.2964C49.3547 41.7001 49.6065 41.9441 49.9784 41.976H52.0536C52.3644 41.976 52.645 41.6986 52.645 41.3586C52.6769 41.2657 52.6761 41.1384 52.6761 41.0162V27.7921C52.6682 27.2635 52.6342 26.7045 52.5412 26.1786C52.2942 24.537 51.6111 23.1718 50.1236 22.3032C49.2869 21.8064 48.3596 21.5597 47.3688 21.4056C46.904 21.3419 46.4692 21.3111 46.0044 21.25H44.4843ZM55.2286 21.2552C54.9178 21.2552 54.7629 21.5307 54.824 21.8414C54.8851 22.0911 54.98 22.3726 55.073 22.6196C57.5513 28.7556 60.0595 34.8874 62.5696 41.0526C62.7874 41.5785 62.8167 42.0156 62.5696 42.5415C62.1685 43.4685 61.8249 44.4289 61.392 45.3586C61.0201 46.1953 60.4021 46.8184 59.4724 47.0654C58.8535 47.2222 58.1725 47.2829 57.5217 47.1899C57.2109 47.1581 56.8987 47.0973 56.5879 47.0654C56.1523 47.0336 55.9401 47.218 55.9083 47.6828V48.9279C55.9401 49.6425 56.1562 49.9496 56.868 50.0745C57.5507 50.1967 58.2617 50.2864 59.0055 50.3183C61.173 50.3475 62.8807 49.4859 63.9963 47.5946C64.4612 46.8509 64.834 46.0752 65.174 45.2704C68.1782 37.6788 71.1535 30.1186 74.1285 22.4951C74.2214 22.2773 74.2782 22.0573 74.3101 21.8103C74.3711 21.4384 74.1857 21.2551 73.8483 21.2604H71.3425C70.9096 21.2285 70.5057 21.5051 70.3516 21.9089C70.2905 22.0948 70.2259 22.2469 70.1648 22.4329L65.7343 35.1071C65.4235 36.0049 65.0801 36.9334 64.7693 37.9242C64.7056 37.7675 64.6767 37.7059 64.6448 37.6129C63.0033 33.0893 61.3941 28.5699 59.7526 24.0463C59.5055 23.3026 59.2273 22.5844 58.9484 21.8726C58.8262 21.5299 58.5428 21.2863 58.1391 21.2863C57.1775 21.2544 56.2194 21.2552 55.2286 21.2552ZM23.8102 24.4717C25.7014 24.6258 27.2491 25.5564 28.0539 27.7557C28.5507 29.1184 28.6765 30.433 28.6765 31.8594C28.6765 33.1929 28.5847 34.3718 28.1836 35.6415C27.315 38.3376 25.3302 39.3901 22.7881 39.2679C20.9899 39.1749 19.4727 38.4896 18.0463 37.4988C17.8922 37.4058 17.7992 37.256 17.8284 37.0993V26.5781C17.7992 26.3921 17.8922 26.2404 18.0463 26.1475C19.7808 24.9389 21.7011 24.3177 23.8102 24.4717ZM43.9136 32.84C44.4442 32.7935 44.9791 32.8035 45.5063 32.8659C46.5609 32.9589 47.6165 33.1424 48.671 33.2965C48.8888 33.3284 48.946 33.4219 48.946 33.6078C48.9141 34.2294 48.946 34.8176 48.946 35.4391C48.946 36.0581 48.9148 36.6178 48.9148 37.2394C48.9467 37.3934 48.8529 37.5148 48.7281 37.6077C47.3017 38.6304 45.7527 39.3154 43.9863 39.5013C43.2744 39.5624 42.5599 39.5624 41.8799 39.2834C41.1043 39.0045 40.5206 38.3522 40.3028 37.5766C40.0558 36.7718 40.0565 35.9354 40.2717 35.1279C40.6117 34.0733 41.3534 33.4887 42.3468 33.1461C42.8582 32.9907 43.383 32.8865 43.9136 32.84ZM77.4177 53.1302C74.9384 53.1647 72.0119 53.7201 69.7913 55.278C69.106 55.7535 69.2261 56.4136 69.9885 56.326C72.4853 56.0258 78.0429 55.352 79.0363 56.6217C80.0324 57.8914 77.9348 63.1296 77.0078 65.4724C76.7209 66.171 77.3274 66.4602 77.9676 65.929C82.122 62.4493 83.2014 55.1548 82.3514 54.1055C81.9251 53.5809 79.8969 53.0957 77.4177 53.1302ZM3.50957 55.7864C2.93034 55.8661 2.68086 56.6003 3.28648 57.182C13.691 66.9411 27.4393 71.7188 42.7048 71.7188C53.5928 71.7188 66.2328 68.1662 74.9585 61.4725C76.4009 60.3595 75.1722 58.6918 73.6927 59.3506C63.9097 63.667 53.2841 65.7474 43.6127 65.7474C29.2796 65.7474 15.4041 62.755 4.17882 55.9576C3.93311 55.8089 3.70264 55.7599 3.50957 55.7864Z" fill="black" />
                            </svg>
                            {/* AmazonPay Logo */}

                            {/* GooglePayLogo */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="19.7" viewBox="0 0 161 77" fill="none">
                                <g clip-path="url(#clip0_2678_170)">
                                    <path d="M76.1175 39.3438V57.9176H70.126V11.9824H85.704C89.4986 11.9824 93.0936 13.3804 95.8896 15.9768C98.6857 18.3734 100.084 21.9683 100.084 25.763C100.084 29.5576 98.6857 32.9528 95.8896 35.5491C93.0936 38.1455 89.6983 39.5435 85.704 39.5435L76.1175 39.3438ZM76.1175 17.5745V33.552H86.1034C88.3003 33.552 90.4972 32.7531 91.8952 31.1554C95.0907 28.1596 95.0907 23.1666 92.095 20.1709L91.8952 19.9711C90.2975 18.3734 88.3003 17.3748 86.1034 17.5745H76.1175Z" fill="#5F6368" />
                                    <path d="M113.864 25.5625C118.257 25.5625 121.653 26.7608 124.249 29.1574C126.845 31.554 128.044 34.7495 128.044 38.7439V57.9168H122.451V53.523H122.252C119.855 57.1179 116.46 58.9154 112.466 58.9154C109.07 58.9154 106.075 57.9168 103.678 55.9196C101.481 53.9225 100.083 51.1264 100.083 48.1306C100.083 44.9351 101.281 42.3388 103.678 40.3416C106.075 38.3445 109.47 37.5456 113.464 37.5456C117.059 37.5456 119.855 38.1447 122.052 39.5428V38.1447C122.052 36.1476 121.253 34.1504 119.655 32.9521C118.058 31.554 116.06 30.7552 113.864 30.7552C110.468 30.7552 107.872 32.1532 106.075 34.9492L100.882 31.7538C104.077 27.5597 108.271 25.5625 113.864 25.5625ZM106.274 48.3304C106.274 49.9281 107.073 51.3261 108.271 52.125C109.669 53.1236 111.267 53.7227 112.865 53.7227C115.262 53.7227 117.658 52.7242 119.456 50.9267C121.453 49.1292 122.451 46.9323 122.451 44.5357C120.654 43.1377 118.058 42.3388 114.662 42.3388C112.266 42.3388 110.269 42.938 108.671 44.1363C107.073 45.1349 106.274 46.5329 106.274 48.3304Z" fill="#5F6368" />
                                    <path d="M160.398 26.5605L140.626 71.8965H134.634L142.024 56.1188L129.042 26.7603H135.433L144.82 49.3284H145.019L154.206 26.7603H160.398V26.5605Z" fill="#5F6368" />
                                    <path d="M52.3515 35.3494C52.3515 33.552 52.1518 31.7545 51.9521 29.957H26.9873V40.1427H41.1673C40.5681 43.3381 38.7707 46.3339 35.9746 48.1314V54.7221H44.5625C49.5554 50.1286 52.3515 43.3381 52.3515 35.3494Z" fill="#4285F4" />
                                    <path d="M26.9876 61.114C34.1775 61.114 40.169 58.7174 44.5628 54.723L35.9749 48.1323C33.5783 49.73 30.5825 50.7286 26.9876 50.7286C20.1972 50.7286 14.2057 46.1351 12.2085 39.7441H3.4209V46.5346C8.01441 55.5219 17.0017 61.114 26.9876 61.114Z" fill="#34A853" />
                                    <path d="M12.2068 39.7436C11.0085 36.5481 11.0085 32.9532 12.2068 29.558V22.7676H3.41922C-0.375418 30.1571 -0.375418 38.9447 3.41922 46.534L12.2068 39.7436Z" fill="#FBBC04" />
                                    <path d="M26.9871 18.773C30.7818 18.773 34.3767 20.1711 37.1727 22.7674L44.762 15.1781C39.9688 10.7843 33.5778 8.18798 27.1868 8.3877C17.2009 8.3877 8.01391 13.9798 3.62012 22.9671L12.4077 29.7575C14.2052 23.3665 20.1967 18.773 26.9871 18.773Z" fill="#EA4335" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2678_170">
                                        <rect width="159.774" height="76.0926" fill="white" transform="translate(0.624023)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* GooglePayLogo */}

                            {/* PhonePay Logo */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 71 70" fill="none">
                                <g clip-path="url(#clip0_2678_178)">
                                    <path d="M69.1586 43.0534C73.5809 24.3251 61.9837 5.55781 43.2554 1.13546C24.5271 -3.28688 5.75979 8.31037 1.33745 27.0387C-3.0849 45.7669 8.51235 64.5342 27.2406 68.9566C45.9689 73.3789 64.7362 61.7817 69.1586 43.0534Z" fill="#5F259F" />
                                    <path d="M51.0608 25.9538C51.0608 24.5914 49.8933 23.4227 48.5309 23.4227H43.8585L33.1534 11.1594C32.1795 9.99183 30.6224 9.60222 29.0654 9.99183L25.3667 11.1594C24.7824 11.3541 24.5876 12.1333 24.9771 12.5217L36.6571 23.6175H18.9436C18.3592 23.6175 17.9697 24.007 17.9697 24.5914V26.5369C17.9697 27.9004 19.1384 29.0679 20.5007 29.0679H23.2253V38.4118C23.2253 45.4193 26.924 49.5064 33.1535 49.5064C35.0991 49.5064 36.6574 49.3116 38.6029 48.5336V54.762C38.6029 56.514 39.9664 57.8775 41.7182 57.8775H44.4429C45.0273 57.8775 45.6105 57.2931 45.6105 56.7087V28.8731H50.0883C50.6725 28.8731 51.0609 28.4836 51.0609 27.9004V25.9538H51.0608ZM38.6029 42.6934C37.4354 43.2777 35.8782 43.4725 34.7107 43.4725C31.5952 43.4725 30.0382 41.9154 30.0382 38.4117V29.0678H38.6029V42.6934Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2678_178">
                                        <rect width="69.6992" height="69.6992" fill="white" transform="translate(0.398438 0.197266)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* PhonePay Logo */}

                            {/* American Express Logo */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="18.5" viewBox="0 0 72 72" fill="none">
                                <g clip-path="url(#clip0_2678_206)">
                                    <path d="M0.0976562 0.205078H71.7786V38.9006L68.2306 44.4444L71.7786 49.3783V71.886H0.0976562V35.408L2.31516 32.8579L0.0976562 30.4186V0.205078Z" fill="#016FD0" />
                                    <path d="M14.0127 50.1542V38.9004H25.9284L27.2069 40.567L28.5276 38.9004H71.7788V49.3781C71.7788 49.3781 70.6477 50.143 69.3395 50.1542H45.3904L43.9491 48.3802V50.1542H39.2258V47.126C39.2258 47.126 38.5805 47.5487 37.1857 47.5487H35.578V50.1542H28.4265L27.1499 48.4519L25.8537 50.1542H14.0127Z" fill="white" />
                                    <path d="M0.0976562 30.4168L2.7847 24.1523H7.43167L8.9566 27.6614V24.1523H14.7332L15.641 26.6886L16.5211 24.1523H42.4521V25.4274C42.4521 25.4274 43.8152 24.1523 46.0555 24.1523L54.4692 24.1817L55.9678 27.6449V24.1523H60.8019L62.1324 26.1417V24.1523H67.0109V35.4062H62.1324L60.8574 33.4104V35.4062H53.7549L53.0407 33.6322H51.1313L50.4286 35.4062H45.612C43.6843 35.4062 42.4521 34.1572 42.4521 34.1572V35.4062H35.1897L33.7483 33.6322V35.4062H6.74325L6.02949 33.6322H4.1262L3.41748 35.4062H0.0976562V30.4168Z" fill="white" />
                                    <path d="M3.73557 25.541L0.111328 33.9675H2.4709L3.13961 32.2802H7.02718L7.69243 33.9675H10.104L6.4832 25.541H3.73557ZM5.07647 27.5021L6.26145 30.4507H3.88802L5.07647 27.5021Z" fill="#016FD0" />
                                    <path d="M10.3545 33.9656V25.5391L13.7076 25.5515L15.6578 30.9844L17.5614 25.5391H20.8877V33.9656H18.781V27.7566L16.5479 33.9656H14.7004L12.4611 27.7566V33.9656H10.3545Z" fill="#016FD0" />
                                    <path d="M22.3281 33.9656V25.5391H29.2024V27.424H24.4569V28.8653H29.0915V30.6393H24.4569V32.1362H29.2024V33.9656H22.3281Z" fill="#016FD0" />
                                    <path d="M30.4219 25.541V33.9675H32.5285V30.9739H33.4155L35.9414 33.9675H38.5158L35.7439 30.863C36.8815 30.767 38.055 29.7907 38.055 28.2748C38.055 26.5016 36.6632 25.541 35.1098 25.541H30.4219ZM32.5285 27.4259H34.9366C35.5142 27.4259 35.9345 27.8778 35.9345 28.3129C35.9345 28.8727 35.39 29.1999 34.9678 29.1999H32.5285V27.4259Z" fill="#016FD0" />
                                    <path d="M41.066 33.9656H38.915V25.5391H41.066V33.9656Z" fill="#016FD0" />
                                    <path d="M46.1665 33.9656H45.7022C43.4557 33.9656 42.0918 32.1958 42.0918 29.787C42.0918 27.3187 43.4405 25.5391 46.2773 25.5391H48.6057V27.5348H46.1922C45.0406 27.5348 44.2261 28.4335 44.2261 29.8078C44.2261 31.4397 45.1574 32.1251 46.4991 32.1251H47.0535L46.1665 33.9656Z" fill="#016FD0" />
                                    <path d="M50.7502 25.541L47.126 33.9675H49.4855L50.1543 32.2802H54.0418L54.7071 33.9675H57.1186L53.4978 25.541H50.7502ZM52.0911 27.5021L53.2761 30.4507H50.9027L52.0911 27.5021Z" fill="#016FD0" />
                                    <path d="M57.3652 33.9656V25.5391H60.0436L63.4634 30.8334V25.5391H65.57V33.9656H62.9783L59.4719 28.5327V33.9656H57.3652Z" fill="#016FD0" />
                                    <path d="M15.4541 48.7136V40.2871H22.3284V42.172H17.5829V43.6134H22.2175V45.3874H17.5829V46.8842H22.3284V48.7136H15.4541Z" fill="#016FD0" />
                                    <path d="M49.1387 48.7136V40.2871H56.0129V42.172H51.2675V43.6134H55.8799V45.3874H51.2675V46.8842H56.0129V48.7136H49.1387Z" fill="#016FD0" />
                                    <path d="M22.5943 48.7136L25.9414 44.5523L22.5146 40.2871H25.1687L27.2095 42.9239L29.2573 40.2871H31.8074L28.4257 44.5004L31.7789 48.7136H29.1252L27.1437 46.1185L25.2103 48.7136H22.5943Z" fill="#016FD0" />
                                    <path d="M32.0293 40.2871V48.7136H34.1914V46.0526H36.4089C38.2852 46.0526 39.7074 45.0572 39.7074 43.1214C39.7074 41.5177 38.592 40.2871 36.6826 40.2871H32.0293ZM34.1914 42.1928H36.5267C37.1328 42.1928 37.5661 42.5643 37.5661 43.1629C37.5661 43.7253 37.135 44.1331 36.5197 44.1331H34.1914V42.1928Z" fill="#016FD0" />
                                    <path d="M40.6221 40.2871V48.7136H42.7287V45.72H43.6157L46.1416 48.7136H48.716L45.9441 45.6091C47.0817 45.5131 48.2551 44.5368 48.2551 43.0209C48.2551 41.2476 46.8634 40.2871 45.31 40.2871H40.6221ZM42.7287 42.172H45.1368C45.7144 42.172 46.1347 42.6239 46.1347 43.059C46.1347 43.6188 45.5902 43.946 45.168 43.946H42.7287V42.172Z" fill="#016FD0" />
                                    <path d="M56.9882 48.7136V46.8842H61.2042C61.8281 46.8842 62.0982 46.5471 62.0982 46.1774C62.0982 45.8231 61.8289 45.465 61.2042 45.465H59.299C57.643 45.465 56.7207 44.456 56.7207 42.9412C56.7207 41.5901 57.5653 40.2871 60.0262 40.2871H64.1286L63.2416 42.1831H59.6936C59.0153 42.1831 58.8065 42.539 58.8065 42.8788C58.8065 43.2282 59.0645 43.6134 59.5827 43.6134H61.5784C63.4245 43.6134 64.2256 44.6605 64.2256 46.0318C64.2256 47.5061 63.3329 48.7136 61.4779 48.7136H56.9882Z" fill="#016FD0" />
                                    <path d="M64.7196 48.7136V46.8842H68.9357C69.5595 46.8842 69.8296 46.5471 69.8296 46.1774C69.8296 45.8231 69.5603 45.465 68.9357 45.465H67.0305C65.3744 45.465 64.4521 44.456 64.4521 42.9412C64.4521 41.5901 65.2967 40.2871 67.7576 40.2871H71.86L70.973 42.1831H67.425C66.7468 42.1831 66.538 42.539 66.538 42.8788C66.538 43.2282 66.796 43.6134 67.3141 43.6134H69.3099C71.156 43.6134 71.957 44.6605 71.957 46.0318C71.957 47.5061 71.0644 48.7136 69.2094 48.7136H64.7196Z" fill="#016FD0" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2678_206">
                                        <rect x="0.0976562" y="0.205078" width="71.8594" height="71.681" rx="3" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* American Express Logo */}

                            {/* Paytm Logo */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="15.3" viewBox="0 0 190 60" fill="none">
                                <g clip-path="url(#clip0_2678_181)">
                                    <path d="M188.696 17.9472C186.986 13.06 182.328 9.55059 176.857 9.55059H176.742C173.185 9.55059 169.98 11.031 167.698 13.4074C165.412 11.031 162.207 9.55059 158.654 9.55059H158.54C155.413 9.55059 152.555 10.6954 150.36 12.5903V11.627C150.285 10.6678 149.496 9.91377 148.521 9.91377H140.128C139.101 9.91377 138.272 10.7428 138.272 11.7731V57.3486C138.272 58.3789 139.101 59.2079 140.128 59.2079H148.521C149.456 59.2079 150.226 58.5092 150.348 57.6052L150.344 24.8872C150.344 24.7727 150.348 24.6661 150.36 24.5595C150.494 23.0989 151.564 21.8988 153.254 21.7488H153.566H154.446H154.801C155.508 21.812 156.104 22.0607 156.574 22.4357C157.304 23.016 157.711 23.9082 157.711 24.8872L157.742 57.4434C157.742 58.4737 158.575 59.3066 159.598 59.3066H167.99C168.981 59.3066 169.786 58.5171 169.834 57.5341L169.83 24.8437C169.826 23.77 170.323 22.7989 171.196 22.2225C171.626 21.9462 172.143 21.7606 172.739 21.7054H173.051H173.931H174.287C176.103 21.8633 177.2 23.241 177.196 24.8437L177.228 57.3565C177.228 58.3868 178.061 59.2158 179.083 59.2158H187.476C188.498 59.2158 189.331 58.3868 189.331 57.3565V22.3883C189.331 20.0039 189.063 18.9894 188.696 17.9472Z" fill="#54C1F0" />
                                    <path d="M131.88 10.0335H127.08V2.25661C127.08 2.24872 127.08 2.24082 127.08 2.23293C127.08 1.29734 126.322 0.539392 125.386 0.539392C125.276 0.539392 125.169 0.555182 125.066 0.57492C119.745 2.03555 120.811 9.40579 111.096 10.0335H110.879H110.152C110.01 10.0335 109.876 10.0532 109.746 10.0808C108.917 10.2664 108.293 11.0046 108.293 11.8889V20.2815C108.293 21.304 109.126 22.1369 110.152 22.1369H115.217L115.209 57.7249C115.209 58.7394 116.03 59.5605 117.045 59.5605H125.343C126.353 59.5605 127.175 58.7394 127.175 57.7249L127.178 22.1369H131.88C132.903 22.1369 133.736 21.304 133.736 20.2815V11.8889C133.736 10.8664 132.903 10.0335 131.88 10.0335Z" fill="#54C1F0" />
                                    <path d="M101.681 10.0316H93.2882C92.2658 10.0316 91.4368 10.8645 91.4368 11.887V29.2408C91.417 30.3146 90.5486 31.1751 89.4709 31.1751H85.9575C84.8679 31.1751 83.9876 30.2988 83.9876 29.2092L83.956 11.887C83.956 10.8645 83.1231 10.0316 82.1006 10.0316H73.7079C72.6815 10.0316 71.8525 10.8645 71.8525 11.887V30.9067C71.8525 38.1309 77.0042 43.2826 84.2323 43.2826C84.2323 43.2826 89.6564 43.2826 89.8222 43.3141C90.8012 43.4247 91.5631 44.2458 91.5631 45.2564C91.5631 46.2551 90.817 47.0723 89.8498 47.1947C89.8025 47.2026 89.759 47.2144 89.7077 47.2223L77.4345 47.2657C76.4081 47.2657 75.5791 48.0987 75.5791 49.1211V57.5098C75.5791 58.5362 76.4081 59.3652 77.4345 59.3652H91.1565C98.3886 59.3652 103.536 54.2175 103.536 46.9894V11.887C103.536 10.8645 102.707 10.0316 101.681 10.0316Z" fill="#233266" />
                                    <path d="M20.4468 25.4121V29.3282V30.5914C20.4468 31.677 19.5665 32.5613 18.4809 32.5613L13.1556 32.5652V22.1869H18.4809C19.5665 22.1869 20.4468 23.0633 20.4468 24.1528V25.4121ZM21.185 10.0321H2.84037C1.83372 10.0321 1.02051 10.8493 1.02051 11.852V20.0749C1.02051 20.0907 1.02446 20.1065 1.02446 20.1223C1.02446 20.1618 1.02051 20.2012 1.02051 20.2368V46.6109V57.4551C1.02051 58.4657 1.77845 59.2908 2.71799 59.3145H2.8759H11.2686C12.291 59.3145 13.124 58.4854 13.124 57.4591L13.1556 44.7042H21.185C27.9039 44.7042 32.5858 40.0421 32.5858 33.2956V21.4566C32.5858 14.7101 27.9039 10.0321 21.185 10.0321Z" fill="#233266" />
                                    <path d="M55.2713 45.1147V46.4253C55.2713 46.5319 55.2555 46.6345 55.2397 46.7332C55.22 46.828 55.1924 46.9188 55.1608 47.0056C54.9002 47.7399 54.166 48.2728 53.2936 48.2728H49.7999C48.7103 48.2728 47.8221 47.4438 47.8221 46.4253V44.8423C47.8221 44.8226 47.8182 44.8028 47.8182 44.7831L47.8221 40.571V40.5631V40.0973V39.2525L47.8261 39.2406C47.83 38.2261 48.7103 37.405 49.7999 37.405H53.2936C54.387 37.405 55.2713 38.23 55.2713 39.2525V45.1147ZM53.937 10.0794H42.2915C41.2611 10.0794 40.4282 10.861 40.4282 11.8203V15.085C40.4282 15.1047 40.4321 15.1284 40.4321 15.1482C40.4321 15.1719 40.4282 15.1955 40.4282 15.2192V19.6919C40.4282 20.7064 41.3125 21.5355 42.402 21.5355H53.4909C54.3673 21.6736 55.0621 22.3131 55.1608 23.3119V24.3935C55.0621 25.3449 54.3752 26.0397 53.5383 26.1187H48.0471C40.744 26.1187 35.541 30.9703 35.541 37.7839V47.2938V47.5425C35.541 54.3167 40.0137 59.1367 47.2655 59.1367H62.4837C65.2154 59.1367 67.43 57.0682 67.43 54.5219V22.6763C67.43 14.9547 63.4508 10.0794 53.937 10.0794Z" fill="#233266" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2678_181">
                                        <rect width="188.42" height="59.14" fill="white" transform="translate(0.957031 0.476562)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* Paytm Logo */}
                        </div>
                    </section>

                    <section className={styles.mission}>
                        <h1 className={styles.headingtext}>
                            FAQs
                        </h1>

                        <FAQ data={faqData} />

                    </section>
                </div>
                <Footer />
            </div>
        </SmoothScrolling>
    )
}

export default BurnerPlans
