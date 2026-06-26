import type { Metadata } from "next";
import NewsClient from "@/components/NewsClient";

export const metadata: Metadata = {
  title: "News & Media Coverage",
  description:
    "Read the news articles, press announcements, and media clippings highlighting Vishwashanthi Shrushti Seva Trust's activities and community impact.",
};

export default function NewsPage() {
  return <NewsClient />;
}
