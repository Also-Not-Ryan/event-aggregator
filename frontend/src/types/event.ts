export interface Event {
    id?: number;
    title: string;
    date: string;
    location: string;
    description: string;
    url?: string;
    category?: string;
    source?: string;
}