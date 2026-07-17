import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

import { dashboardLinks } from "../../constants/dashboard";

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="hidden w-72 border-r bg-white lg:flex lg:flex-col">

            <div className="flex items-center gap-3 border-b p-6">

                <div className="rounded-xl bg-blue-600 p-2 text-white">
                    <Sparkles size={22} />
                </div>

                <div>

                    <h1 className="text-xl font-bold">
                        InterviewIQ
                    </h1>

                    <p className="text-sm text-slate-500">
                        AI Platform
                    </p>

                </div>

            </div>

            <nav className="flex flex-col gap-2 p-5">

                {dashboardLinks.map((item) => {

                    const Icon = item.icon;

                    const active = location.pathname === item.path;

                    return (

                        <Link
                            key={item.title}
                            to={item.path}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                active
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >

                            <Icon size={20} />

                            {item.title}

                        </Link>

                    );

                })}

            </nav>

        </aside>
    );
}