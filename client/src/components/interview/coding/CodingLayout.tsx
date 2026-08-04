import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CodingLayoutProps {
  children: ReactNode;
}

export default function CodingLayout({ children }: CodingLayoutProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-[1800px] p-6"
    >
      {children}
    </motion.section>
  );
}