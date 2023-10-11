const boardID = new Scaledrone('RKfsdDmmQWAB060u');

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
  b.on('history_message', message => addHistory(message, bl));

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
  mu.on('history_message', message => addHistory(message, mul));

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
  c.on('history_message', message => addHistory(message, cl));



  function addHistory(message, el){
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

  let membersCount = 0;
// /b/
  b.on('members', m => {
    members = m;
    membersCount += 1;
    document.querySelector('.user').innerText = membersCount + ' users online';
  });

  // b.on('member_join', member => {
  //   members.push(member);
  //   document.querySelector('.user-in-b').innerText = `${members.length} users in /b/`;
  // });

  // b.on('member_leave', ({id}) => {
  //   const index = members.findIndex(member => member.id === id);
  //   members.splice(index, 1);
  //   document.querySelector('.user-in-b').innerText = `${members.length} users in /b/`;
  // });

  // /mu/
  mu.on('members', m => {
    members = m;
    membersCount += 1;
    document.querySelector('.user').innerText = membersCount + ' users online';
  });

  // mu.on('member_join', member => {
  //   members.push(member);
  //   document.querySelector('.user-in-mu').innerText = `${members.length} users in /mu/`;
  // });

  // mu.on('member_leave', ({id}) => {
  //   const index = members.findIndex(member => member.id === id);
  //   members.splice(index, 1);
  //   document.querySelector('.user-in-mu').innerText = `${members.length} users in /mu/`;
  // });

  // /c/
  c.on('members', m => {
    members = m;
    membersCount += 1;
    document.querySelector('.user').innerText = membersCount + ' users online';
  });

  // c.on('member_join', member => {
  //   members.push(member);
  //   document.querySelector('.user-in-c').innerText = `${members.length} users in /c/`;
  // });

  // c.on('member_leave', ({id}) => {
  //   const index = members.findIndex(member => member.id === id);
  //   members.splice(index, 1);
  //   document.querySelector('.user-in-c').innerText = `${members.length} users in /c/`;
  // });
});