import BurnerLoader from "@/components/atoms/lotties/loader";
import HomeSkeleton from "@/components/layouts/dashboard/homeskeleton/homeskeleton";
import SettingsSkeleton from "@/components/layouts/settings/settingskeleton";
import NavBar from "@/components/navbar/navbar";

export default function Loading() {
    return (
        <>
            <NavBar />
            <div style={{ height: '100lvh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BurnerLoader />
            </div>
        </>
    )
}