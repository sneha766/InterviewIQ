import { Link } from "react-router-dom";
import {
  Menu,
  Sparkles,
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";

import { navLinks } from "../../constants/navLinks";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Sparkles size={20} />
          </div>

          <span className="text-2xl font-bold text-slate-900">
            Interview
            <span className="text-blue-600">IQ</span>
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Auth */}

        <div className="hidden items-center gap-3 lg:flex">
          <SignedOut>
            <Link to="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button>
                Get Started
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link to="/dashboard">
              <Button>
                Dashboard
              </Button>
            </Link>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile Menu */}

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
            >
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px]">
            <div className="mt-10 flex flex-col gap-6">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-slate-700 transition hover:text-blue-600"
                >
                  {item.label}
                </a>
              ))}

              <SignedOut>
                <div className="mt-8 flex flex-col gap-3">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link to="/register">
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="mt-8 flex flex-col gap-4">
                  <Link to="/dashboard">
                    <Button className="w-full">
                      Dashboard
                    </Button>
                  </Link>

                  <div className="flex justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              </SignedIn>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}