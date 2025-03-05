import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ViewType} from '@/types';

interface AnimatedViewTransitionProps {
    children: React.ReactNode;
    viewType: ViewType;
}

export default function AnimatedViewTransition({
    children,
    viewType
}: AnimatedViewTransitionProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={viewType}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.3}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
