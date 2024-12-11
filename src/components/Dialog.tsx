import { MessageSquare, Phone, User } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";

interface Message {
  speaker: string;
  content: string;
  originalText: string;
}

function Dialog({ data }: { data: any }) {
  const parseConversation = (text: string) => {
    // 1. 먼저 화자별로 분리
    const parts = text.split(/(?=(?:Agent|Automatic Voice|Customer):)/);

    // 2. 각 부분을 파싱하여 메시지 객체로 변환
    const parsedMessages: Message[] = parts
      .map((part) => part.trim())
      .filter((part) => part.length > 0)
      .map((part) => {
        // 화자와 내용 분리
        const match = part.match(/^(Agent|Automatic Voice|Customer):\s*(.*)/);
        if (!match) return null;

        const [, speaker, content] = match;

        // 내용을 문장별로 분리하여 처리
        const sentences = content
          .split(/(?<=[.!?])\s+/)
          .filter((sentence) => sentence.trim().length > 0)
          .map((sentence) => ({
            speaker,
            content: sentence.trim(),
            originalText: `${speaker}: ${sentence.trim()}`,
          }));

        return sentences;
      })
      .filter((item) => item !== null)
      .flat();

    return parsedMessages;
  };

  const getSpeakerColor = (speaker: string) => {
    switch (speaker.toLowerCase()) {
      case "agent":
        return "bg-blue-100";
      case "automatic voice":
        return "bg-gray-100";
      case "customer":
        return "bg-green-100";
      default:
        return "bg-gray-50";
    }
  };

  const getSpeakerIcon = (speaker: string) => {
    switch (speaker.toLowerCase()) {
      case "agent":
        return <User className="w-5 h-5 text-blue-500" />;
      case "automatic voice":
        return <Phone className="w-5 h-5 text-gray-500" />;
      case "customer":
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  const messages = parseConversation(data.dialog);

  return (
    <div className="w-full flex flex-col items-center">
      <AudioPlayer url={data.publicFilePath} />
      <div className="w-full max-h-80 p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start p-4 rounded-lg ${getSpeakerColor(
              message.speaker
            )}`}
          >
            <div className="mr-3">{getSpeakerIcon(message.speaker)}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{message.speaker}</span>
                <span className="text-xs text-gray-500">
                  {index + 1}/{messages.length}
                </span>
              </div>
              <p className="text-gray-700">{message.content}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center pt-4">
          <div className="w-1/2 h-0.5 bg-gray-200"></div>
          <p className="mx-4 text-gray-500 shrink-0">End of Call</p>
          <div className="w-1/2 h-0.5 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export { Dialog };
