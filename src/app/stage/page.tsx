import StageComparison from "@/components/StageComparison";

const StagePage = () => {
  const data = [
    {
      stage: "unknown",
      "Group 1 Percentage": 4.5,
      "Group 1 Count": 124,
      "Group 2 Percentage": 3.6,
      "Group 2 Count": 81,
      "Group 3 Percentage": 9.6,
      "Group 3 Count": 221,
    },
    {
      stage: "ARS",
      "Group 1 Percentage": 64.7,
      "Group 1 Count": 1777,
      "Group 2 Percentage": 53.9,
      "Group 2 Count": 1222,
      "Group 3 Percentage": 55.7,
      "Group 3 Count": 1278,
    },
    {
      stage: "GKConnected",
      "Group 1 Percentage": 28.0,
      "Group 1 Count": 769,
      "Group 2 Percentage": 40.1,
      "Group 2 Count": 910,
      "Group 3 Percentage": 30.4,
      "Group 3 Count": 697,
    },
    {
      stage: "DMConnected",
      "Group 1 Percentage": 2.0,
      "Group 1 Count": 55,
      "Group 2 Percentage": 1.7,
      "Group 2 Count": 39,
      "Group 3 Percentage": 3.1,
      "Group 3 Count": 70,
    },
    {
      stage: "DealCreated",
      "Group 1 Percentage": 0.3,
      "Group 1 Count": 7,
      "Group 2 Percentage": 0.3,
      "Group 2 Count": 6,
      "Group 3 Percentage": 0.3,
      "Group 3 Count": 8,
    },
    {
      stage: "Quoted",
      "Group 1 Percentage": 0.1,
      "Group 1 Count": 2,
      "Group 2 Percentage": 0,
      "Group 2 Count": 0,
      "Group 3 Percentage": 0.3,
      "Group 3 Count": 7,
    },
    {
      stage: "Docusigned",
      "Group 1 Percentage": 0.3,
      "Group 1 Count": 7,
      "Group 2 Percentage": 0.2,
      "Group 2 Count": 5,
      "Group 3 Percentage": 0.2,
      "Group 3 Count": 5,
    },
    {
      stage: "Contracted",
      "Group 1 Percentage": 0.3,
      "Group 1 Count": 7,
      "Group 2 Percentage": 0.2,
      "Group 2 Count": 4,
      "Group 3 Percentage": 0.4,
      "Group 3 Count": 9,
    },
  ];

  const data2 = [
    {
      stage: "unknown",
      "Group 1 Percentage": 6.3,
      "Group 1 Count": 173,
      "Group 2 Percentage": 6.5,
      "Group 2 Count": 147,
      "Group 3 Percentage": 9.2,
      "Group 3 Count": 212,
    },
    {
      stage: "ARS",
      "Group 1 Percentage": 61.8,
      "Group 1 Count": 1698,
      "Group 2 Percentage": 50.6,
      "Group 2 Count": 1147,
      "Group 3 Percentage": 54.3,
      "Group 3 Count": 1247,
    },
    {
      stage: "GKConnected",
      "Group 1 Percentage": 28,
      "Group 1 Count": 770,
      "Group 2 Percentage": 38.6,
      "Group 2 Count": 876,
      "Group 3 Percentage": 31.1,
      "Group 3 Count": 713,
    },
    {
      stage: "DMConnected",
      "Group 1 Percentage": 3.2,
      "Group 1 Count": 87,
      "Group 2 Percentage": 3.3,
      "Group 2 Count": 75,
      "Group 3 Percentage": 4.4,
      "Group 3 Count": 102,
    },
    {
      stage: "Quoted",
      "Group 1 Percentage": 0.4,
      "Group 1 Count": 12,
      "Group 2 Percentage": 0.5,
      "Group 2 Count": 11,
      "Group 3 Percentage": 0.6,
      "Group 3 Count": 13,
    },
    {
      stage: "Docusigned",
      "Group 1 Percentage": 0.2,
      "Group 1 Count": 6,
      "Group 2 Percentage": 0.1,
      "Group 2 Count": 2,
      "Group 3 Percentage": 0.2,
      "Group 3 Count": 4,
    },
    {
      stage: "DocusignSent",
      "Group 1 Percentage": 0.1,
      "Group 1 Count": 2,
      "Group 2 Percentage": 0.4,
      "Group 2 Count": 8,
      "Group 3 Percentage": 0.2,
      "Group 3 Count": 4,
    },
  ];
  return (
    <div className="w-full h-full flex items-center flex-col bg-white text-black gap-20">
      <StageComparison data={data} />
      <StageComparison data={data2} />
    </div>
  );
};

export default StagePage;
