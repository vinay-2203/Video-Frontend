import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send, Video } from "lucide-react";
import { api, getSocket, getUserId } from "@/lib/api";
import { Skeleton } from "@/components/site/Loading";

export const Route = createFileRoute("/chat/$friendId")({
  head: () => ({
    meta: [
      { title: "Live chat — Video Calling" },
      {
        name: "description",
        content:
          "Real-time messaging with your friend: instant delivery, typing indicators and online presence.",
      },
      { property: "og:title", content: "Live chat — Video Calling" },
      {
        property: "og:description",
        content: "Real-time messaging with typing indicators and presence.",
      },
    ],
  }),
  component: StartChat,
});

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function timeLabel(t) {
  return new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function StartChat() {
  const { friendId } = Route.useParams();
  const receiverId = friendId;

  const [friendData, setFriendData] = useState({});
  const [loadingFriend, setLoadingFriend] = useState(true);
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [friendOnline, setFriendOnline] = useState(false);
  const [senderId, setSenderId] = useState(null);
  const chatEndRef = useRef(null);
  const typingTimer = useRef(null);

  useEffect(() => {
    setSenderId(getUserId());
    localStorage.setItem("friendId", friendId);
  }, [friendId]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await api.get("/User/friend-data", { params: { id: friendId } });
        if (active) setFriendData(response.data || {});
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoadingFriend(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [friendId]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (senderId && receiverId) {
      socket.emit("register", senderId);
      socket.emit("joinRoom", { senderId, receiverId });
    }

    const onReceive = (msg) => setChat((prev) => [...prev, msg]);
    const onTyping = () => {
      setIsTyping(true);
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => setIsTyping(false), 1800);
    };
    const onOnline = ({ userId, status }) => {
      if (userId === receiverId) setFriendOnline(status);
    };

    socket.on("receiveMessage", onReceive);
    socket.on("friendTyping", onTyping);
    socket.on("userOnline", onOnline);

    return () => {
      socket.off("receiveMessage", onReceive);
      socket.off("friendTyping", onTyping);
      socket.off("userOnline", onOnline);
      clearTimeout(typingTimer.current);
    };
  }, [senderId, receiverId]);

  useEffect(() => {
    const el = chatEndRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat, isTyping]);

  const handleTyping = () => {
    getSocket()?.emit("typing", { senderId, receiverId });
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const messageObj = {
      senderId,
      receiverId,
      message: newMessage,
      time: new Date().toISOString(),
    };
    getSocket()?.emit("sendMessage", messageObj);
    setNewMessage("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-0 sm:px-5 sm:py-6">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-y border-border bg-surface/40 sm:rounded-3xl sm:border">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-border/70 bg-background/70 px-4 py-3 backdrop-blur-xl">
          <Link
            to="/chat"
            aria-label="Back to chats"
            className="grid size-9 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>

          <span className="relative grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/12 font-display text-xs font-semibold text-primary ring-1 ring-primary/25">
            {initials(friendData.Name) || "?"}
            <span
              className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background transition-colors duration-300 ${
                friendOnline ? "bg-success" : "bg-muted-foreground/60"
              }`}
            />
          </span>

          <div className="min-w-0 flex-1">
            {loadingFriend ? (
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            ) : (
              <>
                <p className="truncate font-display text-[15px] font-semibold">
                  {friendData.Name || "Friend"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {isTyping ? (
                    <span className="text-primary">typing…</span>
                  ) : friendOnline ? (
                    "Online"
                  ) : (
                    friendData.Number || "Offline"
                  )}
                </p>
              </>
            )}
          </div>

          <Link
            to="/meeting"
            aria-label="Start a video call"
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25 transition-transform duration-200 hover:scale-105"
          >
            <Video className="size-4" />
          </Link>
        </header>

        {/* Messages */}
        <div
          ref={chatEndRef}
          className="chat-scroll flex-1 space-y-2 overflow-y-auto bg-grid px-4 py-5"
        >
          {chat.length === 0 && (
            <div className="mx-auto mt-16 max-w-xs text-center animate-fade-up">
              <p className="text-sm font-medium">No messages yet</p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Say hello — messages arrive instantly.
              </p>
            </div>
          )}

          {chat.map((c, i) => {
            const mine = c.senderId === senderId;
            const prev = chat[i - 1];
            const grouped = prev && prev.senderId === c.senderId;
            return (
              <div
                key={i}
                className={`flex animate-bubble-in ${mine ? "justify-end" : "justify-start"} ${
                  grouped ? "mt-0.5" : "mt-3"
                }`}
              >
                <div
                  className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed shadow-[0_8px_24px_-16px_oklch(0.05_0.02_245/0.9)] ${
                    mine
                      ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-2xl rounded-bl-md border border-border bg-card text-card-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{c.message}</p>
                  <span
                    className={`mt-1 block text-right text-[10px] ${
                      mine ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {timeLabel(c.time)}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start pt-1">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="size-1.5 animate-typing rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${d * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-border/70 bg-background/70 px-3 py-3 backdrop-blur-xl">
          <div className="flex items-end gap-2">
            <input
              type="text"
              placeholder="Type your message…"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="h-12 flex-1 rounded-full border border-input bg-background/60 px-5 text-[15px] transition-colors placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/60"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              aria-label="Send message"
              className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-95 disabled:opacity-40"
            >
              <Send className="size-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
