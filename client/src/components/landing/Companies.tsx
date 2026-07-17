import google from "../../assets/logos/google.svg";
import meta from "../../assets/logos/meta.svg";
import netflix from "../../assets/logos/netflix.svg";
import stripe from "../../assets/logos/stripe.svg";
import accenture from "../../assets/logos/accenture.svg";
import goldman from "../../assets/logos/goldmansachs.svg";

const companies = [
  google,
  meta,
  netflix,
  stripe,
  accenture,
  goldman,
];

export default function Companies() {
  return (
    <section className="overflow-hidden border-y bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
            Trusted Preparation
          </p>

          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            Prepare for interviews at the world's leading companies
          </h2>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-50 to-transparent" />

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 to-transparent" />

          <div className="flex animate-marquee gap-20">
            {[...companies, ...companies].map((logo, index) => (
              <div
                key={index}
                className="flex h-20 w-44 items-center justify-center rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={logo}
                  alt="Company Logo"
                  className="h-8 w-auto object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}