"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GalleryGrid({
    images,
    layout,
}: {
    images: any[];
    layout: "grid" | "column";
}) {
    const [selectedIndex, setSelectedIndex] =
        useState<number | null>(null);
    useEffect(() => {
        const handleKeyDown = (
            e: KeyboardEvent
        ) => {
            if (selectedIndex === null) return;

            if (e.key === "Escape") {
                setSelectedIndex(null);
            }

            if (e.key === "ArrowRight") {
                setSelectedIndex(
                    (selectedIndex + 1) %
                    images.length
                );
            }

            if (e.key === "ArrowLeft") {
                setSelectedIndex(
                    (selectedIndex -
                        1 +
                        images.length) %
                    images.length
                );
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
    }, [selectedIndex, images]);

    return (
        <>
            {layout === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1600px] mx-auto">
                    {images.map((img) => (
                        <div
                            key={img.asset._id}
                            className="overflow-visible"
                        >
                            <img
                                src={img.asset.url}
                                className="w-full cursor-pointer"
                                style={{
                                    transition: "transform 0.4s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "scale(1.03)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "scale(1)";
                                }}
                                onClick={() =>
                                    setSelectedIndex(
                                        images.findIndex(
                                            (i) =>
                                                i.asset._id ===
                                                img.asset._id
                                        )
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-w-full">
                    {images.map((img) => (
                        <img
                            key={img.asset._id}
                            src={img.asset.url}
                            className="w-full cursor-pointer"
                            style={{
                                transition: "transform 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "scale(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "scale(1)";
                            }}
                            onClick={() =>
                                setSelectedIndex(
                                    images.findIndex(
                                        (i) =>
                                            i.asset._id ===
                                            img.asset._id
                                    )
                                )
                            }
                        />
                    ))}
                </div>
            )}

            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-8 cursor-pointer"
                    onClick={() =>
                        setSelectedIndex(null)
                    }
                >
                    <motion.img
                        src={
                            images[selectedIndex]
                                .asset.url
                        }
                        className="max-w-[95vw] max-h-[95vh] object-contain"
                        drag="x"
                        dragConstraints={{
                            left: 0,
                            right: 0,
                        }}
                        onDragEnd={(
                            _,
                            info
                        ) => {
                            if (
                                info.offset.x < -100
                            ) {
                                setSelectedIndex(
                                    (selectedIndex + 1) %
                                    images.length
                                );
                            }

                            if (
                                info.offset.x > 100
                            ) {
                                setSelectedIndex(
                                    (selectedIndex -
                                        1 +
                                        images.length) %
                                    images.length
                                );
                            }
                        }}
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    />
                </div>
            )}
        </>
    );
}
