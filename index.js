const bBoardID = new Scaledrone('RKfsdDmmQWAB060u');
const muBoardID = new Scaledrone('eod9jEwBJN8RbLSs');
const cBoardID = new Scaledrone('LPbi9lDX1ZO1LQRj');

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

bRoom.on('members', m => {
    members = m;
    document.querySelector('.user-in-b').innerText = `${members.length} users in /b/`;
  });

  bRoom.on('member_join', member => {
    members.push(member);
    document.querySelector('.user-in-b').innerText = `${members.length} users in /b/`;
  });

  bRoom.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    document.querySelector('.user-in-b').innerText = `${members.length} users in /b/`;
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

muRoom.on('members', m => {
    members = m;
    document.querySelector('.user-in-mu').innerText = `${members.length} users in /mu/`;
  });

  muRoom.on('member_join', member => {
    members.push(member);
    document.querySelector('.user-in-mu').innerText = `${members.length} users in /mu/`;
  });

  muRoom.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    document.querySelector('.user-in-mu').innerText = `${members.length} users in /mu/`;
  });
});

cBoardID.on('open', error => {
  if (error) {
      return console.error(error);
  }
  console.log('Successfully connected to /b/');
  
  const cRoom = cBoardID.subscribe('observable-room', {
      historyCount: 10
  });
  cRoom.on('open', error => {
      if (error) {
      return console.error(error);
      }
      console.log('Successfully joined /b/');
  });
  cRoom.on('history_message', message => baddHistory(message));
  
  function baddHistory(message){
      const ce = document.querySelector('.b-chats');
      const cdata = message.data;
      const cname = 'Anonymous';
      const ccolor = '#295523';
      // member element 
      const cpastMember = document.createElement('div');
      cpastMember.appendChild(document.createTextNode(cname));
      cpastMember.className = 'member';
      cpastMember.style.color = ccolor;
      // message text element
      const cpastMessageData = document.createTextNode(cdata);
      // full message element
      const cpastMessage = document.createElement('div');
      cpastMessage.appendChild(cpastMember);
      cpastMessage.appendChild(cpastMessageData);
      cpastMessage.className = 'message';
      // append
      const wasTop = ce.scrollTop === ce.scrollHeight - ce.clientHeight;
      ce.appendChild(cpastMessage);
      if (wasTop) {
          ce.scrollTop = ce.scrollHeight - ce.clientHeight;
      }
  }
  
  cRoom.on('members', m => {
    members = m;
    document.querySelector('.user-in-c').innerText = `${members.length} users in /c/`;
  });

  cRoom.on('member_join', member => {
    members.push(member);
    document.querySelector('.user-in-c').innerText = `${members.length} users in /c/`;
  });

  cRoom.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    document.querySelector('.user-in-c').innerText = `${members.length} users in /c/`;
  });
});