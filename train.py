from assistant import ChatBotAssistant

if __name__ == "__main__":
    assistant = ChatBotAssistant('intents.json')
    assistant.parse_intents()
    assistant.prepare_data()
    assistant.train_model(batch_size=8, lr=0.001, epochs=100)
    assistant.save_model('my_chatbot_model.pth', 'dimensions.json')