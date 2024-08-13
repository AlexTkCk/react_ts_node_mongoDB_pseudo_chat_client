type TChat = {
    _id: string;
    clientId: string;
    botName: string;
    botSurName: string;
    botAvatarUrl: string;
};

type TMessage = {
    _id: string;
    text: string;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
    chatId: string;
}
