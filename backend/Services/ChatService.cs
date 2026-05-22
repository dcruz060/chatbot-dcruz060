using System.Text;
using System.Text.Json;
using Backend.Models;

namespace Backend.Services
{
    public class ChatService
    {
        private readonly CvData _cv;
        private readonly HttpClient _httpClient;
        private readonly string _apiUrl;
        private readonly string _apiKey;
        private readonly string _model;
        private readonly string _systemPrompt;

        public ChatService(CvDataService cvDataService, IConfiguration config)
        {
            _cv = cvDataService.GetCvData();
            _httpClient = new HttpClient();

            _apiUrl = config["GenAI:Url"] ?? throw new Exception("GenAI:Url not configured");
            _apiKey = config["GenAI:ApiKey"] ?? throw new Exception("GenAI:ApiKey not configured");
            _model = config["GenAI:Model"] ?? throw new Exception("GenAI:Model not configured");

            _systemPrompt = BuildSystemPrompt();
        }

        private string BuildSystemPrompt()
        {
            var cvJson = JsonSerializer.Serialize(_cv, new JsonSerializerOptions { WriteIndented = true });

            return $@"Eres el asistente virtual de {_cv.Name}. Tu trabajo es responder preguntas sobre su CV de forma profesional, clara y concisa.

REGLAS:
- Solo responde con informacion que este en el CV proporcionado.
- No inventes experiencia, proyectos ni habilidades que no esten en los datos.
- Si no tienes informacion suficiente, di honestamente que esa informacion no aparece en el CV.
- ALWAYS respond in the same language the user writes in (English question → English answer, Spanish question → Spanish answer, etc.).
- Se profesional pero amigable.
- Responde de forma concisa, no mas de 3-4 oraciones a menos que te pidan mas detalle.

CV DE {_cv.Name.ToUpper()}:
{cvJson}";
        }

        public async Task<string> ProcessQuestion(string question)
        {
            var requestBody = new
            {
                model = _model,
                messages = new[]
                {
                    new { role = "system", content = _systemPrompt },
                    new { role = "user", content = question }
                }
            };

            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("API-Key", _apiKey);
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");

            var response = await _httpClient.PostAsync(_apiUrl, content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return $"Error al conectar con el servicio de IA. Status: {response.StatusCode}";
            }

            using var doc = JsonDocument.Parse(responseContent);
            var answer = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return answer ?? "No se pudo obtener una respuesta.";
        }
    }
}