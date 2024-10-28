// chat-slice.js
export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessage: [],
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }), // corrected function name
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }), // corrected function name
    setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),
    closeChat: () => set({
        selectedChatType: undefined,
        selectedChatData: undefined,
        selectedChatMessage: [],
    }),
});
