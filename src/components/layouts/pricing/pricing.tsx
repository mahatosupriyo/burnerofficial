"use client"

import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import styles from './pricing.module.scss'
import Icon from '@/components/atoms/icons';

export default function PricingComponent() {
    const features = [
        { feature: "Access all inspirations", free: true, pro: true },
        { feature: "Burner academy", free: false, pro: true },
        { feature: "Public Portfolio", free: false, pro: true },
        { feature: "Career opportunities", free: false, pro: true },
    ];

    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const router = useRouter();

    const handlePlanSelection = (plan: string) => {
        setSelectedPlan(plan);
    };

    const handlePayment = () => {
        if (!selectedPlan) {
            return;
        }

        const planUrls: Record<string, string> = {
            annually: "https://rzp.io/l/burnerproyearly",
            quarterly: "https://rzp.io/rzp/burnerproquarterly",
        };

        const redirectUrl = planUrls[selectedPlan];
        if (redirectUrl) {
            router.push(redirectUrl);
        }
    };

    return (
        <>
            <div className={styles.offerlayout}>
                Get upto 40% Dto. on Annual subscription on checkout.
            </div>

            <div className={styles.pricingoverlaycontainer}>
                <div className={styles.pricingoverlay}>
                    <div className={styles.top}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="66" viewBox="0 0 59 21" fill="none">
                            <path d="M0 0H19.1178V10.1078L9.55892 20.2155H0V0Z" fill="#111111" />
                            <path d="M19.9413 0H28.9514C34.5337 0 39.0591 4.5254 39.0591 10.1078C39.0591 15.6901 34.5337 20.2155 28.9514 20.2155H19.9413V0Z" fill="#111111" />
                            <path d="M58.9997 0V11.2054C58.9997 16.4847 54.7201 20.7644 49.4408 20.7644C44.1616 20.7644 39.8819 16.4847 39.8819 11.2054V0H58.9997Z" fill="#111111" />
                        </svg>
                    </div>



                    <div className={styles.centerlayout}>

                        <div className={styles.leftlayout}>
                            <h3 className={styles.headertitle}>Burner Pro</h3>
                            <p className={styles.subtitle}>the only subscription you need.</p>
                            <div className={styles.pricingTable}>
                                <div className={styles.header}>
                                    <div className={styles.featureColumn}></div>
                                    <div className={styles.planColumn}>Free</div>
                                    <div className={styles.planColumn}>Pro</div>
                                </div>

                                <div className={styles.body}>
                                    {features.map((item, index) => (
                                        <div className={styles.row} key={index}>
                                            <div className={styles.featureColumn}>{item.feature}</div>
                                            <div className={styles.planColumn}>
                                                {item.free ? <Icon name='check' fill={'#111'} size={10} /> : "-"}
                                            </div>
                                            <div className={styles.planColumn}>
                                                {item.pro ? <Icon name='check' fill={'#111'} size={10} /> : "-"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightlayout}>

                            <div className={styles.planSelector}>
                                <label className={styles.selectorcard}>
                                    <input
                                        type="radio"
                                        name="pricing"
                                        value="annually"
                                        className={styles.input}
                                        onChange={() => handlePlanSelection("annually")}
                                        checked={selectedPlan === "annually"}
                                    />
                                    <div className={styles.plandetails}>
                                        Annually
                                        <div className={styles.price}>
                                            <h2 className={styles.actual}><span style={{ fontWeight: 400 }}>₹</span> 6499</h2>
                                            <h2 className={styles.upfront}><span style={{ fontWeight: 400 }}>₹</span> 3999</h2>
                                            <p className={styles.monthly}>Most Popular</p>
                                        </div>
                                    </div>
                                </label>
                                <label className={styles.selectorcard}>
                                    <input
                                        type="radio"
                                        name="pricing"
                                        value="quarterly"
                                        className={styles.input}
                                        onChange={() => handlePlanSelection("quarterly")}
                                        checked={selectedPlan === "quarterly"}
                                    />
                                    <div className={styles.plandetails}>
                                        Quarterly
                                        <div className={styles.price}>
                                            <h2 className={styles.upfront}><span style={{ fontWeight: 400 }}>₹</span> 2549</h2>
                                        </div>
                                    </div>
                                </label>
                            </div>


                            <button
                                className={selectedPlan ? styles.paybtn : styles.disabledbtn}
                                onClick={handlePayment}
                                disabled={!selectedPlan}
                                aria-disabled={!selectedPlan}
                            >
                                Pay to Subscribe
                            </button>

                            <div className={styles.bottomlayer}>
                                <p className={styles.terms}>
                                    By continuing, you agree to our <a className={styles.inlinelink} target='_blank' href="https://eduburner.org/company/terms">terms</a> and <a className={styles.inlinelink} target='_blank' href="https://eduburner.org/company/privacy">privacy</a>.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div></div>
                </div>
            </div>
        </>

    )
}