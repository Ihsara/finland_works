
import { LanguageCode } from "../types";

export interface VantaaEvent {
  id: string;
  name: { fi?: string; en?: string; sv?: string };
  location_extra_info?: { fi?: string; en?: string };
  start_time: string;
  end_time?: string;
  images: { url: string }[];
  short_description: { fi?: string; en?: string };
  info_url?: { fi?: string; en?: string };
  event_status?: string; // e.g., "EventScheduled", "EventCancelled"
  location?: {
      address_locality?: { fi?: string; en?: string; sv?: string };
      name?: { fi?: string; en?: string; sv?: string };
  };
}

const API_BASE = 'https://api.hel.fi/linkedevents/v1/event/';

export const getVantaaEvents = async (lang: LanguageCode = 'en'): Promise<VantaaEvent[]> => {
  try {
    // 1. Get Today (Dynamically fetched at runtime)
    const today = new Date();
    
    // 2. Get Date 1 Month from now
    const nextMonth = new Date(today);
    nextMonth.setDate(today.getDate() + 30);

    // 3. Format Dates for LinkedEvents API (ISO 8601)
    const isoStart = today.toISOString().split('.')[0] + 'Z';
    const isoEnd = nextMonth.toISOString().split('.')[0] + 'Z';

    // 4. Construct Query Parameters
    // We use 'kunta:vantaa' to specifically target the Vantaa municipality ID in LinkedEvents.
    const params = new URLSearchParams({
      division: 'kunta:vantaa', 
      sort: 'start_time',
      page_size: '100', // Fetch more to allow for client-side filtering if needed
      start: isoStart,
      end: isoEnd,
      language: lang === 'fi' ? 'fi' : 'en',
      include: 'location'
    });

    const response = await fetch(`${API_BASE}?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error(`Event API Error: ${response.status}`);
    }

    const data = await response.json();
    const rawEvents = data.data || [];

    // Deduplication Set: Track Start Times.
    // If we have already seen an event starting at this exact second, skip subsequent ones.
    // This effectively filters out "English version" vs "Finnish version" duplicates of the same event.
    const seenTimes = new Set<string>();

    // 5. Filter Client-Side for strict compliance
    const validEvents = rawEvents.filter((e: any) => {
        // Must be scheduled (not cancelled)
        if (e.event_status !== 'EventScheduled') return false;

        // Must strictly start in the future (relative to 'today')
        const eventStart = new Date(e.start_time);
        if (eventStart < today) return false;

        // Strict Location Check: Ensure it is actually in Vantaa
        if (e.location && e.location.address_locality) {
             const loc = e.location.address_locality;
             const text = (loc.fi || loc.en || loc.sv || '').toLowerCase();
             
             // Only exclude if it EXPLICITLY says Helsinki or Espoo AND NOT Vantaa.
             if ((text.includes('helsinki') || text.includes('espoo')) && !text.includes('vantaa')) {
                 return false;
             }
        }

        // AGGRESSIVE DEDUPLICATION:
        // Use Start Time as the unique key. 
        // We only want ONE event per time slot to diversify the dashboard.
        const timeKey = e.start_time;
        if (seenTimes.has(timeKey)) {
            return false;
        }
        seenTimes.add(timeKey);

        return true;
    });

    // Return only top 3
    return validEvents.slice(0, 3);
  } catch (error) {
    console.warn("Failed to fetch Vantaa events", error);
    return [];
  }
};

export const getEventName = (event: VantaaEvent, lang: LanguageCode): string => {
    // Fallback chain: Requested Lang -> English -> Finnish -> First Available
    if (lang === 'en') return event.name.en || event.name.fi || Object.values(event.name)[0] || 'Event';
    if (lang === 'fi') return event.name.fi || event.name.en || Object.values(event.name)[0] || 'Tapahtuma';
    // Default fallback
    return event.name.en || event.name.fi || Object.values(event.name)[0] || 'Event';
};

export const getEventDescription = (event: VantaaEvent, lang: LanguageCode): string => {
    const descObj = event.short_description || {};
    if (lang === 'en') return descObj.en || descObj.fi || '';
    if (lang === 'fi') return descObj.fi || descObj.en || '';
    return descObj.en || '';
};
