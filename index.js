const boardID = new Scaledrone('RKfsdDmmQWAB060u');

boardID.on('open', error => {
if (error) {
    return console.error(error);
}
console.log('Successfully connected to /b/');
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
b.on('history_message', message => baddHistory(message, 'b'));

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
mu.on('history_message', message => baddHistory(message, 'mu'));

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
c.on('history_message', message => baddHistory(message, 'c'));



function addHistory(message, board){
  const el = document.querySelector('.'+board+'-chats');
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
}

// /b/
  b.on('members', m => {
    members = m;
    document.querySelector('.user-in-b').innerText = `${members.length} users in /b/`;
  });

  b.on('member_join', member => {
    members.push(member);
    document.querySelector('.user-in-b').innerText = `${members.length} users in /b/`;
  });

  b.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    document.querySelector('.user-in-b').innerText = `${members.length} users in /b/`;
  });

  // /mu/
  mu.on('members', m => {
    members = m;
    document.querySelector('.user-in-mu').innerText = `${members.length} users in /mu/`;
  });

  mu.on('member_join', member => {
    members.push(member);
    document.querySelector('.user-in-mu').innerText = `${members.length} users in /mu/`;
  });

  mu.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    document.querySelector('.user-in-mu').innerText = `${members.length} users in /mu/`;
  });

  // /c/
  c.on('members', m => {
    members = m;
    document.querySelector('.user-in-c').innerText = `${members.length} users in /c/`;
  });

  c.on('member_join', member => {
    members.push(member);
    document.querySelector('.user-in-c').innerText = `${members.length} users in /c/`;
  });

  c.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    document.querySelector('.user-in-c').innerText = `${members.length} users in /c/`;
  });
});