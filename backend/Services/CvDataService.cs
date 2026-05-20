using System.Text.Json;
using Backend.Models;

namespace Backend.Services
{
    public class CvDataService
    {
        private readonly CvData _cvData;

        public CvDataService(IWebHostEnvironment env)
        {
            // Lee el archivo desde la carpeta del proyecto directamente
            var filePath = Path.Combine(env.ContentRootPath, "Data", "cv.json");
            var jsonContent = File.ReadAllText(filePath);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            _cvData = JsonSerializer.Deserialize<CvData>(jsonContent, options)
                      ?? throw new Exception("No se pudo leer el archivo cv.json");
        }

        public CvData GetCvData() => _cvData;
    }
}