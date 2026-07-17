import { Bell, Search } from "lucide-react";

import { UserButton, useUser } from "@clerk/clerk-react";

export default function Header() {

    const { user } = useUser();

    return (

        <header className="flex items-center justify-between border-b bg-white px-8 py-5">

            <div>

                <p className="text-sm text-slate-500">
                    Welcome Back 👋
                </p>

                <h2 className="text-2xl font-bold">
                    {user?.firstName}
                </h2>

            </div>

            <div className="flex items-center gap-5">

                <div className="relative">

                    <Search
                        className="absolute left-3 top-3"
                        size={18}
                    />

                    <input
                        placeholder="Search..."
                        className="w-72 rounded-xl border py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <button className="rounded-xl border p-2 hover:bg-slate-100">

                    <Bell />

                </button>

                <UserButton />

            </div>

        </header>

    );

}