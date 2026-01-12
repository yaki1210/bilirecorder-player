import React from 'react';

interface DanmakuContentProps {
    content: string;
    emots?: Record<string, string>;
    color?: number;
}

const DanmakuContent: React.FC<DanmakuContentProps> = React.memo(({ content, emots, color }) => {
    if (!emots || Object.keys(emots).length === 0) {
        return <>{content}</>;
    }

    // Split content by emoticon keys (e.g. [dog])
    const keys = Object.keys(emots).sort((a, b) => b.length - a.length);
    // Escape regex characters
    const pattern = new RegExp(`(${keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');

    const parts = content.split(pattern);
    return (
        <>
            {parts.map((part, i) => {
                if (emots[part]) {
                    return (
                        <img
                            key={i}
                            src={emots[part]}
                            alt={part}
                            className="inline-block h-[1.3em] w-auto align-text-bottom mx-0.5"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                        />
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </>
    );
});

export default DanmakuContent;
