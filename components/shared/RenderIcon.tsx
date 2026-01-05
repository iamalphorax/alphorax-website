import React from "react";
import * as Lucide from "lucide-react";

interface RenderIconProps {
    /**
     * icon string format:
     * "Name[:size][:class...]" 
     * Examples:
     * - "Cpu"
     * - "Cpu:40"
     * - "Cpu:40:text-primary/80:rotate-45"
     * - "Heart::text-red-500" (skip size)
     */
    icon: string;
    size?: number;
    className?: string;
}

type IconSet = Record<string, React.ElementType>;

const ICON_SET = Lucide as unknown as IconSet;

/** Parse icon string dynamically */
function parseIcon(
    icon: string
): { name: string; size?: number; className?: string } {
    const parts = icon.split(":");
    const [name, maybeSize, ...rest] = parts;

    const parsedSize =
        maybeSize && !isNaN(Number(maybeSize)) ? Number(maybeSize) : undefined;

    const classes = parsedSize
        ? rest.join(" ").trim()
        : [maybeSize, ...rest].filter(Boolean).join(" ").trim();

    return {
        name,
        size: parsedSize,
        className: classes || undefined,
    };
}

export const RenderIcon: React.FC<RenderIconProps> = ({
    icon,
    size,
    className = "text-accent",
}) => {
    const { name, size: inlineSize, className: inlineClass } = parseIcon(icon);
    const IconComponent = ICON_SET[name];

    const resolvedSize = inlineSize ?? size ?? 32;
    const resolvedClass = [className, inlineClass].filter(Boolean).join(" ");

    if (!IconComponent) {
        console.warn(`⚠️ Icon not found: ${name}`);
        return (
            <div
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500"
                aria-label="Missing icon"
            >
                ?
            </div>
        );
    }

    return (
        <IconComponent
            size={resolvedSize}
            className={resolvedClass}
            aria-hidden="true"
        />
    );
};
