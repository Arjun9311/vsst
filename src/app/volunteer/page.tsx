import type { Metadata } from "next";
import VolunteerClient from "@/components/VolunteerClient";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Join Vishwashanthi Shrushti Seva Trust as a volunteer. Share your time, mentorship, and skills with children and communities in Telangana, India.",
};

export default function VolunteerPage() {
  return <VolunteerClient />;
}
