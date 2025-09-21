const { Router } = require("express");

const chatRouter = Router();

// Create a new chat (DM or group)
chatRouter.post("/chats", (req, res) => {
    res.json({
        message: "Create a new chat (DM or Group)"
    });
});

// Get all chats of the logged-in user
chatRouter.get("/chats", (req, res) => {
    res.json({
        message: "Fetch all chats for the user"
    });
});

// Get all messages in a chat
chatRouter.get("/chats/:chatId/messages", (req, res) => {
    res.json({
        message: `Fetch messages for chatId ${req.params.chatId}`
    });
});

// Send a message in a chat
chatRouter.post("/chats/:chatId/messages", (req, res) => {
    res.json({
        message: `Send message to chatId ${req.params.chatId}`
    });
});

// Delete a message from a chat
chatRouter.delete("/chats/:chatId/messages/:messageId", (req, res) => {
    res.json({
        message: `Delete message ${req.params.messageId} from chatId ${req.params.chatId}`
    });
});

// Mark messages as read
chatRouter.put("/chats/:chatId/read", (req, res) => {
    res.json({
        message: `Mark messages as read in chatId ${req.params.chatId}`
    });
});

// Add a user to a group chat
chatRouter.put("/chats/:chatId/members", (req, res) => {
    res.json({
        message: `Add members to chatId ${req.params.chatId}`
    });
});

// Remove a user from a group chat
chatRouter.delete("/chats/:chatId/members/:userId", (req, res) => {
    res.json({
        message: `Remove user ${req.params.userId} from chatId ${req.params.chatId}`
    });
});

module.exports = { chatRouter };
