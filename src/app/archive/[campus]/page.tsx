import CampusArchive from "@/components/archive/CampusArchive";
import { getAllArtworks, getUniqueTags } from "@/lib/getArtworks";

interface Props {
  params: Promise<{ campus: string }>;
}

export async function generateStaticParams() {
  return [{ campus: "hanoi" }, { campus: "saigon" }];
}

export default async function CampusArchivePage({ params }: Props) {
  const { campus } = await params;
  const campusLabel = (campus.charAt(0).toUpperCase() + campus.slice(1)) as
    | "Hanoi"
    | "Saigon";
  const allArtworks = getAllArtworks();
  const campusArtworks = allArtworks.filter((aw) => aw.campus === campusLabel);
  const availableTags = getUniqueTags(campusArtworks);
  return (
    <CampusArchive
      campus={campus}
      initialArtworks={campusArtworks}
      availableTags={availableTags}
    />
  );
}
