import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import { api, authHeaders } from "@/lib/api";
import { Button, Field, Eyebrow } from "@/components/ui-kit";
import { Spinner } from "@/components/site/Loading";

export const Route = createFileRoute("/add-friend/")({
  head: () => ({
    meta: [
      { title: "Add a friend — Video Calling" },
      {
        name: "description",
        content:
          "Add a friend by name, phone number and relation so you can chat and call them instantly.",
      },
      { property: "og:title", content: "Add a friend — Video Calling" },
      { property: "og:description", content: "Add a friend to chat and call them instantly." },
    ],
  }),
  component: AddFriend,
});

function AddFriend() {
  const [errors, seterrors] = useState({});
  const [formData, setFormData] = useState({ Name: "", Number: "", Relation: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationForm = () => {
    const newErrors = {};
    if (!formData.Name.trim()) newErrors.Name = "Name is required!";
    else if (!/^[A-Za-z\s]+$/.test(formData.Name)) newErrors.Name = "Only Alphabets Allowed!";

    if (!formData.Number.trim()) newErrors.Number = "Phone Number is required!";
    else if (!/^\d{10}$/.test(formData.Number))
      newErrors.Number = "Enter valid 10-digit Phone number!";

    if (!formData.Relation.trim()) newErrors.Relation = "Relation is required!";

    seterrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validationForm()) return;
    setLoading(true);
    try {
      const response = await api.post("/api/friend/AddFriend", formData, {
        headers: authHeaders(),
      });
      toast.success(response.data.message || "Friend added!");
      navigate({ to: "/chat" });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Could not add this friend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-grid">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 size-[34rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-signal)" }}
      />
      <div className="relative mx-auto max-w-md px-5 py-20 animate-fade-up">
        <div className="panel p-8">
          <Eyebrow>
            <UserPlus className="size-3.5" /> New contact
          </Eyebrow>
          <h1 className="mt-5 text-3xl font-bold">Add your friend</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            They'll show up in your chats list right away.
          </p>

          <form onSubmit={handlesubmit} noValidate className="mt-8 space-y-5">
            <Field
              label="Friend name"
              type="text"
              placeholder="Enter your friend's name"
              value={formData.Name}
              error={errors.Name}
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            />
            <Field
              label="Number"
              type="number"
              placeholder="10-digit phone number"
              value={formData.Number}
              error={errors.Number}
              onChange={(e) => setFormData({ ...formData, Number: e.target.value })}
            />
            <Field
              label="Relation"
              type="text"
              placeholder="Friend, brother, colleague…"
              value={formData.Relation}
              error={errors.Relation}
              onChange={(e) => setFormData({ ...formData, Relation: e.target.value })}
            />
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Spinner /> Saving…
                </>
              ) : (
                "Add friend"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
