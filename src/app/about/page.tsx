import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vishwashanthi Shrushti Seva Trust — a registered charitable trust in Telangana, India, providing residential care, education, and development programmes since 2001.",
};

export default function AboutPage() {
  return <AboutClient />;
}
