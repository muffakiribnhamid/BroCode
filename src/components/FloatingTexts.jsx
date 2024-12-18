import React from 'react';
import { motion } from 'framer-motion';

const FloatingTexts = () => {
    const texts = [
        "Rate Developers 🏆",
        "Who's the Better Dev? 💻",
        "Vote for Excellence ⭐",
        "Compare Skills 🚀",
        "Find Top Talent 🎯",
        "Discover Brilliance ✨",
        "Choose the Best 🌟",
        "Dev vs Dev 🤝",
        "Rate & Decide 📊",
        "Pick Your Champion 🏅"
    ];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {texts.map((text, index) => (
                <motion.div
                    key={index}
                    className="absolute text-black font-mono text-xl font-bold opacity-20"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        rotate: Math.random() * 360 - 180
                    }}
                    animate={{
                        x: [
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerWidth
                        ],
                        y: [
                            Math.random() * window.innerHeight,
                            Math.random() * window.innerHeight,
                            Math.random() * window.innerHeight
                        ],
                        rotate: [
                            Math.random() * 360 - 180,
                            Math.random() * 360 - 180,
                            Math.random() * 360 - 180
                        ]
                    }}
                    transition={{
                        duration: 20 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {text}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingTexts;
