import DOMPurify from 'isomorphic-dompurify';

export function sanitizeString(input: string): string {
    return DOMPurify.sanitize(input);
}