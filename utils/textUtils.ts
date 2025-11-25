
import { LanguageCode } from "../types";

/**
 * Uses the browser's Intl.Segmenter (or regex fallback) to split text into sentences 
 * and wraps them in spans with a specific class and unique ID.
 * This handles sentences that span across multiple HTML elements (like bold, links).
 */
export const wrapSentencesInHtml = (htmlContent: string, language: LanguageCode): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  let sentenceIdCounter = 0;

  // We process block-level elements. 
  // We look for blocks that typically contain content in Markdown output.
  const blocks = doc.body.querySelectorAll('p, li, blockquote, h1, h2, h3, h4, h5, h6, th, td');
  
  blocks.forEach(block => {
    // Skip if this block contains other blocks (e.g. a list item containing a p), 
    // to avoid processing text twice. We want leaf-ish blocks.
    // However, simple lists usually have text directly in LI.
    if (block.tagName === 'LI' && block.querySelector('p')) return;

    const text = block.textContent || '';
    if (!text.trim()) return;

    // 1. Identify Sentences (Ranges)
    const sentenceRanges: { start: number; end: number; id: string; text: string }[] = [];
    
    const IntlAny = Intl as any;
    if (typeof IntlAny.Segmenter !== 'undefined') {
        try {
            const segmenter = new IntlAny.Segmenter(language, { granularity: 'sentence' });
            const segments = Array.from(segmenter.segment(text)) as { segment: string, index: number }[];
            segments.forEach(seg => {
                 sentenceRanges.push({
                     start: seg.index,
                     end: seg.index + seg.segment.length,
                     id: `s-${sentenceIdCounter++}`,
                     text: seg.segment
                 });
            });
        } catch (e) {
            console.warn("Intl.Segmenter failed, using fallback", e);
            fallbackSegment(text, sentenceRanges, sentenceIdCounter);
        }
    } else {
        fallbackSegment(text, sentenceRanges, sentenceIdCounter);
    }
    // Update counter for next block to ensure uniqueness
    sentenceIdCounter += sentenceRanges.length;

    // 2. Walk DOM and wrap text nodes
    let globalIndex = 0;

    const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const nodeText = node.textContent || '';
            const nodeLength = nodeText.length;
            const nodeStart = globalIndex;
            const nodeEnd = globalIndex + nodeLength;

            // Find sentences that overlap with this text node
            const overlaps = sentenceRanges.filter(r => 
                (r.start < nodeEnd && r.end > nodeStart)
            );

            if (overlaps.length > 0) {
                const fragment = document.createDocumentFragment();
                let cursor = 0; // relative to nodeText

                // Handle text before the first sentence in this node (gaps/whitespace)
                const firstOverlap = overlaps[0];
                const firstRelStart = Math.max(0, firstOverlap.start - nodeStart);
                if (firstRelStart > 0) {
                     fragment.appendChild(document.createTextNode(nodeText.slice(0, firstRelStart)));
                     cursor = firstRelStart;
                }

                overlaps.forEach(r => {
                    const relStart = Math.max(0, r.start - nodeStart);
                    const relEnd = Math.min(nodeLength, r.end - nodeStart);

                    // Handle gaps between overlapping sentences within this node
                    if (relStart > cursor) {
                        fragment.appendChild(document.createTextNode(nodeText.slice(cursor, relStart)));
                    }

                    if (relEnd > relStart) {
                        const span = document.createElement('span');
                        span.className = 'interactive-sentence';
                        span.dataset.sentenceId = r.id;
                        // We store the FULL sentence text in every span for easy retrieval
                        span.dataset.sentenceText = r.text;
                        span.textContent = nodeText.slice(relStart, relEnd);
                        fragment.appendChild(span);
                    }
                    
                    cursor = relEnd;
                });

                // Handle remaining text after last sentence
                if (cursor < nodeLength) {
                    fragment.appendChild(document.createTextNode(nodeText.slice(cursor)));
                }
                
                node.parentNode?.replaceChild(fragment, node);
            }
            
            globalIndex += nodeLength;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Skip interactive elements or scripts
            const el = node as HTMLElement;
            if (['SCRIPT', 'STYLE', 'SVG', 'BUTTON', 'TEXTAREA'].includes(el.tagName)) {
                 // If we skip, we must advance globalIndex by the text content length of this skipped node
                 // so subsequent nodes stay in sync.
                 globalIndex += (el.textContent || '').length;
                 return;
            }
            
            // Recurse
            Array.from(node.childNodes).forEach(child => walk(child));
        }
    };

    Array.from(block.childNodes).forEach(child => walk(child));
  });

  return doc.body.innerHTML;
};

