/**
 * Products shown in the Products section. To add a product: append an object below.
 * Set `status: "coming-soon"` to show it as a placeholder card (no CTA, not offered in the form).
 */

export type TranscriptLine = {
  speaker: "agent" | "caller";
  /** Start time in seconds. */
  at: number;
  text: string;
};

export type ProductDemo = {
  label: string;
  /** TODO: replace /public/demo-call.mp3 (currently 48 seconds of silence) with a real recording. */
  audioSrc: string;
  title: string;
  description: string;
  agentName: string;
  transcript: TranscriptLine[];
};

export type Product = {
  /** Stable id, used for the lead form interest. Never rename once live. */
  id: string;
  name: string;
  pitch: string;
  benefits: string[];
  status: "available" | "coming-soon";
  tag: string;
  image?: { src: string; alt: string };
  demo?: ProductDemo;
  cta?: { label: string };
};

export const products = [
  {
    id: "ai-receptionist",
    name: "AI Receptionist",
    pitch: "Answers every call, day or night, so you stop losing bookings to voicemail.",
    benefits: [
      "Answers calls 24/7, including evenings and weekends",
      "Books and reschedules appointments in your calendar",
      "Handles common questions and sends SMS reminders",
      "Hands the call to a person whenever it should",
    ],
    status: "available",
    tag: "Available now",
    image: { src: "/images/product-receptionist.jpg", alt: "A receptionist helping a customer at a front desk with a tablet" },
    demo: {
      label: "Hear a demo call",
      audioSrc: "/demo-call.mp3",
      title: "Demo call: AI Receptionist",
      description: "A sample booking call for a fictional clinic, Lumen Aesthetics. Press play and follow the transcript.",
      agentName: "Ava",
      // TODO: once the real recording is in place, update these lines and timestamps to match it.
      transcript: [
        { speaker: "agent", at: 0, text: "Good evening, Lumen Aesthetics, this is Ava. How can I help?" },
        { speaker: "caller", at: 4, text: "Hi, I'd like to book a consultation. Have you got anything this week?" },
        { speaker: "agent", at: 10, text: "Of course. I have Thursday at 10:15 or Saturday at 11:30. Which would suit you better?" },
        { speaker: "caller", at: 17, text: "Saturday, please. Roughly how much is it?" },
        { speaker: "agent", at: 21, text: "The consultation is free, and you'll get an exact price for your treatment plan on the day." },
        { speaker: "caller", at: 29, text: "Perfect, book me in." },
        { speaker: "agent", at: 31, text: "Done. You're booked for Saturday at 11:30. I'll text you a confirmation now and a reminder the day before." },
        { speaker: "caller", at: 40, text: "That's everything. Thank you!" },
        { speaker: "agent", at: 43, text: "You're welcome. See you on Saturday." },
      ],
    },
    cta: { label: "Ask about this" },
  },
  // TODO: the two "coming soon" cards below are layout placeholders. Rename, fill in or delete them.
  {
    id: "coming-soon-1",
    name: "Client Follow-up Assistant",
    pitch: "Placeholder: replace or remove when the next product is ready.",
    benefits: [],
    status: "coming-soon",
    tag: "Coming soon",
  },
  {
    id: "coming-soon-2",
    name: "Owner's Weekly Numbers",
    pitch: "Placeholder: replace or remove when the next product is ready.",
    benefits: [],
    status: "coming-soon",
    tag: "Coming soon",
  },
] satisfies Product[];

export const availableProducts = products.filter((p) => p.status === "available");
