import { FAQ } from "@/types/faq";

const faqData: FAQ[] = [
  {
    id: 1,
    quest: "How does salary streaming work?",
    ans: "Salary streaming allows you to access a portion of your earned wages before your scheduled payday. As you work, your earnings accumulate in real-time, and you can withdraw what you've already earned whenever you need it.",
  },
  {
    id: 2,
    quest: "Are there any fees for using StreamPay?",
    ans: "No, StreamPay is completely free for employees. There are no subscription fees, no interest charges, and no hidden costs. You're simply accessing your own earned money.",
  },
  {
    id: 3,
    quest: "Is my financial information secure?",
    ans: "Yes, we use bank-level security with 256-bit encryption to protect your data. We're fully compliant with financial regulations and never store your banking credentials on our servers.",
  },
  {
    id: 4,
    quest: "How quickly can I access my money?",
    ans: "Once you request a transfer, funds are typically available within minutes during business hours, and within 24 hours for weekend requests. No more waiting days for your money.",
  },
  {
    id: 5,
    quest: "What do employers need to do to offer StreamPay?",
    ans: "Employers simply need to integrate StreamPay with their existing payroll system. Our team handles the setup process, which typically takes less than a week to complete.",
  },
  {
    id: 6,
    quest: "How much of my salary can I access early?",
    ans: "You can typically access up to 50% of your earned wages at any time. The exact amount depends on your employer's policies and your earnings history with us.",
  },
];

export default faqData;
