using Backend.Models;

namespace Backend.Services
{
    public class ChatService
    {
        private readonly CvData _cv;

        public ChatService(CvDataService cvDataService)
        {
            _cv = cvDataService.GetCvData();
        }

        public string ProcessQuestion(string question)
        {
            var q = question.ToLower().Trim();

            // SALUDO
            if (q.Contains("hola") || q.Contains("hi") || q.Contains("hello"))
                return $"¡Hola! Soy el asistente virtual de {_cv.Name}. Puedes preguntarme sobre sus habilidades, educación, experiencia, proyectos o certificados.";

            // PERFIL / RESUMEN
            if (q.Contains("perfil") || q.Contains("resumen") || q.Contains("quién es") || q.Contains("quien es") || q.Contains("descríbete") || q.Contains("describete") || q.Contains("about"))
                return $"{_cv.Name} — {_cv.Title}.\n\n{_cv.Summary}";

            // CONTACTO
            if (q.Contains("contacto") || q.Contains("email") || q.Contains("correo") || q.Contains("teléfono") || q.Contains("telefono") || q.Contains("linkedin") || q.Contains("github"))
                return $"Puedes contactar a {_cv.Name} por:\n" +
                       $"📧 Email: {_cv.Contact.Email}\n" +
                       $"📱 Teléfono: {_cv.Contact.Phone}\n" +
                       $"💼 LinkedIn: {_cv.Contact.Linkedin}\n" +
                       $"🐙 GitHub: {_cv.Contact.Github}\n" +
                       $"📍 Ubicación: {_cv.Contact.Location}";

            // EDUCACIÓN
            if (q.Contains("educación") || q.Contains("educacion") || q.Contains("universidad") || q.Contains("unam") || q.Contains("carrera") || q.Contains("estudios") || q.Contains("gpa") || q.Contains("beca"))
            {
                var edu = _cv.Education[0];
                var honors = string.Join("\n", edu.Honors.Select(h => $"  🏅 {h}"));
                return $"{_cv.Name} estudia {edu.Degree} en {edu.Institution}.\n" +
                       $"📍 {edu.Location}\n" +
                       $"📊 GPA: {edu.Gpa}/10\n" +
                       $"🎓 Graduación esperada: {edu.GraduationDate}\n\n" +
                       $"Reconocimientos:\n{honors}";
            }

            // EXPERIENCIA / PUESTO ACTUAL
            if (q.Contains("experiencia") || q.Contains("trabajo") || q.Contains("pwc") || q.Contains("empleo") || q.Contains("puesto") || q.Contains("empresa") || q.Contains("actual"))
            {
                var exp = _cv.Experience[0];
                var resp = string.Join("\n", exp.Responsibilities.Select(r => $"  • {r}"));
                return $"{_cv.Name} actualmente trabaja como {exp.Role} en {exp.Company}.\n" +
                       $" {exp.Location}\n" +
                       $" {exp.Period}\n\n" +
                       $"Responsabilidades:\n{resp}";
            }

            // SKILLS GENERALES
            if (q.Contains("skills") || q.Contains("habilidades") || q.Contains("tecnologías") || q.Contains("tecnologias") || q.Contains("conocimientos") || q.Contains("sabe") || q.Contains("conoce"))
                return $"Habilidades técnicas de {_cv.Name}:\n\n" +
                       $"💻 Lenguajes: {string.Join(", ", _cv.Skills.ProgrammingLanguages)}\n" +
                       $"⚛️ Frontend: {string.Join(", ", _cv.Skills.Frontend)}\n" +
                       $"🔧 Backend: {string.Join(", ", _cv.Skills.Backend)}\n" +
                       $"🗄️ Bases de datos: {string.Join(", ", _cv.Skills.Databases)}\n" +
                       $"🛠️ Herramientas: {string.Join(", ", _cv.Skills.Tools)}";

            // FRONTEND
            if (q.Contains("frontend") || q.Contains("react") || q.Contains("html") || q.Contains("css"))
                return $"Habilidades Frontend de {_cv.Name}:\n" +
                       $"⚛️ {string.Join(", ", _cv.Skills.Frontend)}\n\n" +
                       $"Durante su onboarding en PwC tomó cursos de HTML & CSS, React y TypeScript.";

            // BACKEND
            if (q.Contains("backend") || q.Contains("asp") || q.Contains(".net") || q.Contains("api") || q.Contains("servidor"))
                return $"Habilidades Backend de {_cv.Name}:\n" +
                       $"🔧 {string.Join(", ", _cv.Skills.Backend)}\n\n" +
                       $"Durante su onboarding en PwC tomó cursos de ASP.NET 8 y HTTP & REST APIs.";

            // SQL / BASE DE DATOS
            if (q.Contains("sql") || q.Contains("base de datos") || q.Contains("database"))
                return $"{_cv.Name} tiene conocimientos de: {string.Join(", ", _cv.Skills.Databases)}.\n" +
                       $"Tomó el curso de SQL for Beginners durante su onboarding en PwC.";

            // CERTIFICADOS / CURSOS / ONBOARDING
            if (q.Contains("curso") || q.Contains("onboarding") || q.Contains("aprendió") || q.Contains("aprendio") || q.Contains("certificado") || q.Contains("capacitación") || q.Contains("capacitacion"))
            {
                var certs = string.Join("\n", _cv.Certificates.Select(c => $"  📜 {c.Name} — {c.Date}"));
                return $"Certificados y cursos de {_cv.Name}:\n\n{certs}";
            }

            // PROYECTOS
            if (q.Contains("proyecto") || q.Contains("project") || q.Contains("android") || q.Contains("kotlin") || q.Contains("app") || q.Contains("robótica") || q.Contains("robotica") || q.Contains("lira") || q.Contains("rover") || q.Contains("robot") || q.Contains("liderazgo"))
            {
                var proyectos = string.Join("\n\n", _cv.Projects.Select(p =>
                    $"🚀 {p.Role}\n" +
                    $"   {p.Organization} | {p.Period}\n" +
                    string.Join("\n", p.Highlights.Select(h => $"   • {h}")) + "\n" +
                    $"   Tecnologías: {string.Join(", ", p.Technologies)}"
                ));
                return $"Proyectos de {_cv.Name}:\n\n{proyectos}";
            }

            // TRAINEE / CANDIDATO
            if (q.Contains("trainee") || q.Contains("candidato") || q.Contains("por qué") || q.Contains("por que") || q.Contains("contratar") || q.Contains("recomendar"))
                return $"{_cv.Name} es un excelente candidato trainee porque:\n\n" +
                       $"   Estudia Ingeniería Mecatrónica en la UNAM con GPA de {_cv.Education[0].Gpa}/10.\n" +
                       $"   Tiene experiencia real como {_cv.Experience[0].Role} en {_cv.Experience[0].Company}.\n" +
                       $"   Ha liderado proyectos de robótica y desarrollo de software.\n" +
                       $"  Completó cursos de onboarding cubriendo el stack completo.\n" +
                       $"   Fortalezas: {string.Join(", ", _cv.Skills.PersonalStrengths)}.";

            // IDIOMAS
            if (q.Contains("idioma") || q.Contains("inglés") || q.Contains("ingles") || q.Contains("language") || q.Contains("english"))
                return $"{_cv.Name} habla:\n {string.Join(", ", _cv.Skills.Languages)}";

            // INTERESES
            if (q.Contains("interés") || q.Contains("interes") || q.Contains("le gusta") || q.Contains("áreas") || q.Contains("areas") || q.Contains("pasión") || q.Contains("pasion"))
                return $"Áreas de interés de {_cv.Name}:\n {string.Join(", ", _cv.AreasOfInterest)}";

            // FORTALEZAS PERSONALES
            if (q.Contains("fortaleza") || q.Contains("soft skills") || q.Contains("personal") || q.Contains("cualidades"))
                return $"Fortalezas personales de {_cv.Name}:\n" +
                       string.Join("\n", _cv.Skills.PersonalStrengths.Select(s => $"   {s}"));

            // DEFAULT
            return $"Esa información no aparece en el CV de {_cv.Name}. " +
                   $"Puedes preguntarme sobre sus habilidades, educación, experiencia, proyectos, certificados o información de contacto.";
        }
    }
}