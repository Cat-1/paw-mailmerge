import DOMPurify from 'dompurify';

function sanitizeText(text: string): string {
    let dirty = `<p>${text}</p>`;
    let clean = DOMPurify.sanitize(dirty);
    return clean;
}

export function OpenTextTab(text: string): void {
    // sanitize the text first because we're writing HTML to the document directly
    const cleanHtml = sanitizeText(text);
    const newTab = window.open('', '_blank');
    newTab?.document.write(cleanHtml);
    newTab?.document.close();
}