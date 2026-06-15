"use client";

import { motion } from "framer-motion";

export default function FadeIn({
    children,
    animationKey,
}: {
    children: React.ReactNode;
    animationKey: string;
}) {
    return (
        <motion.div
            key={animationKey}
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.35,
            }}
        >
            {children}
        </motion.div>
    );
}