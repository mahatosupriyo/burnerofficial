import HomeSkeleton from "@/components/layouts/dashboard/homeskeleton/homeskeleton";
import SettingsSkeleton from "@/components/layouts/settings/settingskeleton";
import NavBar from "@/components/navbar/navbar";

export default function Loading() {
    return (
        <>
            <NavBar />
            <HomeSkeleton/>
        </>
    )
}