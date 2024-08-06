import {LocaleMenu} from "@/components/locale-menu";
import {useTranslations} from "next-intl";
import React from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {
    Bell,
    CircleUser,
} from "lucide-react"
import {useClerk} from "@clerk/nextjs";

const DashboardHeader = () => {
    const router = useRouter();
    const t = useTranslations('waipify.ui');
    const {session, signOut} = useClerk();

    const handleLogout = async () => {
        await signOut();
    }

    return (
        <div className="flex items-center justify-end h-12 bg-white">
            <div className="flex items-center px-6">
                <Link href={'/360/aimanager/ai-services'} className="px-3">
                    <Button variant="link" className="">
                        <span className="text-black font-medium text-sm">
                        {t("general.request_ai_service")}
                        </span>
                    </Button>
                </Link>
                <div className="px-3">
                    <LocaleMenu/>
                </div>
                <div className="h-full px-3 cursor-pointer">
                    <Bell className="h-5 w-5"/>
                </div>
                <div className="px-2 flex flex-col justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                {session?.user?.imageUrl ?
                                    <img src={session.user.imageUrl} alt="Avatar" className="rounded-full object-cover min-w-full h-full" /> :
                                    <CircleUser className="h-5 w-5"/>
                                }
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.push("/user-settings")}
                            >
                                {t("navbar.manage_account")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={handleLogout}
                            >
                                {t("navbar.logout")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
};

export default DashboardHeader;
