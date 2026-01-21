import { Handle, Position, type NodeProps } from 'reactflow';
import { useState, useMemo } from 'react';

export type BubbleData = {
  label: string;
  type: 'verb' | 'grammar' | 'mistake' | 'phrase' | 'noun';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  details?: {
    category: string;
    title: string;
    description: string;
    example: string;
    translation: string;
  };
};

export default function BubbleNode({ data, id }: NodeProps<BubbleData>) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a stable "organic" shape based on the node ID
  const borderRadius = useMemo(() => {
    // seeded random-ish values based on ID char codes
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Use a tighter range (e.g., 45% to 65%) for smoother, less jagged blobs
    const base = 48;
    const variation = 18;
    
    const r1 = base + (seed % variation);
    const r2 = base + ((seed * 2) % variation);
    const r3 = base + ((seed * 3) % variation);
    const r4 = base + ((seed * 4) % variation);
    const r5 = base + ((seed * 5) % variation);
    const r6 = base + ((seed * 6) % variation);
    const r7 = base + ((seed * 7) % variation);
    const r8 = base + ((seed * 8) % variation);
    
    return `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
  }, [id]);

  // Size mapping
  const sizeMap = {
    sm: 100,
    md: 130,
    lg: 160,
    xl: 220,
  };
  
  const size = sizeMap[data.size || 'md'];

  // Map bubble types to their CSS classes/colors
  const bubbleClasses = {
    verb: 'bubble-verb',
    grammar: 'bubble-grammar',
    mistake: 'bubble-mistake',
    phrase: 'bubble-phrase',
    noun: 'bubble-noun',
  };

  const bubbleClass = bubbleClasses[data.type] || 'bg-white';
  
  // Tailwind colors for the category tag
  const categoryColors = {
    verb: 'text-sky-600',
    grammar: 'text-amber-600',
    mistake: 'text-rose-600',
    phrase: 'text-purple-600',
    noun: 'text-emerald-600',
  };

  const categoryColor = categoryColors[data.type] || 'text-slate-500';

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Handles are required by React Flow but we can hide them */}
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      {/* The Bubble */}
      <div 
        className={`
          bubble-base
          font-bold
          ${bubbleClass}
          ${isHovered ? 'z-50 scale-105 shadow-lg' : ''}
        `}
        style={{ 
          width: size, 
          height: size,
          borderRadius: borderRadius,
        }}
      >
        <div className="px-4 pointer-events-none select-none relative z-10">
            {data.label}
        </div>
      </div>

      {/* The Tooltip/Card - Only show if details exist */}
      {data.details && (
        <div 
          className={`
            absolute top-0 left-full ml-4 w-64 glass-panel p-5 rounded-2xl 
            transition-all duration-300 z-100
            ${isHovered ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-2'}
          `}
        >
          <span className={`text-[10px] uppercase tracking-widest font-bold ${categoryColor}`}>
            {data.details.category}
          </span>
          <h3 className="text-lg font-bold mt-1 text-slate-800">{data.details.title}</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{data.details.description}</p>
          
          <div className="mt-3 p-3 bg-white/50 rounded-xl border border-white/60">
            <p className="text-xs italic text-slate-700">"{data.details.example}"</p>
            <p className="text-[10px] text-slate-500 mt-1">{data.details.translation}</p>
          </div>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
}
