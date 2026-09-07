import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { Copy, Link2, Mail, MessageCircle, Sparkles, Video } from "lucide-react";
import { Button, Eyebrow, Field } from "@/components/ui-kit";
import { getToken } from "@/lib/api";

export const Route = createFileRoute("/meeting/")({
  head: () => ({
    meta: [
      { title: "New meeting — Video Calling" },
      { name: "description", content: "Create a meeting room in one click, or join an existing room with its meeting ID." },
      { property: "og:title", content: "New meeting — Video Calling" },
      { property: "og:description", content: "Create a room in one click or join with a meeting ID." },
    ],
  }),
  component: Meeting,
});

function Meeting() {
  const [joinId, setjoinId] = useState("");
  const [newMeetingId, setnewMeetingId] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = typeof window !== "undefined" && !!getToken();

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const handleCreate = () => setnewMeetingId(nanoid(10));

  const handleJOin = () => {
    if (joinId.trim() !== "") navigate({ to: "/meeting/$roomId", params: { roomId: joinId.trim() } });
    else toast.error("Please enter a valid Meeting ID");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(newMeetingId);
    toast.success("Meeting ID copied");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${origin}/meeting/${newMeetingId}`);
    toast.success("Meeting link copied to clipboard");
  };

  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex max-w-md flex-col px-5 py-24">
        <div className="panel p-8 text-center">
          <h1 className="text-2xl font-bold">Please log in to join a meeting</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your rooms are tied to your account so only your people get in.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Button variant="success" onClick={() => navigate({ to: "/login" })}>
              Log in
            </Button>
            <Button variant="ghost" onClick={() => navigate({ to: "/signup" })}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-grid">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-signal)" }}
      />
      <div className="relative mx-auto max-w-2xl px-5 py-20">
        <div className="panel p-8 sm:p-10">
          <Eyebrow>
            <Sparkles className="size-3.5" /> Rooms
          </Eyebrow>
          <h1 className="mt-5 text-3xl font-bold sm:text-4xl">Video meeting</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a fresh room, or drop in an ID to join one.
          </p>

          <Button size="lg" variant="success" className="mt-8 w-full" onClick={handleCreate}>
            <Video className="size-4" /> Create new meeting
          </Button>

          <div className="my-8 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>

          <Field
            label="Meeting ID"
            placeholder="Enter new ID or existing ID"
            value={joinId}
            onChange={(e) => setjoinId(e.target.value)}
          />
          <Button size="lg" className="mt-4 w-full" onClick={handleJOin}>
            Join meeting
          </Button>

          {newMeetingId && (
            <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <h2 className="font-display text-lg font-semibold text-primary">Meeting created</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                ID: <span className="font-mono text-foreground">{newMeetingId}</span>
              </p>
              <p className="mt-1 break-all text-sm text-muted-foreground">
                Link:{" "}
                <a
                  href={`/meeting/${newMeetingId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  {origin}/meeting/{newMeetingId}
                </a>
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={handleCopy}>
                  <Copy className="size-3.5" /> Copy ID
                </Button>
                <Button size="sm" variant="outline" onClick={handleShare}>
                  <Link2 className="size-3.5" /> Copy link
                </Button>
                <Button
                  as="a"
                  size="sm"
                  variant="success"
                  href={`https://wa.me/?text=Join%20my%20meeting:%20${origin}/meeting/${newMeetingId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="size-3.5" /> WhatsApp
                </Button>
                <Button
                  as="a"
                  size="sm"
                  variant="accent"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&su=Join%20My%20Meeting&body=Join%20here:%20${origin}/meeting/${newMeetingId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Mail className="size-3.5" /> Gmail
                </Button>
                <Button
                  as="a"
                  size="sm"
                  variant="ghost"
                  href={`https://t.me/share/url?url=${origin}/meeting/${newMeetingId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
