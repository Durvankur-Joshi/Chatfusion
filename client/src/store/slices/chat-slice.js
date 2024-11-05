
export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessage: [],
    directMessagesContacts: [], 
   isUploading:false,
   isDownloading:false,
   fileUploadProgress:0,
   fileDownloadProgress:0,



   setIsUploading:(isUploading) => set({isUploading}),
   setIsDownloading:(isDownloading) => set({isDownloading}),
   setfileUploadProgress:(fileUploadProgress) => set({fileUploadProgress}),
   setfileDownloadProgress:(fileDownloadProgress) => set({fileDownloadProgress}),



    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),
    setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }), // corrected function name
    closeChat: () => set({
        selectedChatType: undefined,
        selectedChatData: undefined,
        selectedChatMessage: [],
    }),
    addMessage: (message) => {
        const selectedChatMessage = get().selectedChatMessage;
        const selectedChatType = get().selectedChatType;
        set({
            selectedChatMessage: [
                ...selectedChatMessage,
                {
                    ...message,
                    recipient:
                        selectedChatType === "channel" ? message.recipient : message.recipient._id,
                    sender:
                        selectedChatType === "channel" ? message.sender : message.sender._id
                }
            ]
        });
    }
});
