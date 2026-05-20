namespace Backend.Models
{
    public class CvData
    {
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public CurrentPosition CurrentPosition { get; set; } = new();
        public Contact Contact { get; set; } = new();
        public List<Education> Education { get; set; } = new();
        public Skills Skills { get; set; } = new();
        public List<Experience> Experience { get; set; } = new();
        public List<Project> Projects { get; set; } = new();
        public List<Certificate> Certificates { get; set; } = new();
        public List<string> AreasOfInterest { get; set; } = new();
    }

    public class CurrentPosition
    {
        public string Role { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public List<string> Description { get; set; } = new();
    }

    public class Contact
    {
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Github { get; set; } = string.Empty;
        public string Linkedin { get; set; } = string.Empty;
    }

    public class Education
    {
        public string Institution { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Gpa { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string GraduationDate { get; set; } = string.Empty;
        public List<string> Honors { get; set; } = new();
    }

    public class Skills
    {
        public List<string> ProgrammingLanguages { get; set; } = new();
        public List<string> Frontend { get; set; } = new();
        public List<string> Backend { get; set; } = new();
        public List<string> Databases { get; set; } = new();
        public List<string> Tools { get; set; } = new();
        public List<string> Languages { get; set; } = new();
        public List<string> PersonalStrengths { get; set; } = new();
    }

    public class Experience
    {
        public string Role { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public List<string> Responsibilities { get; set; } = new();
    }

    public class Project
    {
        public string Organization { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public List<string> Highlights { get; set; } = new();
        public List<string> Technologies { get; set; } = new();
    }

    public class Certificate
    {
        public string Name { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
    }
}