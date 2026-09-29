import { useState } from "react";
import {
MapPin,
Mail,
Phone,
Clock,
Send,
MessageCircle,
} from "lucide-react";

const initialForm = {
name: "",
email: "",
subject: "",
message: "",
};

export default function Contact() {
const [form, setForm] = useState(initialForm);
const [success, setSuccess] = useState(false);

function handleChange(event) {
setForm({ ...form, [event.target.name]: event.target.value });
setSuccess(false);
}

function handleSubmit(event) {
  event.preventDefault();

  setSuccess(true);
  setForm(initialForm);
}

const contactDetails = [
{
icon: Phone,
title: "Call Us",
value: "Add your business phone number",
href: null,
},
{
icon: Mail,
title: "Email Us",
value: "Add your business email address",
href: null,
},
{
icon: MapPin,
title: "Visit Us",
value: "Add your business location",
href: null,
},
{
icon: Clock,
title: "Business Hours",
value: "Add your business hours",
href: null,
},
];

return ( <main className="min-h-screen bg-[#FBFCF7] text-[#183D2B]">
{/* Hero */} <section className="bg-[#EDF4E6] px-5 py-14 text-center sm:px-8 sm:py-20"> <div className="mx-auto max-w-3xl"> <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#397447] shadow-sm"> <MessageCircle size={16} />
We're here to help </span>


      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
        Let's talk about
        <span className="block text-[#57965B]">good food.</span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl leading-8 text-gray-600">
        Have a question, suggestion, or need help with an order?
        Send us a message. We'd love to hear from you.
      </p>
    </div>
  </section>

  {/* Contact section */}
  <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.85fr_1.15fr]">
    {/* Contact information */}
    <div>
      <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#57965B]">
        Contact Information
      </span>

      <h2 className="mt-3 text-3xl font-bold">
        We'd love to hear from you
      </h2>

      <p className="mt-4 leading-7 text-gray-600">
        Reach out to us with your questions or feedback. We will use
        your message to help us understand how we can serve you better.
      </p>

      <div className="mt-8 space-y-4">
        {contactDetails.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-[#E5EBDD] bg-white p-4 transition hover:shadow-md sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E7F1DF] text-[#397447]">
                <Icon size={22} />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 break-words text-sm leading-6 text-gray-500">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-[#285D3D] p-6 text-white">
        <h3 className="text-lg font-bold">
          Your feedback matters 🌿
        </h3>
        <p className="mt-2 text-sm leading-7 text-white/80">
          Your suggestions help us improve your food discovery and
          ordering experience.
        </p>
      </div>
    </div>

    {/* Contact form */}
    <div className="rounded-3xl border border-[#E7EBDD] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
      <h2 className="text-2xl font-bold">Send us a message</h2>
      <p className="mt-2 text-sm leading-6 text-gray-500">
        Fill in the details below.
      </p>

      {success && (
        <div
          role="status"
          className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
        >
          Thank you! Your form passed frontend validation. The message
          has not been sent yet because the backend is not connected.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-sm font-semibold"
            >
              Your Name
            </label>
            <input
              id="contact-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-gray-200 bg-[#FCFDF9] px-4 py-3 outline-none transition focus:border-[#57965B] focus:ring-4 focus:ring-[#57965B]/10"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-sm font-semibold"
            >
              Email Address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-200 bg-[#FCFDF9] px-4 py-3 outline-none transition focus:border-[#57965B] focus:ring-4 focus:ring-[#57965B]/10"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="mb-2 block text-sm font-semibold"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="What can we help you with?"
            required
            className="w-full rounded-xl border border-gray-200 bg-[#FCFDF9] px-4 py-3 outline-none transition focus:border-[#57965B] focus:ring-4 focus:ring-[#57965B]/10"
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-sm font-semibold"
          >
            Your Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows={5}
            required
            className="w-full resize-y rounded-xl border border-gray-200 bg-[#FCFDF9] px-4 py-3 outline-none transition focus:border-[#57965B] focus:ring-4 focus:ring-[#57965B]/10"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#285D3D] px-6 py-4 font-semibold text-white transition hover:bg-[#1D472E] focus:outline-none focus:ring-4 focus:ring-[#57965B]/30"
        >
          Send Message
          <Send size={18} />
        </button>

        <p className="text-center text-xs leading-5 text-gray-400">
          Your message will be sent once this form is connected to
          the website's backend.
        </p>
      </form>
    </div>
  </section>
</main>


);
}
