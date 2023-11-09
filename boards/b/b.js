const CLIENT_ID = 'RKfsdDmmQWAB060u';

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getName(),
    color: getColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to /b/');
 
  const room = drone.subscribe('observable-b', {
    historyCount: 100
  }); 
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined /b/');
  });
  room.on('history_message', message => addHistory(message));

  function addHistory(message){
    const le = DOM.messages;
    const hdata = message.data;
    
    const name = 'Anonymous';
    const color = '#0000ff';
    // member element
    const pastMember = document.createElement('div');
    pastMember.appendChild(document.createTextNode(name));
    pastMember.className = 'member';
    pastMember.style.color = color;
    // message text element
    const pastMessageData = document.createTextNode(hdata);
    const pastMessage = document.createElement('div');

    let imgInput =  document.querySelector('.image-form__input').value;
    let txtInput = document.querySelector('.message-form__input').value;
    if(imgInput != '' && txtInput === ''){
      const pastImg = document.createElement('img');
      pastImg.src = hdata;
      // full message element
      
      pastMessage.appendChild(pastMember);
      pastMessage.appendChild(pastImg);
      // pastMessage.appendChild(pastMessageData);
      pastMessage.className = 'message';
    }else{
      pastMessage.appendChild(pastMember);
      // pastMessage.appendChild(pastImg);
      pastMessage.appendChild(pastMessageData);
      pastMessage.className = 'message';
    }
  
    // append
    const wasTop = le.scrollTop === le.scrollHeight - le.clientHeight;
    le.appendChild(pastMessage);
    if (wasTop) {
        le.scrollTop = le.scrollHeight - le.clientHeight;
    }
  }

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getName() {
  const username = 'Anonymous'
  return (
    username
  );
  updateMembersDOM();
}

function getColor() {
  return '#0000ff';
}
// #295523
//------------- DOM STUFF



const DOM = {
  // membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  image: document.querySelector('.image-forum__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const imgValue = DOM.image.value;
  const value = DOM.input.value;
  if (value === '' && imgValue === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-b',
    message: value,
    image: imgValue,
  });
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  document.querySelector('.side-count').innerText = `${members.length} users in room`;
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}
