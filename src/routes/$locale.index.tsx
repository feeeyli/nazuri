import { createFileRoute, redirect } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/$locale/")({
  component: Home,
  beforeLoad({ params }) {
    if (!["pt", "en"].includes(params.locale)) {
      throw redirect({
        to: "/$locale",
        params: { locale: "pt" },
        replace: true,
      });
    }
  },
});

function Home() {
  const { locale } = Route.useParams();
  const { t } = useTranslation("home");

  return (
    <div className="p-2">
      <h1>{t("welcome")}</h1>
      <span>Lang: {locale}</span>
    </div>
  );
}
