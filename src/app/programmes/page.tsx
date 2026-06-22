import type { Metadata } from "next";
import ProgrammesClient from "@/components/ProgrammesClient";

export const metadata: Metadata = {
  title: "Our Programmes",
  description:
    "Explore Vishwashanthi Shrushti Seva Trust's programmes — Children's Home, Education Support, Women's Development, HIV/AIDS Awareness, Environment, and Care for the Aged.",
};

export default function ProgrammesPage() {
  return <ProgrammesClient />;
}
