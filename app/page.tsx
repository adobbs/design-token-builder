import { LeftNav } from "@/components/LeftNav";
import { PanelContainer } from "@/components/PanelContainer";
import { CardGrid } from "@/components/preview/CardGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <LeftNav />
      <PanelContainer />
      <main className="ml-16 transition-all">
        <CardGrid />
      </main>
    </div>
  );
}
