"use client";
import { HeroUIProvider } from "@heroui/react";
import Ui from "../components/Ui";

export default function Home() {
  return (
    <HeroUIProvider>
      <Ui />
    </HeroUIProvider>
  );
}