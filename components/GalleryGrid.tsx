"use client";

import { useState } from "react";

export default function GalleryGrid({
    images,
    layout,
}: {
    images: any[];
    layout: "grid" | "column";
}) {
    const [selectedImage, setSelectedImage] =
        useState<string | null>(null);

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
                                    setSelectedImage(img.asset.url)
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
                                setSelectedImage(img.asset.url)
                            }
                        />
                    ))}
                </div>
            )}

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-8 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        className="max-w-[95vw] max-h-[95vh] object-contain"
                    />
                </div>
            )}
        </>
    );
}