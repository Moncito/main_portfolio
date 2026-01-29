import React from "react";

const MagicButton = ({
    title,
    icon,
    position,
    handleClick,
    otherClasses,
}: {
    title: string;
    icon: React.ReactNode;
    position: string;
    handleClick?: () => void;
    otherClasses?: string;
}) => {
    return (
        <button
            className="relative inline-flex h-14 w-full overflow-hidden p-[1px] focus:outline-none md:w-64 transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
            onClick={handleClick}
        >
            <span className="absolute inset-x-0 h-full bg-black" />
            <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center bg-black px-8 text-[11px] font-black uppercase tracking-[0.2em] text-white gap-3 group-hover:bg-[#1a1a1a] transition-colors font-syne ${otherClasses}`}
            >
                {position === "left" && icon}
                {title}
                {position === "right" && (
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {icon}
                    </span>
                )}
            </span>
        </button>
    );
};

export default MagicButton;
