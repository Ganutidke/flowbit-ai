import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import ChatWithData from "@/components/ChatWithData";

export default function ChatWithDataPage() {
  return (
        <main className="p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <ChatWithData />
          </div>
        </main>
  );
}
