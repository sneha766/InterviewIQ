import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "SDE Intern @ Amazon",
    review:
      "InterviewIQ completely changed my interview preparation. The AI feedback felt surprisingly accurate.",
  },
  {
    name: "Priya Gupta",
    role: "Software Engineer @ Microsoft",
    review:
      "The ATS analyzer helped improve my resume significantly. I started getting interview calls within weeks.",
  },
  {
    name: "Aman Verma",
    role: "Backend Developer @ Adobe",
    review:
      "The coding interview simulator is the closest experience to a real technical interview.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Loved by Students
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Thousands of candidates trust InterviewIQ.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="leading-7 text-slate-600">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-bold">{item.name}</h4>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}