import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-700">
        CHAT BOT WIDGET
      </h1>
      <ChatWidget />
    </main>
  );
}