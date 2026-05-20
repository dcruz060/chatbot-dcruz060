export default function Sidebar() {
    return (
      <aside className="sidebar">
        <section className="card">
          <h3>Puesto Actual</h3>
          <p className="highlight">Software Engineering TIDE Intern</p>
          <p>PwC Acceleration Center Mexico</p>
          <p className="period">Febrero 2026 - Presente</p>
        </section>
  
        <section className="card">
          <h3>Educacion</h3>
          <p className="highlight">Ingenieria Mecatronica</p>
          <p>Facultad de Ingenieria, UNAM</p>
          <p>GPA: 9.49/10 | Graduacion: Junio 2026</p>
        </section>
  
        <section className="card">
          <h3>Skills</h3>
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
          <h3>Contacto</h3>
          <p>diego.oviedo1414@gmail.com</p>
          <p>+52 5516020009</p>
          <p>GitHub: OvDiego</p>
          <p>LinkedIn: dco180402</p>
        </section>
      </aside>
    );
  }