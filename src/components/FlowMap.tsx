import ReactFlow, { 
    Background, 
    Controls, 
    useNodesState, 
    useEdgesState,
    type NodeTypes,
    type Node,
    type Edge,
    useReactFlow,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import BubbleNode, { type BubbleData } from './BubbleNode';
import { Search, Focus } from 'lucide-react';
import { useCallback } from 'react';

// Define the custom node types
const nodeTypes: NodeTypes = {
  bubble: BubbleNode,
};

const initialNodes: Node<BubbleData>[] = [
  // CENTER NODE - Large
  { 
    id: '1', 
    type: 'bubble', 
    position: { x: 0, y: 0 }, 
    data: { 
      label: 'To Be', 
      type: 'verb',
      size: 'xl',
      details: {
        category: 'Verbo',
        title: 'Ser / Estar',
        description: 'The most fundamental verb in English.',
        example: 'I am happy.',
        translation: 'Yo estoy feliz.'
      }
    } 
  },
  
  // TOP LEFT - Green
  { 
    id: '2', 
    type: 'bubble', 
    position: { x: -300, y: -200 }, 
    data: { 
      label: 'Water', 
      type: 'noun',
      size: 'sm',
    } 
  },
  
  // LEFT/TOP - Yellow
  { 
    id: '3', 
    type: 'bubble', 
    position: { x: -180, y: -50 }, 
    data: { 
      label: 'Past Simple', 
      type: 'grammar',
      size: 'md', 
      details: {
        category: 'Gramática',
        title: 'Pasado Simple',
        description: 'Used for finished actions in the past.',
        example: 'I worked yesterday.',
        translation: 'Trabajé ayer.'
      }
    } 
  },

  // RIGHT/TOP - Purple
  { 
    id: '4', 
    type: 'bubble', 
    position: { x: 250, y: -100 }, 
    data: { 
      label: "How's it going?", 
      type: 'phrase',
      size: 'md',
      details: {
        category: 'Frase',
        title: '¿Cómo te va?',
        description: 'A casual way to say "How are you?".',
        example: 'Hey! How\'s it going?',
        translation: '¡Ey! ¿Cómo te va?'
      }
    } 
  },

  // FAR RIGHT - Yellow - A/An
  { 
    id: '5', 
    type: 'bubble', 
    position: { x: 450, y: -150 }, 
    data: { 
      label: "A/An", 
      type: 'grammar',
      size: 'sm',
    } 
  },

  // BOTTOM LEFT - Red/Mistake
  { 
      id: '6', 
      type: 'bubble', 
      position: { x: -200, y: 200 }, 
      data: { 
        label: "Actually", 
        type: 'mistake',
        size: 'lg',
        details: {
          category: 'Error Común',
          title: 'En realidad',
          description: 'Warning: Does NOT mean "actualmente".',
          example: 'Actually, I\'m busy.',
          translation: 'En realidad, estoy ocupado.'
        }
      } 
    },
    
    // FAR BOTTOM LEFT - Purple phrase
    { 
      id: '7', 
      type: 'bubble', 
      position: { x: -400, y: 300 }, 
      data: { 
        label: "Once in a blue moon", 
        type: 'phrase',
        size: 'md',
      } 
    },

    // BOTTOM RIGHT - Green
    { 
      id: '8', 
      type: 'bubble', 
      position: { x: 300, y: 150 }, 
      data: { 
        label: "Environment", 
        type: 'noun',
        size: 'md',
        details: {
          category: 'Sustantivo',
          title: 'Medio Ambiente',
          description: 'The surroundings or conditions.',
          example: 'Protect the environment.',
          translation: 'Proteger el medio ambiente.'
        }
      } 
    },
    
    // BOTTOM CENTER - Blue
    { 
      id: '9', 
      type: 'bubble', 
      position: { x: 50, y: 250 }, 
      data: { 
        label: "To Have", 
        type: 'verb',
        size: 'md',
      } 
    },
];

const initialEdges: Edge[] = []; // No visible edges in the new design


// Extract internal component to use useReactFlow hook
function FlowMapContent() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);
    const { fitView } = useReactFlow();

    const handleCenterView = useCallback(() => {
        fitView({ padding: 0.2, duration: 800 });
    }, [fitView]);

    const onInit = useCallback((reactFlowInstance: any) => {
        reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onInit={onInit}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                proOptions={{ hideAttribution: true }}
                className="bg-transparent"
                minZoom={0.5}
                maxZoom={1.5}
            >
                <Background color="transparent" /> 
            </ReactFlow>
            
            {/* Header */}
            <div className="fixed top-8 left-10 pointer-events-none z-50">
                <h1 className="text-2xl font-bold tracking-tight text-slate-700">Bubble English</h1>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mt-1">Immersive Memory Map</p>
            </div>

            {/* Top Right Actions */}
            <div className="fixed top-8 right-10 flex gap-4 z-50">
                <button className="bg-white/50 backdrop-blur-md p-3 rounded-xl hover:bg-white/80 transition-all text-slate-600 shadow-sm cursor-pointer">
                    <Search size={20} />
                </button>
                <button 
                  onClick={handleCenterView}
                  className="bg-white/50 backdrop-blur-md p-3 rounded-xl hover:bg-white/80 transition-all text-slate-600 shadow-sm cursor-pointer active:scale-95 duration-200"
                  title="Center View"
                >
                    <Focus size={20} />
                </button>
            </div>

            {/* Bottom Legend */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-50 w-full flex justify-center px-4">
                <div className="glass-panel px-8 py-4 rounded-full flex flex-wrap justify-center items-center gap-x-8 gap-y-2 pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-[#9be9ff]"></div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Verbs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-[#fefce8] border border-[#fef08a]"></div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Grammar</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-[#fecaca]"></div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Mistakes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-[#e9d5ff]"></div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Phrases</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-[#bbf7d0]"></div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Nouns</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FlowMap() {
  return (
    <ReactFlowProvider>
      <FlowMapContent />
    </ReactFlowProvider>
  );
}
