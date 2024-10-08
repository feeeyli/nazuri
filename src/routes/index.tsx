import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation("home");

  return (
    <div className="p-2">
      <h1>{t("welcome")}</h1>
      <Button onClick={() => changeLanguage("pt")}>PT</Button>
      <Button onClick={() => changeLanguage("en")}>EN</Button>
    </div>
  );
}
