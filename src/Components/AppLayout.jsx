import { Outlet } from "react-router-dom";
import BahjahLogo from "../assests/bahjah-logo.svg";
import FooterLogo from "../assests/footerLogo.png";

export default function AppLayout({ spreadItems = true }) {
    return <div className={`min-h-dvh overflow-y-scroll w-full overflow-x-hidden bg-custom text-white flex flex-col justify-between`}>
        <div className="flex-none w-full flex justify-center pt-4">
            <img
                src={BahjahLogo}
                alt="Bahjah"
                className="w-[80px] h-[32px] object-contain"
            />
        </div>

        <main className={`${spreadItems ? '' : 'flex-1'} pt-4 px-4 md:w-[400px] md:mx-auto`}>
            <Outlet />
        </main>

        <div className="flex-none w-full flex justify-center py-4">
            <img
                src={FooterLogo}
                alt="Decorative Pattern"
                className="w-[210px] h-[60px] object-contain"
            />
        </div>
    </div>;
}