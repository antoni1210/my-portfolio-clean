"use client";

import {
    motion,
    useMotionValue,
    useAnimationFrame,
} from "framer-motion";
import {
    useEffect,
    useRef,
    useState,
} from "react";


const images = Array.from(
    { length: 195 },
    (_, i) =>
        `/home-thumbs/home_${String(i + 1).padStart(2, "0")}.jpg`
);

// Shuffle images randomly on each page load
function shuffleArray(array: string[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function HomeCanvas() {
    const x = useMotionValue(-200);
    const y = useMotionValue(-100);
    const baseVelocityX = -0.3;
    const baseVelocityY = -0.2;
    const [shuffledImages, setShuffledImages] =
        useState(images);

    // Permanent ambient velocity
    const velocityX = useRef(-0.3);
    const velocityY = useRef(-0.2);

    const dragging = useRef(false);

    const lastMouse = useRef({
        x: 0,
        y: 0,
    });

    const isPageVisible = useRef(true);

    useAnimationFrame(() => {
        if (!isPageVisible.current) return;

        x.set(x.get() + velocityX.current);
        y.set(y.get() + velocityY.current);

        // Ease back toward ambient drift
        velocityX.current +=
            (baseVelocityX - velocityX.current) * 0.01;

        velocityY.current +=
            (baseVelocityY - velocityY.current) * 0.01;
    });

    useEffect(() => {
        const handlePageShow = () => {
            isPageVisible.current = true;

            // restart drift after back navigation
            velocityX.current ||= baseVelocityX;
            velocityY.current ||= baseVelocityY;
        };

        const handlePageHide = () => {
            isPageVisible.current = false;
        };

        window.addEventListener(
            "pageshow",
            handlePageShow
        );

        window.addEventListener(
            "pagehide",
            handlePageHide
        );

        return () => {
            window.removeEventListener(
                "pageshow",
                handlePageShow
            );

            window.removeEventListener(
                "pagehide",
                handlePageHide
            );
        };
    }, []);

    useEffect(() => {
        setShuffledImages(shuffleArray(images));
    }, []);

    const handlePointerDown = (
        e: React.PointerEvent
    ) => {
        dragging.current = true;

        lastMouse.current = {
            x: e.clientX,
            y: e.clientY,
        };
    };

    const handlePointerMove = (
        e: React.PointerEvent
    ) => {
        if (!dragging.current) return;

        const dx =
            e.clientX - lastMouse.current.x;

        const dy =
            e.clientY - lastMouse.current.y;

        x.set(x.get() + dx);
        y.set(y.get() + dy);

        // Update movement direction
        velocityX.current = dx * 0.08;
        velocityY.current = dy * 0.08;

        lastMouse.current = {
            x: e.clientX,
            y: e.clientY,
        };
    };

    const handlePointerUp = () => {
        dragging.current = false;
    };

    return (
        <div
            className="fixed inset-0 overflow-hidden bg-black cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <>
                {/* Top cinematic strip */}
                <div className="pointer-events-none absolute top-0 left-0 w-full h-[130px] bg-black z-20 hidden md:block" />

                {/* Bottom cinematic strip */}
                <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[130px] bg-black z-20 hidden md:block" />

                {/* Subtle atmospheric overlay */}
                {/* Subtle atmospheric overlay + vignette */}
                <div
                    className="pointer-events-none absolute inset-0 z-10"
                    style={{
                        background: `
      linear-gradient(
        rgba(0,0,0,0.30),
        rgba(0,0,0,0.30)
      ),
      radial-gradient(
        circle at center,
        transparent 38%,
        rgba(0,0,0,0.82) 100%
      )
    `,
                    }}
                />
            </>

            <motion.div
                style={{ x, y }}
                className="absolute flex flex-col p-[4px]"
            >
                {Array.from({
                    length: Math.ceil(
                        shuffledImages.length / 6
                    ),
                }).map((_, rowIndex) => {
                    const rowImages = shuffledImages.slice(
                        rowIndex * 6,
                        rowIndex * 6 + 6
                    );

                    return (
                        <div
                            key={rowIndex}
                            className="flex gap-[4px] mb-[4px]"
                            style={{
                                marginLeft: "0px",
                            }}
                        >
                            {rowImages.map(
                                (image, colIndex) => {
                                    return (
                                        <div
                                            key={colIndex}
                                            className="w-[480px] h-[320px] overflow-hidden bg-neutral-900 flex-shrink-0"
                                        >
                                            <img
                                                src={image}
                                                alt=""
                                                className="w-full h-full object-cover pointer-events-none select-none"
                                                draggable={false}
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}