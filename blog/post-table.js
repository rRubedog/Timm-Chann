const boardID = new Scaledrone('RKfsdDmmQWAB060u');
let closeNow = 0;
let unsub = 0;
boardID.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to ScaleDrone');
  // two
  const two = boardID.subscribe('observable-two', {
    historyCount: 5
  });
  two.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined two');
  });
  const tl = document.querySelector('.two-chats');
  two.on('history_message', message => addHistory(message, tl, two, 'dc143c'));

  // one
  const one = boardID.subscribe('observable-one', {
    historyCount: 5
  });
  one.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined one');
  });
  const ol = document.querySelector('.one-chats');
  one.on('history_message', message => addHistory(message, ol, one, '008080'));

  function addHistory(message, el, board, boardC){
    const data = message.data;
    const name = 'Anonymous';
    const color = "#" + boardC;
    // member element 
    const pastMember = document.createElement('div');
    pastMember.appendChild(document.createTextNode(name));
    pastMember.className = 'member';
    pastMember.style.color = color;
    // message text element
    const pastMessageData = document.createTextNode(data);
    // full message element
    const pastMessage = document.createElement('div');
    pastMessage.appendChild(pastMember);
    pastMessage.appendChild(pastMessageData);
    pastMessage.className = 'message';
    // append
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(pastMessage);
    if (wasTop) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
    unsub += 1;
    if(unsub == 5){
      board.unsubscribe();
      unsub = 0;
      closeNow += 1;
      membersCount -= 1;
    }
    
    document.querySelector('.user').innerText = membersCount + ' users online';
  }

  let membersCount = 0;

  // two
  two.on('members', m => {
    members = m;
    membersCount += members.length;
    document.querySelector('.user').innerText = membersCount + ' users online';
  });

  // one
  one.on('members', m => {
    members = m;
    membersCount += members.length;
    document.querySelector('.user').innerText = membersCount + ' users online';
  });
});

boardID.on('close', event => {
  console.log('Connection was closed', event);
});

if(closeNow == 3){
  boardID.close();
}
