import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { api } from "@/lib/api";
import { Button, Field, Eyebrow } from "@/components/ui-kit";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Video Calling" },
      { name: "description", content: "Log in to your Video Calling account to host meetings and chat with friends." },
      { property: "og:title", content: "Log in — Video Calling" },
      { property: "og:description", content: "Log in to host meetings and chat in real time." },
    ],
  }),
  component: Login,
});

function Login() {
  const [errors, seterrors] = useState({});
  const [formdata, setformdata] = useState({ Email: "", Password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationForm = () => {
    const newErrors = {};
    if (!formdata.Email) newErrors.Email = "Email is required!";
    else if (!/^\S+@\S+\.\S+$/.test(formdata.Email)) newErrors.Email = "Enter a valid Email!";

    if (!formdata.Password.trim()) newErrors.Password = "Password is required!";
    else if (formdata.Password.length < 6) newErrors.Password = "Password is Wrong!";

    seterrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validationForm()) return;
    setLoading(true);
    try {
      const response = await api.post("/User/login", formdata);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message || "Logged in!");
      navigate({ to: "/" });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed. Please try again.");
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
      <div className="relative mx-auto flex max-w-md flex-col justify-center px-5 py-20">
        <div className="panel p-8">
          <Eyebrow>
            <LogIn className="size-3.5" /> Welcome back
          </Eyebrow>
          <h1 className="mt-5 text-3xl font-bold">Log in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick up your meetings and conversations where you left off.
          </p>

          <form onSubmit={handlesubmit} noValidate className="mt-8 space-y-5">
            <Field
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.Email}
              onChange={(e) => setformdata({ ...formdata, Email: e.target.value })}
            />
            <Field
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.Password}
              onChange={(e) => setformdata({ ...formdata, Password: e.target.value })}
            />
            <div className="text-right">
              <a href="/forgetpassword" className="text-xs text-muted-foreground hover:text-primary">
                Forgot password?
              </a>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Logging in…" : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
