import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import { api } from "@/lib/api";
import { Button, Field, Eyebrow } from "@/components/ui-kit";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Video Calling" },
      {
        name: "description",
        content: "Sign up for Video Calling to host secure HD meetings and chat with your friends in real time.",
      },
      { property: "og:title", content: "Create your account — Video Calling" },
      { property: "og:description", content: "Sign up to host secure HD meetings and real-time chat." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const [errors, seterrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    Name: "",
    Age: "",
    Email: "",
    Password: "",
    Number: "",
    Country: "",
    City: "",
    PinCode: "",
  });

  const set = (key) => (e) => setformData({ ...formData, [key]: e.target.value });

  const validationForm = () => {
    const newErrors = {};

    if (!formData.Name.trim()) newErrors.Name = "Name is required!";
    else if (!/^[A-Za-z\s]+$/.test(formData.Name)) newErrors.Name = "Only Alphabets Allowed!";

    if (!formData.Age) newErrors.Age = "Age is Required!";
    else if (formData.Age < 16 || formData.Age > 100)
      newErrors.Age = "Age must be between 16 and 100!";

    if (!formData.Email) newErrors.Email = "Email is required!";
    else if (!/^\S+@\S+\.\S+$/.test(formData.Email)) newErrors.Email = "Enter a valid Email!";

    if (!formData.Password.trim()) newErrors.Password = "Password is required!";
    else if (formData.Password.length < 6)
      newErrors.Password = "Password must be at least 6 characters!";

    if (!formData.Number.trim()) newErrors.Number = "Phone Number is required!";
    else if (!/^\d{10}$/.test(formData.Number))
      newErrors.Number = "Enter valid 10-digit Phone number!";

    if (!formData.Country.trim()) newErrors.Country = "Country is required!";
    if (!formData.City.trim()) newErrors.City = "City is required!";

    if (!formData.PinCode.trim()) newErrors.PinCode = "Pincode is required!";
    else if (!/^\d{6}$/.test(formData.PinCode)) newErrors.PinCode = "Enter valid 6-digit PinCode!";

    seterrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validationForm()) return;
    setLoading(true);
    try {
      const response = await api.post("/User", formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Signup successful!");
      window.location.href = "/";
    } catch (error) {
      toast.error(error?.response?.data?.error || "Signup failed. Please try again");
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-grid">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-signal)" }}
      />
      <div className="relative mx-auto max-w-3xl px-5 py-20">
        <div className="panel p-8 sm:p-10">
          <Eyebrow>
            <UserPlus className="size-3.5" /> Get started
          </Eyebrow>
          <h1 className="mt-5 text-3xl font-bold sm:text-4xl">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            It takes a minute — then you're one click away from your first room.
          </p>

          <form onSubmit={handlesubmit} noValidate className="mt-9 grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              className="sm:col-span-2"
              value={formData.Name}
              placeholder="Your name"
              error={errors.Name}
              onChange={set("Name")}
            />
            <Field label="Age" type="number" min={16} max={100} placeholder="18" error={errors.Age} onChange={set("Age")} />
            <Field label="Phone no" type="number" placeholder="10-digit number" error={errors.Number} onChange={set("Number")} />
            <Field label="Email" type="email" placeholder="you@example.com" error={errors.Email} onChange={set("Email")} />
            <Field label="Password" type="password" placeholder="At least 6 characters" error={errors.Password} onChange={set("Password")} />
            <Field label="Country" placeholder="Country" error={errors.Country} onChange={set("Country")} />
            <Field label="City" placeholder="City" error={errors.City} onChange={set("City")} />
            <Field label="Pincode" type="number" placeholder="6-digit pincode" error={errors.PinCode} onChange={set("PinCode")} />

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Creating account…" : "Sign up"}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
