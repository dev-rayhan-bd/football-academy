import TeamDetails from "@/components/user-wise-dashboard/academy-analysis/team-details";

interface PageProps {
  params: Promise<{ teamId: string }>;
}

export default async function TeamDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <TeamDetails teamId={resolvedParams.teamId} />;
}
