import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vishwashanthi Shrushti Seva Trust. For donations, admissions, and partnership inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}
