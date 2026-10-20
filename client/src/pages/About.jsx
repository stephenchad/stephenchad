import SectionHeading from "../components/ui/SectionHeading.jsx";
import { Helmet } from "react-helmet-async";

const skillGroups = [
  {
    title: "Backend",
    items: ["Node.js", "TypeScript", "JavaScript", "Express", "NestJS", "REST APIs", "GraphQL", "WebSockets", "Microservices"],
  },
  {
    title: "PAYMENTS AND SECURITY",
    items: ["Paystack integration", "HMAC-SHA512 webhook verification", "idempotency", "double-entry ledger", "audit logging", "WebSockets"],
  },
  {
    title: "Data & Messaging",
    items: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "SQL", "Database indexing", "row-level locking],
  },
  {
    title: "Cloud & Delivery",
    items: ["AWS EC2", "Lambda", "S3", "RDS", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "CI/CD"],
  },
  {
    title: "Engineering Practices",
    items: ["System design", "TDD", "unit/integration/E2E testing", "code review", "observability", "mentoring", "agile delivery"],
  },
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "WestPay Global Resources",
    period: "2024–Present",
    description:
      "•	Architected and led delivery of an event-driven payments platform using Node.js, Kafka, and PostgreSQL, processing 1.2M+ transactions monthly at 99.95% uptime." 
      "•	Reduced average API response time by 45% through query optimization, Redis caching, and database indexing; checkout success improved by 8%."
      "•	Introduced CI/CD pipelines, automated testing, and infrastructure as code with GitHub Actions and Terraform, reducing deployment time from 2 hours to 15 minutes."
      "•	Mentored 4 engineers, led weekly design reviews, and established code-quality standards associated with a 30% reduction in production incidents."
  },
  {
    role: "Junior Software Engineer",
    company: "ISM",
    period: "2022–2024",
    description:
      "•	Led a team of 5 engineers in decomposing a legacy monolith into AWS-hosted microservices, improving scalability and reducing infrastructure costs by 25%."
      "•	Implemented role-based access control, audit logging, and OAuth 2.0 authentication to meet internal security and compliance requirements."
      "•	Partnered on a real-time analytics platform serving 50K+ monthly users, backed by WebSockets and React dashboards."
  },
  {
    role: "Software Developer",
    company: "LTM",
    period: "2018–2022",
    description:
      "•	Built and maintained REST APIs and React features used by 10K+ customers; delivered 20+ features across 6 releases.",
      "•	Raised unit and integration test coverage from 40% to 85%; promoted to Senior Engineer within 2 years."
  },
];

export default function About() {
  <Helmet>
  <title>STEPHEN CHAD ETHAN — SENIOR BACKEND SOFTWARE ENGINEER | NODE.JS • TYPESCRIPT • PAYMENTS</title>
  <meta
    name="description"
    content="Senior Software Engineer. Skills, Experience, and Background."
  />
</Helmet>
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
            I'm <strong className="text-slate-900">STEPHEN CHAD ETHAN</strong>, SENIOR BACKEND SOFTWARE ENGINEER | NODE.JS • TYPESCRIPT • PAYMENTS.
            I have 8+ years of experience building backend systems, APIs, payment platforms, and cloud-based services. 
            Strong focus on Node.js, TypeScript, PostgreSQL, event-driven architecture, transaction integrity, 
            API performance, automated testing, and delivery automation. 
            Built payment workflows with concurrency-safe transfers, HMAC-verified webhooks, and idempotency; 
            led a payments platform handling 1.2M+ transactions per month at 99.95% uptime.
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
            href="mailto:stephethanchad@gmail.com"
            className="inline-block px-7 py-3.5 rounded-xl bg-white text-brand-700 font-semibold hover:bg-slate-100 transition-colors"
          >
            stephethanchad@gmail.com
          </a>
        </div>
      </section>
    </>
  );
}
