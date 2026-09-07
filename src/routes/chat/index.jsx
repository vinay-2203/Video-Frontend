import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { MessageSquare, RefreshCw, Search, UserPlus } from "lucide-react";
import { api, authHeaders } from "@/lib/api";
import { Button, Eyebrow } from "@/components/ui-kit";
import { ListSkeleton } from "@/components/site/Loading";

export const Route = createFileRoute("/chat/")({
  head: () => ({
    meta: [
      { title: "Chats — Video Calling" },
      {
        name: "description",
        content:
          "Your friends list. Start a real-time chat or jump straight into a video call with anyone you've added.",
      },
      { property: "og:title", content: "Chats — Video Calling" },
      { property: "og:description", content: "Start a real-time chat with your friends." },
    ],
  }),
  component: Chats,
});

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function Chats() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const showList = useCallback(async (silent) => {
    if (!silent) setLoading(true);
    try {
      const response = await api.get("/api/friend/friends-list", { headers: authHeaders() });
      setFriends(response.data.friends || []);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Could not load your friends list.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    showList();
  }, [showList]);

  const visible = friends.filter((f) =>
    `${f.Name ?? ""} ${f.Number ?? ""} ${f.relation ?? ""}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  const openChat = (friend) => {
    const id = friend.friendId ?? friend.friend_Id;
    localStorage.setItem("friendId", id);
    navigate({ to: "/chat/$friendId", params: { friendId: String(id) } });
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>
            <MessageSquare className="size-3.5" /> Conversations
          </Eyebrow>
          <h1 className="mt-5 text-3xl font-bold sm:text-4xl">Start chatting with friends</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick someone from your list to open a real-time conversation.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => showList(true)}>
            <RefreshCw className="size-4" /> Refresh
          </Button>
          <Button as={Link} to="/add-friend" size="sm">
            <UserPlus className="size-4" /> Add friend
          </Button>
        </div>
      </div>

      <div className="relative mt-8">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search friends…"
          className="h-12 w-full rounded-full border border-input bg-background/60 pl-11 pr-4 text-[15px] transition-colors placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/60"
        />
      </div>

      <div className="mt-6">
        {loading ? (
          <ListSkeleton rows={4} />
        ) : visible.length === 0 ? (
          <div className="panel p-12 text-center animate-fade-up">
            <p className="text-base font-medium">No friends here yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add someone with their name and number to start a conversation.
            </p>
            <Button as={Link} to="/add-friend" className="mt-6">
              <UserPlus className="size-4" /> Add your first friend
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {visible.map((friend, i) => (
              <li
                key={friend.friendId ?? friend.friend_Id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
              >
                <button
                  type="button"
                  onClick={() => openChat(friend)}
                  className="panel flex w-full items-center gap-4 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/12 font-display text-sm font-semibold text-primary ring-1 ring-primary/25">
                    {initials(friend.Name) || "?"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-base font-semibold">
                      {friend.Name}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {friend.Number}
                      {friend.relation ? ` · ${friend.relation}` : ""}
                    </span>
                  </span>
                  <span className="hidden rounded-full bg-secondary px-4 py-2 text-xs font-medium transition-colors group-hover:bg-primary sm:inline-flex">
                    Chat
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
