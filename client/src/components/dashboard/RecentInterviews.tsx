const interviews = [
  {
    company: "Google",
    role: "Frontend Engineer",
    score: "94%",
    status: "Completed",
  },
  {
    company: "Amazon",
    role: "SDE I",
    score: "91%",
    status: "Completed",
  },
  {
    company: "Microsoft",
    role: "Backend Engineer",
    score: "87%",
    status: "Pending Review",
  },
];

export default function RecentInterviews() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Interviews
      </h2>

      <div className="space-y-5">
        {interviews.map((item) => (
          <div
            key={item.company}
            className="flex items-center justify-between border-b pb-4 last:border-none"
          >
            <div>
              <h3 className="font-semibold">
                {item.company}
              </h3>

              <p className="text-sm text-slate-500">
                {item.role}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">
                {item.score}
              </p>

              <span className="text-xs text-slate-500">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}