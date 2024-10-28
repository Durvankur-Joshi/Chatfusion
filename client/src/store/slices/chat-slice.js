// chat-slice.js
export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessage: [],
    // setSelectedChatType: (selectedChatType) => set({ selectedChatType }), // corrected function name

    setSelectedChatType: (selectedChatType) => {
        console.log("Setting selectedChatType:", selectedChatType);
        set({ selectedChatType });
    },

    // setSelectedChatData: (selectedChatData) => set({ selectedChatData }), // corrected function name


    setSelectedChatData: (selectedChatData) => {
        console.log("Setting selectedChatData:", selectedChatData);
        set({ selectedChatData });
    },


    setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),
   
});
