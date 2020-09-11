// adding new chat documents
// setting up a real-time listener to get new chats
// update a username
// updateing the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
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
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update ui
                        callback(change.doc.data());
                    }
                });
            });
    }

    updateName(username) {
        this.username = username;
    }

    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if (this.unsub) {
            this.unsub();
        }
    }

}


const chatroom = new Chatroom('java', 'chaw');
// console.log(chatroom);

chatroom.getCharts((data) => {
    console.log(data);
})


setTimeout(() => {
    chatroom.updateRoom('gaming');
    chatroom.getCharts((data) => {
        console.log(data);
    });
    chatroom.addChat('heeeelllllloooooo');
}, 3000);

// chatroom.addChat('Assalamualikum')
//     .then(() => console.log('chat added'))
//     .catch(err => console.log(err));

