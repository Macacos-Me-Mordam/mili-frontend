
'use client';

import { SidebarTrigger } from "@/components/ui/sidebar"; //
import { Separator } from "../ui/separator";
import { User } from "lucide-react";
import { useMemo } from "react";


function useAuth() {
    return {
        user: {
            firstName: "Usuário",
            lastName: "Mili",
        },
    };
}

export function Header() {
    const { user } = useAuth(); //
    const name = useMemo(() => {
        if (!user) return '...'
        return `${user.firstName} ${user.lastName}`
    }, [user])

    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear"> {/* */}
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6"> 
                <SidebarTrigger className="-ml-1" /> 
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                <div className="flex w-full items-center gap-2">
                </div>
                <div className="flex w-full items-center justify-end gap-2"> 
                    <User className="h-5 w-5" />
                    <h1 className="text-base">{name}</h1> 
                </div>
            </div>
        </header>
    );
}