export function dayKeyLocal(d = new Date()) {
        const y = d.getFullYear();
        const m = String(d.getMonth()+1).padStart(2,'0');
        const dd = String(d.getDate()).padStart(2,'0');
        return `${y}-${m}-${dd}`;   // e.g. "2025-08-19"
    }

