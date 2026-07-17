import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "What is InterviewIQ AI?",
    answer:
      "InterviewIQ AI is an AI-powered interview preparation platform that helps you practice interviews, improve your resume, and track your performance.",
  },
  {
    question: "How does the AI interview work?",
    answer:
      "The AI asks interview questions, analyzes your responses, and provides personalized feedback to help you improve.",
  },
  {
    question: "Can I upload my resume?",
    answer:
      "Yes. You can upload your resume and receive ATS analysis, keyword suggestions, and improvement recommendations.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan allows you to experience the platform before upgrading.",
  },
  {
    question: "Which companies are supported?",
    answer:
      "You can prepare for interviews at Google, Meta, Amazon, Microsoft, Netflix, Stripe, and many more.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            FAQ
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Everything you need to know about InterviewIQ AI.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-16">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>

              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}