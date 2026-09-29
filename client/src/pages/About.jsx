import SectionHeading from "../components/ui/SectionHeading.jsx";

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "React Query"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "JWT Auth", "WebSockets"],
  },
  {
    title: "Database",
    items: ["MongoDB", "PostgreSQL", "Redis", "Mongoose", "Prisma"],
  },
  {
    title: "DevOps & Tools",
    items: ["Docker", "AWS", "GitHub Actions", "Vercel", "Render", "Linux"],
  },
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "Freelance / Contract",
    period: "2022 — Present",
    description:
      "Design and deliver full-stack products for startups and scale-ups. Lead architecture decisions, mentor engineers, and ship fast without breaking things.",
  },
  {
    role: "Full-Stack Developer",
    company: "Tech Company",
    period: "2019 — 2022",
    description:
      "Built and maintained customer-facing web apps serving thousands of users. Owned features end-to-end from DB schema to pixel-perfect UI.",
  },
  {
    role: "Software Developer",
    company: "Earlier roles",
    period: "2017 — 2019",
    description:
      "Started my career building web apps, learned the fundamentals, and fell in love with shipping products.",
  },
];

export default function About() {
  return (
    <>
      {/* INTRO */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <SectionHeading
          eyebrow="About me"
          title="Engineer, problem-solver, builder."
        />
        <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
          <p>
            I'm <strong className="text-slate-900">Stephen Chad Ethan</strong>, a
            Senior Software Engineer specializing in full-stack web development.
            I've spent the last several years building products that people
            actually use — from early-stage MVPs to production systems serving
            thousands of users.
          </p>
          <p>
            My sweet spot is the intersection of clean architecture and great
            UX. I care as much about database indexes and API contracts as I do
            about the spacing between two buttons. That balance is what turns a
            working app into a delightful one.
          </p>
          <p>
            When I'm not writing code, I'm usually reading about engineering
            systems, writing on my blog, or contributing to open-source
            projects.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <SectionHeading
            eyebrow="Toolbox"
            title="Skills & technologies"
            center
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl bg-white border border-slate-200 p-6"
              >
                <h3 className="font-semibold text-slate-900 mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <SectionHeading eyebrow="Journey" title="Experience" />
        <ol className="relative border-l border-slate-200 ml-3 space-y-8">
          {experience.map((item, i) => (
            <li key={i} className="pl-8 relative">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white bg-brand-600 shadow" />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-semibold text-slate-900">{item.role}</h3>
                <span className="text-sm text-slate-500">· {item.company}</span>
              </div>
              <p className="text-xs uppercase tracking-wider text-brand-600 mt-1 font-semibold">
                {item.period}
              </p>
              <p className="text-slate-600 mt-2">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white p-10 md:p-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Interested in working together?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            I'm open to senior full-stack roles and select freelance projects.
          </p>
          <a
            href="mailto:stephen@stephenchad.dev"
            className="inline-block px-7 py-3.5 rounded-xl bg-white text-brand-700 font-semibold hover:bg-slate-100 transition-colors"
          >
            stephen@stephenchad.dev
          </a>
        </div>
      </section>
    </>
  );
}