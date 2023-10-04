const bBoardID = new Scaledrone('RKfsdDmmQWAB060u');
const muBoardID = new Scaledrone('eod9jEwBJN8RbLSs');

bBoardID.on('open', error => {
if (error) {
    return console.error(error);
}
console.log('Successfully connected to /b/');

const bRoom = bBoardID.subscribe('observable-room', {
    historyCount: 20
});
bRoom.on('open', error => {
    if (error) {
    return console.error(error);
    }
    console.log('Successfully joined /b/');
});
bRoom.on('history_message', message => addHistory(message));

function addHistory(message){
    const le = document.querySelector('.all-chats');
    const hdata = message.data;
    const name = 'Anonymous';
    const color = '#295523';
    // member element
    const pastMember = document.createElement('div');
    pastMember.appendChild(document.createTextNode(name));
    pastMember.className = 'member';
    pastMember.style.color = color;
    // message text element
    const pastMessageData = document.createTextNode(hdata);
    // full message element
    const pastMessage = document.createElement('div');
    pastMessage.appendChild(pastMember);
    pastMessage.appendChild(pastMessageData);
    pastMessage.className = 'message';
    // append
    const wasTop = le.scrollTop === le.scrollHeight - le.clientHeight;
    le.appendChild(pastMessage);
    if (wasTop) {
        le.scrollTop = le.scrollHeight - le.clientHeight;
    }
}
});

muBoardID.on('open', error => {
    if (error) {
        return console.error(error);
    }
    console.log('Successfully connected to /mu/');
    
    const muRoom = bBoardID.subscribe('observable-room', {
        historyCount: 20
    });
    muRoom.on('open', error => {
        if (error) {
        return console.error(error);
        }
        console.log('Successfully joined /mu/');
    });
    muRoom.on('history_message', message => addHistory(message));
    
    function addHistory(message){
        const le = document.querySelector('.all-chats');
        const hdata = message.data;
        const name = 'Anonymous';
        const color = '#295523';
        // member element
        const pastMember = document.createElement('div');
        pastMember.appendChild(document.createTextNode(name));
        pastMember.className = 'member';
        pastMember.style.color = color;
        // message text element
        const pastMessageData = document.createTextNode(hdata);
        // full message element
        const pastMessage = document.createElement('div');
        pastMessage.appendChild(pastMember);
        pastMessage.appendChild(pastMessageData);
        pastMessage.className = 'message';
        // append
        const wasTop = le.scrollTop === le.scrollHeight - le.clientHeight;
        le.appendChild(pastMessage);
        if (wasTop) {
            le.scrollTop = le.scrollHeight - le.clientHeight;
        }
    }
    });