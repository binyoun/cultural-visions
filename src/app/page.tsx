import { loadAllArtworks } from "@/lib/dataLoader";
import GatewayPage from "@/components/gateway/GatewayPage";

export default function HomePage() {
  const artworks = loadAllArtworks();
  return <GatewayPage artworks={artworks} />;
}
