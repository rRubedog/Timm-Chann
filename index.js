const bBoardID = new Scaledrone('RKfsdDmmQWAB060u');
const muBoardID = new Scaledrone('eod9jEwBJN8RbLSs');

bBoardID.on('open', error => {
if (error) {
    return console.error(error);
}
console.log('Successfully connected to /b/');

const bRoom = bBoardID.subscribe('observable-room', {
    historyCount: 10
});
bRoom.on('open', error => {
    if (error) {
    return console.error(error);
    }
    console.log('Successfully joined /b/');
});
bRoom.on('history_message', message => baddHistory(message));

function baddHistory(message){
    const be = document.querySelector('.b-chats');
    const bdata = message.data;
    const bname = 'Anonymous';
    const bcolor = '#295523';
    // member element
    const bpastMember = document.createElement('div');
    bpastMember.appendChild(document.createTextNode(bname));
    bpastMember.className = 'member';
    bpastMember.style.color = bcolor;
    // message text element
    const bpastMessageData = document.createTextNode(bdata);
    // full message element
    const bpastMessage = document.createElement('div');
    bpastMessage.appendChild(bpastMember);
    bpastMessage.appendChild(bpastMessageData);
    bpastMessage.className = 'message';
    // append
    const wasTop = be.scrollTop === be.scrollHeight - be.clientHeight;
    be.appendChild(bpastMessage);
    if (wasTop) {
        be.scrollTop = be.scrollHeight - be.clientHeight;
    }
}

bRoom.on('data', (text, member) => {
    if (member) {
      baddHistory(message);
    } else {
      // Message is from server
    }
  });
});

muBoardID.on('open', error => {
    if (error) {
        return console.error(error);
    }
    console.log('Successfully connected to /mu/');
    
    const muRoom = muBoardID.subscribe('observable-room', {
        historyCount: 10
    });
    muRoom.on('open', error => {
        if (error) {
        return console.error(error);
        }
        console.log('Successfully joined /mu/');
    });
    muRoom.on('history_message', message => addHistory(message));
    
    function addHistory(message){
        const le = document.querySelector('.mu-chats');
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

    muRoom.on('data', (text, member) => {
        if (member) {
          addHistory(message);
        } else {
          // Message is from server
        }
      });
    });