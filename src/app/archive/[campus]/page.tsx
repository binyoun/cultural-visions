import CampusArchive from "@/components/archive/CampusArchive";

interface Props {
  params: Promise<{ campus: string }>;
}

export async function generateStaticParams() {
  return [{ campus: "hanoi" }, { campus: "saigon" }];
}

export default async function CampusArchivePage({ params }: Props) {
  const { campus } = await params;
  return <CampusArchive campus={campus} />;
}
