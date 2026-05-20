using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost]
        public ActionResult<ChatResponse> Post([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Question))
            {
                return BadRequest(new ChatResponse { Answer = "La pregunta no puede estar vacía." });
            }

            var answer = _chatService.ProcessQuestion(request.Question);

            return Ok(new ChatResponse { Answer = answer });
        }
    }
}