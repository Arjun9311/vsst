import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View our gallery showing moments of joy, education support, healthcare, nutrition, and community development at Vishwashanthi Shrushti Seva Trust in Telangana, India.",
};

export default function GalleryPage() {
  return <Gallery />;
}
