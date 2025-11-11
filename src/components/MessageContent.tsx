import React from 'react';
import MermaidDiagram from './MermaidDiagram';

interface MessageContentProps {
  content: string;
  isBotMessage: boolean;
}

const MessageContent: React.FC<MessageContentProps> = ({ content, isBotMessage }) => {
  // Check if content contains mermaid code block
  const mermaidMatch = content.match(/```mermaid\n([\s\S]*?)\n```/);
  
  if (mermaidMatch) {
    // Extract parts before and after mermaid
    const beforeMermaid = content.substring(0, mermaidMatch.index);
    const afterMermaid = content.substring((mermaidMatch.index || 0) + mermaidMatch[0].length);
    const mermaidCode = mermaidMatch[1];
    
    return (
      <>
        {beforeMermaid && (
          <div 
            className={`${isBotMessage ? 'font-bangla' : ''} leading-relaxed mb-4`}
            dangerouslySetInnerHTML={{ __html: beforeMermaid }}
          />
        )}
        <MermaidDiagram chart={mermaidCode} />
        {afterMermaid && (
          <div 
            className={`${isBotMessage ? 'font-bangla' : ''} leading-relaxed mt-4`}
            dangerouslySetInnerHTML={{ __html: afterMermaid }}
          />
        )}
      </>
    );
  }
  
  // No mermaid code, render normally
  return (
    <div 
      className={`${isBotMessage ? 'font-bangla' : ''} leading-relaxed`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default MessageContent;
