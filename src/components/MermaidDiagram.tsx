import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
      mindmap: {
        padding: 10,
        maxNodeWidth: 200,
      }
    });

    const renderDiagram = async () => {
      if (ref.current && chart) {
        try {
          // Clear previous content
          ref.current.innerHTML = '';
          
          // Render the diagram
          const { svg } = await mermaid.render(idRef.current, chart);
          ref.current.innerHTML = svg;
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          ref.current.innerHTML = `
            <div class="text-red-500 p-4 bg-red-50 rounded">
              <p class="font-bold">মাইন্ড ম্যাপ রেন্ডার করতে সমস্যা হয়েছে</p>
              <p class="text-sm mt-2">দয়া করে আবার চেষ্টা করুন।</p>
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div className="mermaid-container my-4 p-4 bg-purple-50 rounded-lg overflow-x-auto">
      <div ref={ref} className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading mind map...</div>
      </div>
    </div>
  );
};

export default MermaidDiagram;
