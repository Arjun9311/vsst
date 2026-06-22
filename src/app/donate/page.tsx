import type { Metadata } from "next";
import DonateClient from "@/components/DonateClient";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Make a tax-deductible donation to Vishwashanthi Shrushti Seva Trust. Support children's shelter, education, food, and complete residential care. 80G certified.",
};

export default function DonatePage() {
  return <DonateClient />;
}
