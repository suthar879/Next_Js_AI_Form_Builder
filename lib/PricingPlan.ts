export type PricingPlanType = {
  level: string;
  price: string;
  services: string[];
};

export const PricingPlan: PricingPlanType[] = [
  {
    level: "Free",
    price: "$0/month",
    services: [
      "3 Free Credits",
      "Basic Supports",
      "Limited Features",
      "Community Access",
    ],
  },
  {
    level: "Pro",
    price: "$29/month",
    services: [
      "Unlimited Credits",
      "Basic Supports",
      "Limited Features",
      "Community Access",
    ],
  },
  {
    level: "Enterprise",
    price: "$70/month",
    services: [
      "Unlimited Credits",
      "Basic Supports",
      "Limited Features",
      "Community Access",
      "Monthly Updates",
    ],
  },
];
