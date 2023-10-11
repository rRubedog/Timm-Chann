const boardID = new Scaledrone('RKfsdDmmQWAB060u');
let closeNow = 0;
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
  b.on('history_message', message => addHistory(message, bl, b));

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
  mu.on('history_message', message => addHistory(message, mul, mu));

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
  c.on('history_message', message => addHistory(message, cl, c));

  function addHistory(message, el, board){
    const data = message.data;
    const name = 'Anonymous';
    const color = '#295523';
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
    board.unsubscribe();
    closeNow += 1;
  }

  let membersCount = 0;

  // /b/
  b.on('members', m => {
    members = m;
    membersCount += members.length;
    document.querySelector('.user').innerText = membersCount + ' total users online';
  });

  b.on('member_join', member => {
    members.push(member);
    membersCount += 1;
    document.querySelector('.user').innerText = membersCount + ' total users online';
  });

  b.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    membersCount -= 1;
    document.querySelector('.user').innerText = membersCount + ' total users online';
  });

  // /mu/
  mu.on('members', m => {
    members = m;
    membersCount += members.length;
    document.querySelector('.user').innerText = membersCount + ' total users online';
  });

  mu.on('member_join', member => {
    members.push(member);
    membersCount += 1;
    document.querySelector('.user').innerText = membersCount + ' total users online';
  });

  mu.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    membersCount -= 1;
    document.querySelector('.user').innerText = membersCount + ' total users online';
  });

  // /c/
  c.on('members', m => {
    members = m;
    membersCount += members.length;
    document.querySelector('.user').innerText = membersCount + ' total users online';
  });

  c.on('member_join', member => {
    members.push(member);
    membersCount += 1;
    document.querySelector('.user').innerText = membersCount + ' total users online';
  });

  c.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    membersCount -= 1;
    document.querySelector('.user').innerText = membersCount + ' total users online';
  });
});

boardID.on('close', event => {
  console.log('Connection was closed', event);
});

if(closeNow == 3){
  boardID.close();
}
