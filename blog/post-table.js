const blogID = new Scaledrone('RKfsdDmmQWAB060u');
let closePostNow = 0;
let unsubPost = 0;
blogID.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to ScaleDrone');
  // two
  const two = boardID.subscribe('observable-/blog/posts/first-blog-post', {
    historyCount: 5
  });
  two.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined two');
  });
  const tl = document.querySelector('.two-chats');
  two.on('history_message', message => addHistory(message, tl, two));

  // one
  const one = boardID.subscribe('observable-/blog/posts/solar-eclipse', {
    historyCount: 5
  });
  one.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined one');
  });
  const ol = document.querySelector('.one-chats');
  one.on('history_message', message => addHistory(message, ol, one));

  function addHistory(message, el, board){
    const data = message.data;
    const name = 'Anonymous';
    const color = "#617140";
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
    unsubPost += 1;
    if(unsubPost == 5){
      board.unsubscribe();
      unsubPost = 0;
      closePostNow += 1;
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

blogID.on('close', event => {
  console.log('Connection was closed', event);
});

if(closePostNow == 3){
  blogID.close();
}
