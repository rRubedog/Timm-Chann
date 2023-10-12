const boardID = new Scaledrone('RKfsdDmmQWAB060u');
let closeNow = 0;
let unsub = 0;
boardID.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to ScaleDrone');
  // /b/
  const b = boardID.subscribe('observable-b', {
    historyCount: 5
  });
  b.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined /b/');
  });
  const bl = document.querySelector('.b-chats');
  b.on('history_message', message => addHistory(message, bl, b, '0000ff'));

  // /mu/
  const mu = boardID.subscribe('observable-mu', {
    historyCount: 5
  });
  mu.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined /mu/');
  });
  const mul = document.querySelector('.mu-chats');
  mu.on('history_message', message => addHistory(message, mul, mu, '800080'));

  // /c/
  const c = boardID.subscribe('observable-c', {
    historyCount: 5
  });
  c.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined /c/');
  });
  const cl = document.querySelector('.c-chats');
  c.on('history_message', message => addHistory(message, cl, c, 'dc143c'));

  function addHistory(message, el, board, boardC){
    const data = message.data;
    const name = 'Anonymous';
    const boardC = "#" + boardC;
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

  // /b/
  b.on('members', m => {
    members = m;
    membersCount += members.length;
    document.querySelector('.user').innerText = membersCount + ' users online';
  });

  // /mu/
  mu.on('members', m => {
    members = m;
    membersCount += members.length;
    document.querySelector('.user').innerText = membersCount + ' users online';
  });

  // /c/
  c.on('members', m => {
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
