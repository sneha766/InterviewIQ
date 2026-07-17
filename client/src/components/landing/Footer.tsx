import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

import { MdEmail } from "react-icons/md";

const socials = [
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  MdEmail,
];

const productLinks = [
  "AI Interview",
  "Resume Analyzer",
  "ATS Checker",
  "Coding Interview",
];

const companyLinks = [
  "About",
  "Pricing",
  "Careers",
  "Contact",
];

const resourceLinks = [
  "Blog",
  "Documentation",
  "Help Center",
  "Privacy Policy",
];

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo */}

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold">
              Interview<span className="text-blue-500">IQ</span>
            </h2>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              Prepare smarter with AI-powered interviews, resume analysis,
              ATS optimization and coding practice — all in one platform.
            </p>

            <div className="mt-8 flex gap-4">
              {socials.map((Icon, index) => (
                <div
                  key={index}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-700 transition hover:border-blue-500 hover:bg-blue-600"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Product */}

          <div>
            <h3 className="font-semibold">Product</h3>

            <ul className="mt-6 space-y-4 text-slate-400">
              {productLinks.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition hover:text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="font-semibold">Company</h3>

            <ul className="mt-6 space-y-4 text-slate-400">
              {companyLinks.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition hover:text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}

          <div>
            <h3 className="font-semibold">Resources</h3>

            <ul className="mt-6 space-y-4 text-slate-400">
              {resourceLinks.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition hover:text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} InterviewIQ AI. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">
              Privacy
            </span>

            <span className="cursor-pointer hover:text-white">
              Terms
            </span>

            <span className="cursor-pointer hover:text-white">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}