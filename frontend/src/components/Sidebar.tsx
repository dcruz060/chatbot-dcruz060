export default function Sidebar() {
  return (
    <aside className="sidebar">
      <section className="card">
        <h3>
          <span className="card-icon" aria-hidden="true">
            ◆
          </span>
          Puesto Actual
        </h3>
        <p className="highlight">Software Engineering TIDE Intern</p>
        <p>PwC Acceleration Center Mexico</p>
        <p className="period">Febrero 2026 - Presente</p>
      </section>

      <section className="card">
        <h3>
          <span className="card-icon" aria-hidden="true">
            ◆
          </span>
          Educacion
        </h3>
        <p className="highlight">Ingenieria Mecatronica</p>
        <p>Facultad de Ingenieria, UNAM</p>
        <p>GPA: 9.49/10 | Graduacion: Junio 2026</p>
      </section>

      <section className="card">
        <h3>
          <span className="card-icon" aria-hidden="true">
            ◆
          </span>
          Skills
        </h3>
        <div className="skill-tags">
          <span>Python</span>
          <span>JavaScript</span>
          <span>TypeScript</span>
          <span>React</span>
          <span>ASP.NET</span>
          <span>SQL</span>
          <span>C++</span>
          <span>Git</span>
          <span>REST APIs</span>
          <span>HTML/CSS</span>
        </div>
      </section>

      <section className="card">
        <h3>
          <span className="card-icon" aria-hidden="true">
            ◆
          </span>
          Contacto
        </h3>
        <ul className="contact-list">
          <li>diego.oviedo1414@gmail.com</li>
          <li>+52 5516020009</li>
          <li>GitHub: OvDiego</li>
          <li>LinkedIn: dco180402</li>
        </ul>
      </section>
    </aside>
  );
}
