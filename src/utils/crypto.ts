export const calculateHash = async (data: string): Promise<string> => {
    // Use Web Crypto API for real SHA-256
    const msgBuffer = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

export const generateId = (prefix: string = "id"): string => {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`;
};
