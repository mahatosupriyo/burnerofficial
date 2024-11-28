import BurnerLoader from "@/components/atoms/lotties/loader";
// import NavBar from "@/components/navbar/navbar";

export default function Loading() {
    return (
        <>
            <div style={{ height: '100lvh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BurnerLoader />
            </div>
        </>
    )
}