import { profile, areasOfInterest } from "../data/profile";
import ProjectImageToggle from "./ProjectImageToggle";

function IconEmail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 8l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3h2l1 4-2 1a11 11 0 005 5l1-2 4 1v2a2 2 0 01-2 2A15 15 0 016 5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s-6-5.15-6-10a6 6 0 1112 0c0 4.85-6 10-6 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10v6M8 7v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 16v-3c0-1.1.9-2 2-2s2 .9 2 2v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

const contactItems = [
  { icon: <IconEmail />, ...profile.contact.email },
  { icon: <IconPhone />, ...profile.contact.phone },
  { icon: <IconLocation />, ...profile.contact.location },
  { icon: <IconLinkedIn />, ...profile.contact.linkedin },
  { icon: <IconGitHub />, ...profile.contact.github },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  return (
    <aside className={`sidebar ${className}`.trim()}>
      <div className="sidebar-inner">
        <div className="sidebar-profile">
          <img src={profile.avatar} alt={profile.name} className="sidebar-avatar" />
          <h1 className="sidebar-name">{profile.name}</h1>
          <p className="sidebar-role">{profile.role}</p>
        </div>

        <ul className="sidebar-contact">
          {contactItems.map((item) => (
            <li key={item.label}>
              <span className="contact-icon">{item.icon}</span>
              {item.href ? (
                item.href.startsWith("mailto:") ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                )
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>

        <hr className="sidebar-divider" />

        <section className="sidebar-section">
          <h2 className="sidebar-section-title">PROFILE</h2>
          <p className="sidebar-summary">{profile.summary}</p>
        </section>

        <hr className="sidebar-divider" />

        <section className="sidebar-section">
          <h2 className="sidebar-section-title">SKILLS</h2>
          <div className="skill-pills">
            {profile.skills.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <hr className="sidebar-divider" />

        <section className="sidebar-section">
          <h2 className="sidebar-section-title">AREAS OF INTEREST</h2>
          <div className="skill-pills">
            {areasOfInterest.map((area) => (
              <span key={area} className="skill-pill">
                {area}
              </span>
            ))}
          </div>
        </section>

        <hr className="sidebar-divider" />

        <section className="sidebar-section">
          <h2 className="sidebar-section-title">EXPERIENCE</h2>
          <div className="timeline-list">
            {profile.experience.map((exp, index) => (
              <div key={index} className="timeline">
                <div className="timeline-node" aria-hidden="true" />
                <div className="timeline-content">
                  <h3 className="timeline-role">{exp.role}</h3>
                  <p className="timeline-company">{exp.company}</p>
                  <p className="timeline-period">{exp.period}</p>
                  <p className="timeline-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="sidebar-divider" />

        <section className="sidebar-section">
          <h2 className="sidebar-section-title">PROJECTS</h2>
          <div className="timeline-list">
            {profile.projects.map((project, index) => (
              <div key={index} className="timeline">
                <div className="timeline-node" aria-hidden="true" />
                <div className="timeline-content">
                  <h3 className="timeline-role">{project.name}</h3>
                  <p className="timeline-company">{project.company}</p>
                  <p className="timeline-period">{project.period}</p>
                  <p className="timeline-desc">{project.description}</p>
                  <div className="skill-pills project-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="skill-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.image && (
                    <ProjectImageToggle imageSrc={project.image} projectName={project.name} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
