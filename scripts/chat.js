// adding new chat documents
// setting up a real-time listener to get new chats
// update a username
// updateing the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message) {
        // formate a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document
        const response = await this.chats.add(chat);
        return response;
    }
    getCharts(callback) {
        this.chats
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update ui
                        callback(change.doc.data());
                    }
                });
            });
    }
}


const chatroom = new Chatroom('gaming', 'chaw');
// console.log(chatroom);

chatroom.getCharts((data) => {
    console.log(data);
})

// chatroom.addChat('Assalamualikum')
//     .then(() => console.log('chat added'))
//     .catch(err => console.log(err));

