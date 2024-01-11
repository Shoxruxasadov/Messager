let currentUserId = 0;
const users = [
  {
    id: 0, //New
    nickname: "Elon",
    message: "How are you",
    unreadMessage: 0,
    date: "14 feb",
    isActive: true, //New
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2QAPoAnNcdHFQBF6tawgUJ79iJatz34bFZpheIKMu6X6wdpnmBrS0paHUz1GZGkNzWkA&usqp=CAU",
    chat: [
      //New
      {
        id: 0,
        role: "me",
        message: "Hello",
      },
      {
        id: 1,
        role: "me",
        message: "What you name bro",
      },
      {
        id: 2,
        role: "he",
        message: "Elon",
      },
      {
        id: 3,
        role: "he",
        message: "How are you",
      },
    ],
  },
  {
    id: 1, //New
    nickname: "Anna",
    message: "How are you",
    unreadMessage: 34,
    date: "14 feb",
    isActive: false, //New
    icon: "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png",
    chat: [
      // New
      {
        id: 0,
        role: "he",
        message: "How are you",
      },
    ],
  },
  {
    id: 2, //New
    nickname: "Jef Bezos",
    message: "How are you",
    unreadMessage: 42,
    date: "14 feb",
    isActive: true, //New
    icon: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    chat: [
      // New
      {
        id: 0,
        role: "he",
        message: "How are you",
      },
    ],
  },
  {
    id: 3, //New
    nickname: "Palonchi",
    message: "nima qilay xay",
    unreadMessage: 999,
    date: "09:18",
    isActive: false, //New
    icon: "https://i.pinimg.com/474x/32/3b/c2/323bc2e28f35a760b8d7afe48f3ffe48.jpg",
    chat: [
      // New
      {
        id: 0,
        role: "he",
        message: "Man o'zbekman o'zimga bekman",
      },
      {
        id: 1,
        role: "me",
        message: "nima qilay xay",
      },
    ],
  },
];

const layout = `
<div class="profile-info">
  <div class="image-container">
    <div class="avatar"></div>
    <div class="user-info">
      <h6 class="user-nickname">Elon</h6>
      <p class="message-review">How are you?</p>
      <p class="message-reply-review">Okey</p>
    </div>
  </div>
  <div class="indicator">
    <h6 class="date">Fri</h6>
    <div class="unread-message-count">2</div>
  </div>
</div>`;

// users.forEach((item) => {
//   const user = document.createElement("div");
//   userList.appendChild(user);
//   user.innerHTML = `<div class="profile-info" onclick="openUser(${
//     item.nickname
//   })">
//     <div class="image-container">
//       <div class="image">
//         <img class="avatar" src="${item.icon}" alt="avatar" />
//         ${item.isActive ? `<div class="online"></div>` : ""}
//       </div>
//       <div class="user-info">
//         <h6 class="user-nickname">${item.nickname}</h6>
//         <p class="message-review">${item.message}</p>
//       </div>
//     </div>
//     <div class="indicator">
//       <h6 class="date">${item.date}</h6>
//       ${
//         item.unreadMessage > 0
//           ? `<div class="unread-message-count">New</div>`
//           : ""
//       }
//     </div>
//   </div>`;
// });

//

drawUsers();
function drawUsers() {
  let s = ``;
  for (const item of users) {
    s += `<div class="profile-info" onclick="openUser(${item.id})">
  <div class="image-container">
    <div class="image">
      <img class="avatar" src="${item.icon}" alt="avatar" />
      ${item.isActive ? `<div class="online"></div>` : ""}
    </div>
    <div class="user-info">
      <h6 class="user-nickname">${item.nickname}</h6>
      <p class="message-review">${item.chat[item.chat.length - 1].message}</p>
    </div>
  </div>
  <div class="indicator">
    <p class="date">${item.date}</p>
    ${
      item.unreadMessage > 0
        ? `<div class="unread-message-count">New</div>`
        : ""
    }
  </div>
</div>`;
  }
  document.querySelector(".user-list").innerHTML = s;
}

openUser(0);

function openUser(id) {
  document.getElementById(
    "is-online"
  ).innerText = `was online on ${users[id].date}`;
  document.getElementById("nickname").innerText = users[id].nickname;
  document.getElementById("avatar").src = users[id].icon;
  currentUserId = id;
  users[id].isActive
    ? document.getElementById("online-right-side").classList.add("active")
    : document.getElementById("online-right-side").classList.remove("active");

  let s = ``;
  for (const item of users[currentUserId].chat) {
    s += `
    <div class="messages ${item.role == "me" ? "me" : "he"}">
      <div class="avatar">
        <img src="${
          item.role == "me"
            ? "https://avatars.githubusercontent.com/u/129892167?v=4"
            : users[currentUserId].icon
        }" alt="avatar" />
      </div>
      <div class="message">
        <p>${item.message}</p>
      </div>
    
    </div>
    `;
  }
  document.getElementById("chat").innerHTML = s;
  document
    .getElementById("chat")
    .scrollTo(0, document.getElementById("chat").scrollHeight);
}

const enterPress = (event) => event.key == "Enter" && send();
let stoped = true; // new
const send = () => {
  if (document.getElementById("message-input").value != "") {
    users[currentUserId].chat.push({
      id: users[currentUserId].chat.length,
      role: "me",
      message: document.getElementById("message-input").value,
    });
    openUser(currentUserId);
    drawUsers();
    document.getElementById("message-input").value = "";

    // Shunchaki yozilgan !!
    if (
      users[currentUserId].chat[users[currentUserId].chat.length - 1].role ==
        "me" &&
      users[currentUserId].isActive &&
      stoped
    ) {
      stoped = false;
      setTimeout(() => {
        document.getElementById("is-online").innerText = "Typing...";
        setTimeout(() => {
          users[currentUserId].chat.push({
            id: users[currentUserId].chat.length,
            role: "he",
            message: "yes bro",
          });
          stoped = true;
          openUser(currentUserId);
          drawUsers();
        }, 2000);
      }, 2000);
    }
    // Shunchaki yozilgan !!
  }
};
