import BurnerLoader from "@/components/atoms/lotties/loader";

export default function Loading() {
    return (
        <>
            <div style={{ height: '100lvh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BurnerLoader />
            </div>
        </>
    )
}