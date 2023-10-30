const boardID = new Scaledrone('RKfsdDmmQWAB060u');
let closeNow = 0;
let unsub = 0;
let membersCount = 0;
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

  // /m/
  const m = boardID.subscribe('observable-m', {
    historyCount: 5
  });
  m.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined /m/');
  });
  const ml = document.querySelector('.m-chats');
  m.on('history_message', message => addHistory(message, ml, m, '008080'));

  // BLOG POSTS START------------------
  // one
  const one = boardID.subscribe('observable-/blog/posts/one', {
    historyCount: 5
  });
  one.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined two');
  });
  const ol = document.querySelector('.one-chats');
  one.on('history_message', message => addHistory(message, ol, one, '617140'));

  // two
  const two = boardID.subscribe('observable-/blog/posts/two', {
    historyCount: 5
  });
  two.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined two');
  });
  const tl = document.querySelector('.two-chats');
	two.on('history_message', message => addHistory(message, tl, two, '617140'));

  // three
  const three = boardID.subscribe('observable-/blog/posts/three', {
    historyCount: 5
  });
  three.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined three');
  });
  const trl = document.querySelector('.three-chats');
  three.on('history_message', message => addHistory(message, trl, three, '617140'));

  // four
  const four = boardID.subscribe('observable-/blog/posts/four', {
    historyCount: 5
  });
  four.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined four');
  });
  const fl = document.querySelector('.four-chats');
  four.on('history_message', message => addHistory(message, fl, four, '617140'));

  // five
  const five = boardID.subscribe('observable-/blog/posts/five', {
    historyCount: 5
  });
  five.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined five');
  });
  const fil = document.querySelector('.five-chats');
  five.on('history_message', message => addHistory(message, fil, five, '617140'));

  // BLOG POSTS END--------------------

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
    
    realMemberCount(board);
  }

  function realMemberCount(board){
		board.on('members', m => {
			members = m;
			membersCount += members.length;
			document.querySelector('.side-count').innerText = `${membersCount} users in room`;
      document.querySelector('.members-count-media').innerText = `${membersCount} users in room`;
      
		});
	}

});

boardID.on('close', event => {
  console.log('Connection was closed', event);
});

if(closeNow == 3){
  boardID.close();
}