const fallbackSegment = (text: string, ranges: any[], startId: number) => {
    // Basic splitting by punctuation followed by space or end of string
    const regex = /[^.!?]+([.!?]+[\s]*|$)/g;
    let match;
    let id = startId;
    while ((match = regex.exec(text)) !== null) {
        if (match[0].trim().length > 0) {
            ranges.push({
                start: match.index,
                end: match.index + match[0].length,
                id: `s-${id++}`,
                text: match[0]
            });
        }
    }
};

/**
 * Robustly extracts a JSON object from a string that might contain Markdown or conversational filler.
 * It looks for the outermost { } pair.
 */
export const extractJsonFromText = (text: string): any | null => {
  if (!text) return null;

  // 1. Try simple parse first (best case)
  try {
    return JSON.parse(text);
  } catch (e) {
    // Continue to advanced extraction
  }

  // 2. Extract from Markdown Code Blocks (```json ... ```)
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch && codeBlockMatch[1]) {
    try {
      return JSON.parse(codeBlockMatch[1]);
    } catch (e) {
      // Failed to parse code block content
    }
  }

  // 3. Extract outermost braces
  const firstOpen = text.indexOf('{');
  const lastClose = text.lastIndexOf('}');
  
  if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
    const candidate = text.substring(firstOpen, lastClose + 1);
    try {
      return JSON.parse(candidate);
    } catch (e) {
      // Failed to parse brace content
    }
  }

  return null;
};

export const parseTaggedResponse = (text: string) => {
  // 1. Extract content between <reply> tags
  const replyMatch = text.match(/<reply>([\s\S]*?)<\/reply>/i);
  const cleanReply = replyMatch ? replyMatch[1].trim() : null;

  // 2. Extract content between <question> tags
  const questionMatch = text.match(/<question>([\s\S]*?)<\/question>/i);
  let structuredData = null;

  if (questionMatch) {
    const qContent = questionMatch[1];
    // Extract Header
    const headerMatch = qContent.match(/<header>([\s\S]*?)<\/header>/i);
    const header = headerMatch ? headerMatch[1].trim() : '';
    
    // Extract Options
    const options: { id: string; label: string; value: string }[] = [];
    // Regex to handle <option value="...">Label</option>
    // Note: quotes around value are expected
    const optionRegex = /<option\s+value=["'](.*?)["']>([\s\S]*?)<\/option>/gi;
    let match;
    let idx = 1;
    while ((match = optionRegex.exec(qContent)) !== null) {
      options.push({
        id: `opt-${idx++}`,
        value: match[1], // Group 1: value attribute
        label: match[2].trim() // Group 2: inner text
      });
    }

    if (options.length > 0) {
      structuredData = {
        type: 'interactive_choice',
        data: {
          question_header: header,
          options: options
        }
      };
    }
  }

  // Determine final display text
  let displayText = cleanReply;
  if (displayText === null) {
      // If no <reply> tag was found:
      if (structuredData) {
          // If we have a question but no reply tag, assuming the model mixed text with <question> block.
          // Remove the <question> block from the text to avoid showing raw XML tags to user.
          displayText = text.replace(/<question>[\s\S]*?<\/question>/i, '').trim();
      } else {
          // No tags at all, just return the raw text
          displayText = text;
      }
  }

  return { text: displayText, structuredData };
};
