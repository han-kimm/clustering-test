import { Pattern } from "@/components/Pattern";
import PatternComparison from "@/components/PatternComparison";
import Image from "next/image";
import Link from "next/link";

function PatternPage() {
  const patterns = [
    {
      name: "Request to Speak with Manager Pattern",
      conversation: [
        ["Caller", "May I speak with the owner/manager/person in charge?"],
      ],
    },
    {
      name: "Manager Available Pattern - Direct",
      conversation: [
        ["Caller", "May I speak with the owner/manager/person in charge?"],
        ["Business", "This is them/Speaking/That's me."],
      ],
    },
    {
      name: "Manager Available Pattern - Transfer",
      conversation: [
        ["Caller", "May I speak with the owner/manager/person in charge?"],
        ["Business", "One moment."],
        ["Business", "Yes, Ma'am."],
      ],
    },
    {
      name: "Manager Unavailable Pattern - In Meeting",
      conversation: [
        ["Caller", "May I speak with the owner/manager/person in charge?"],
        ["Business", "[manager] in meeting."],
      ],
    },
    {
      name: "Manager Unavailable Pattern - Not Available",
      conversation: [
        ["Caller", "May I speak with the owner/manager/person in charge?"],
        ["Business", "[manager] not available."],
      ],
    },
    {
      name: "Manager Unavailable Pattern - Not Here",
      conversation: [
        ["Caller", "May I speak with the owner/manager/person in charge?"],
        ["Business", "[manager] not here."],
      ],
    },
    {
      name: "Current Service Inquiry Pattern",
      conversation: [
        ["Caller", "Do you have an active dumpster service?"],
        ["Business", "Yes, we do."],
        ["Caller", "Who's your current provider?"],
        ["Business", "[provider name]."],
      ],
    },
    {
      name: "Follow-up Pattern - Not Reviewed",
      conversation: [
        ["Caller", "I'm following up on the quote/email I sent."],
        ["Business", "I haven't had a chance to review it."],
        ["Caller", "When would be a good time to call back?"],
      ],
    },
    {
      name: "Follow-up Pattern - Confusion",
      conversation: [
        ["Caller", "I'm following up on the quote/email I sent."],
        ["Business", "Oh, I see. I have something confusing."],
        ["Caller", "Okay, Could you tell me?"],
      ],
    },
    {
      name: "Schedule Follow-up Pattern",
      conversation: [
        ["Caller", "When would be the best time to reach back?"],
        ["Business", "umm... I guess.. this Friday 5:00 pm?"],
        ["Caller", "I'll call you back then."],
      ],
    },
    {
      name: "Competitive Price Pattern - Invoice Required",
      conversation: [
        [
          "Caller",
          "We're offering 20% off whatever amount you're paying for your current service.",
        ],
        ["Business", "How much would that be?"],
        [
          "Caller",
          "We'll need to see your current invoice to give you an exact quote.",
        ],
      ],
    },
    {
      name: "Competitive Price Pattern - Size Based",
      conversation: [
        [
          "Caller",
          "We're offering 20% off whatever amount you're paying for your current service.",
        ],
        ["Business", "How much would that be?"],
        [
          "Caller",
          "We can give you a rough estimate. What's the size of your dumpster?",
        ],
      ],
    },
    {
      name: "Service Switch Pattern",
      conversation: [
        [
          "Caller",
          "We'll cover all termination fees with your current provider.",
        ],
        ["Business", "We're under contract right now."],
        [
          "Caller",
          "That's great - we'll handle the buyout and termination costs.",
        ],
      ],
    },
    {
      name: "Service Size Verification Pattern",
      conversation: [
        ["Caller", "What size dumpster do you currently have?"],
        ["Business", "I'm not sure exactly."],
        [
          "Caller",
          "Could you check your invoice? Is it a 2-yard, 4-yard, or 6-yard?",
        ],
      ],
    },
    {
      name: "Service Frequency Verification Pattern",
      conversation: [
        ["Caller", "How often do you have your dumpster serviced?"],
        ["Business", "Once a week."],
      ],
    },
    {
      name: "Email Request Pattern",
      conversation: [
        ["Caller", "Can I get your email?"],
        ["Business", "Sure, it's [spells out email address]"],
        ["Caller", "Let me confirm that - is it [repeats email]?"],
      ],
    },
    {
      name: "Not Interested Response Pattern",
      conversation: [
        ["Business", "We're not interested."],
        ["Caller", "Can I send you information for future reference?"],
        ["Business", "No thank you, please take us off your list."],
      ],
    },
    {
      name: "Quote Request Pattern - Willing",
      conversation: [
        [
          "Caller",
          "Can you share your recent invoice so I can get you an accurate quote?",
        ],
        ["Business", "Sure, what's your email?"],
      ],
    },
    {
      name: "Quote Request Pattern - No Access",
      conversation: [
        [
          "Caller",
          "Can you share your recent invoice so I can get you an accurate quote?",
        ],
        ["Business", "I don't have access to that right now."],
      ],
    },
    {
      name: "Quote Request Pattern - Need Approval",
      conversation: [
        [
          "Caller",
          "Can you share your recent invoice so I can get you an accurate quote?",
        ],
        ["Business", "I'll need to check with accounting."],
      ],
    },
    {
      name: "Current Rate Inquiry Pattern",
      conversation: [
        [
          "Caller",
          "How much are you currently paying, if you don't mind me asking?",
        ],
        ["Business", "Around $200 to $300 per month."],
        ["Caller", "With that rate, we could save you [calculated amount]."],
      ],
    },
    {
      name: "Invoice Request Pattern",
      conversation: [
        ["Caller", "Could you send me a copy of your latest invoice?"],
        ["Business", "Why do you need that?"],
        ["Caller", "So we can calculate exact savings and termination fees."],
      ],
    },
    {
      name: "Sales Referral Pattern - Happy Customer",
      conversation: [
        [
          "Caller",
          "We're offering 20% off your current bill and we can buy out your contract.",
        ],
        ["Business", "We're happy with our current service."],
      ],
    },
    {
      name: "Sales Referral Pattern - Not Interested",
      conversation: [
        [
          "Caller",
          "We're offering 20% off your current bill and we can buy out your contract.",
        ],
        ["Business", "We're not interested."],
      ],
    },
    {
      name: "Corporate Referral Pattern",
      conversation: [
        [
          "Business",
          "We're corporate - you'll need to contact the main office.",
        ],
        ["Caller", "Could I get that number?"],
        ["Business", "[Provides corporate number]."],
      ],
    },
    {
      name: "City/National Referral Pattern",
      conversation: [
        ["Business", "It's a national program, so we can't get out of it."],
        ["Caller", "Okay, Thank you for taking my call."],
      ],
    },
    {
      name: "Language Barrier Pattern",
      conversation: [
        ["Business", "No English, sorry"],
        ["Caller", "Does anyone there speak English?"],
        ["Business", "No, call tomorrow"],
      ],
    },
  ];

  const overallData2 = [
    {
      stage: "Request to Speak with Manager Pattern",
      "Group 1 Count": 722,
      "Group 2 Count": 834,
      "Group 3 Count": 501,
      "Group 1 Percentage": ((722 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((834 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((501 / 836) * 100).toFixed(1),
    },
    {
      stage: "Manager Unavailable Pattern",
      "Group 1 Count": 377,
      "Group 2 Count": 436,
      "Group 3 Count": 378,
      "Group 1 Percentage": ((377 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((436 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((378 / 836) * 100).toFixed(1),
    },
    {
      stage: "Current Service inquiry Pattern",
      "Group 1 Count": 152,
      "Group 2 Count": 138,
      "Group 3 Count": 93,
      "Group 1 Percentage": ((152 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((138 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((93 / 836) * 100).toFixed(1),
    },
    {
      stage: "Current Rate Inquiry Pattern",
      "Group 1 Count": 24,
      "Group 2 Count": 16,
      "Group 3 Count": 67,
      "Group 1 Percentage": ((24 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((16 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((67 / 836) * 100).toFixed(1),
    },
    {
      stage: "Competitive Price Pattern",
      "Group 1 Count": 81,
      "Group 2 Count": 86,
      "Group 3 Count": 118,
      "Group 1 Percentage": ((81 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((86 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((118 / 836) * 100).toFixed(1),
    },
    {
      stage: "Service Switch Pattern",
      "Group 1 Count": 48,
      "Group 2 Count": 58,
      "Group 3 Count": 65,
      "Group 1 Percentage": ((48 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((58 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((65 / 836) * 100).toFixed(1),
    },
    {
      stage: "Service Frequency Verification Pattern",
      "Group 1 Count": 27,
      "Group 2 Count": 18,
      "Group 3 Count": 37,
      "Group 1 Percentage": ((27 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((18 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((37 / 836) * 100).toFixed(1),
    },
    {
      stage: "Service Size Verification Pattern",
      "Group 1 Count": 47,
      "Group 2 Count": 31,
      "Group 3 Count": 66,
      "Group 1 Percentage": ((47 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((31 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((66 / 836) * 100).toFixed(1),
    },
    {
      stage: "Invoice Request Pattern",
      "Group 1 Count": 11,
      "Group 2 Count": 15,
      "Group 3 Count": 47,
      "Group 1 Percentage": ((11 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((15 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((47 / 836) * 100).toFixed(1),
    },
    {
      stage: "Quote Request Pattern",
      "Group 1 Count": 28,
      "Group 2 Count": 22,
      "Group 3 Count": 50,
      "Group 1 Percentage": ((28 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((22 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((50 / 836) * 100).toFixed(1),
    },
    {
      stage: "Follow-up Pattern(After Quote)",
      "Group 1 Count": 43,
      "Group 2 Count": 39,
      "Group 3 Count": 47,
      "Group 1 Percentage": ((43 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((39 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((47 / 836) * 100).toFixed(1),
    },
    {
      stage: "Not Interested Response Pattern",
      "Group 1 Count": 179,
      "Group 2 Count": 178,
      "Group 3 Count": 108,
      "Group 1 Percentage": ((179 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((178 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((108 / 836) * 100).toFixed(1),
    },
    {
      stage: "Sales Referral Pattern",
      "Group 1 Count": 24,
      "Group 2 Count": 37,
      "Group 3 Count": 38,
      "Group 1 Percentage": ((24 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((37 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((38 / 836) * 100).toFixed(1),
    },
    {
      stage: "Corporate Referral Pattern",
      "Group 1 Count": 63,
      "Group 2 Count": 53,
      "Group 3 Count": 25,
      "Group 1 Percentage": ((63 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((53 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((25 / 836) * 100).toFixed(1),
    },
    {
      stage: "City/National Referral Pattern",
      "Group 1 Count": 21,
      "Group 2 Count": 20,
      "Group 3 Count": 12,
      "Group 1 Percentage": ((21 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((20 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((12 / 836) * 100).toFixed(1),
    },
    {
      stage: "Schedule Follow-up Pattern",
      "Group 1 Count": 203,
      "Group 2 Count": 212,
      "Group 3 Count": 227,
      "Group 1 Percentage": ((203 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((212 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((227 / 836) * 100).toFixed(1),
    },
    {
      stage: "Email Request Pattern",
      "Group 1 Count": 145,
      "Group 2 Count": 126,
      "Group 3 Count": 155,
      "Group 1 Percentage": ((145 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((126 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((155 / 836) * 100).toFixed(1),
    },
    {
      stage: "Callback number Request Pattern",
      "Group 1 Count": 58,
      "Group 2 Count": 65,
      "Group 3 Count": 71,
      "Group 1 Percentage": ((58 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((65 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((71 / 836) * 100).toFixed(1),
    },
    {
      stage: "Language Barrier Pattern",
      "Group 1 Count": 10,
      "Group 2 Count": 8,
      "Group 3 Count": 23,
      "Group 1 Percentage": ((10 / 877) * 100).toFixed(1),
      "Group 2 Percentage": ((8 / 973) * 100).toFixed(1),
      "Group 3 Percentage": ((23 / 836) * 100).toFixed(1),
    },
  ];

  const managerData = [
    ...overallData2.filter((item) => item.stage.includes("Manager")),
    ...overallData2.filter((item) => item.stage.includes("Schedule")),
  ];

  const serviceData = overallData2.filter(
    (item) =>
      item.stage.includes("Service") ||
      item.stage.includes("Current") ||
      item.stage.includes("Price") ||
      item.stage.includes("Switch") ||
      item.stage.includes("Invoice") ||
      item.stage.includes("Quote")
  );

  const referralData = overallData2.filter(
    (item) => item.stage.includes("Referral") || item.stage.includes("Response")
  );

  const contactData = overallData2.filter(
    (item) =>
      item.stage.includes("Email") ||
      item.stage.includes("Callback") ||
      item.stage.includes("Schedule")
  );

  return (
    <div className="w-dvw h-full flex items-center flex-col text-black bg-white p-4">
      <h1 className="text-[28px]">
        <strong>Found Patterns</strong>
      </h1>
      <span>분석모델: Claude 3.5 Sonnet</span>
      <div className="flex flex-wrap gap-8 p-8">
        {patterns.map((pattern) => (
          <Pattern key={pattern.name} {...pattern} />
        ))}
      </div>
      <PatternComparison
        title="Overall Statistics"
        data={overallData2}
        description="*Group 3*가 전반적으로 Cold Call보다 Follow up의 경향이 보임"
        domain={[0, 40]}
      />
      <PatternComparison
        title="Finding Manager"
        data={managerData}
        description={
          "*Group 3*에서 Request Manager 패턴이 가장 적게 나타남.\n*Group 3*가 Request Manager Fail Rate 가장 높음.\n*Group 3*이 Follow up scheduled이 타 그룹의 %에 비해 20% 높음.\n\nQ. 왜?\n가설 1. Group 3는 Manager Direct Call을 더 많이 시도\n-> 특정 이름을 찾는 Call이 유독 Group 3에 많음(벡터 임베딩으로 확인)"
        }
      />
      <Image
        src="/directCall.png"
        width={800}
        height={800}
        alt="Direct Call 벡터들의 위치"
      />
      <Link
        href="/?category=group123-pattern-tsne"
        className="bg-blue-600 p-4 rounded-lg text-white my-20"
      >
        관련 벡터 임베딩 보기
      </Link>
      <PatternComparison
        title="Sales Speech"
        data={serviceData}
        description={
          "*Group 3*은 Current Rate, Competitive Price, Invoice Request, Quote Request 등 금액과 관련된 분야에서 뛰어남.\n 금액의 결정 요소인 Pickup Frequency, Dumpster Size 또한 중요한 요소로 볼 수 있음.\n*Group 2*는 Group 3과는 반대의 경향을 가짐."
        }
        domain={[0, 20]}
      />
      <PatternComparison
        title="Referral"
        data={referralData}
        domain={[0, 20]}
      />
      <PatternComparison
        title="Contact Information"
        data={contactData}
        domain={[0, 30]}
      />
    </div>
  );
}

export default PatternPage;
