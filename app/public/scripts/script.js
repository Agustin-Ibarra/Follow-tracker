const body = document.querySelector('body');
const followers = document.querySelector('#followers');
const followed = document.querySelector('#followed');
const unfollowsList = document.querySelector('.unfollow-list');
const clear = document.querySelector('.clear');
const check = document.createElement('span');
const spinner = document.querySelector('.spinner');
const unfollowTitle = document.querySelector('.unfollow-title');
const compareIcon = document.querySelector('.compare-icon');
const error = document.querySelector('.error');
check.setAttribute("class", "material-symbols-outlined");
check.textContent = "check";

const filterList = function (array) {
  const newList = [];
  for (let iter = 0; iter < array.length; iter++) {
    if (/^[a-z0-9._]{1,30}$/.test(array[iter]) === true) {
      if (array[iter].length > 1) {
        if (array[iter] !== array[iter - 1]) {
          newList.push(array[iter]);
        }
      }
    }
  }
  return newList;
}

const generateList = function (followersData, followedData) {
  fetch('/users', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ followers: followersData, followed: followedData })
  })
    .then(async (response) => {
      if (response.status === 200) {
        const unfollows = await response.json();
        unfollowTitle.textContent = `Usuarios que no te siguen ${unfollows.length}`;
        unfollows.forEach(element => {
          const li = document.createElement("li");
          const user = document.createElement("p");
          const copy = document.createElement("p");
          const span = document.createElement("span");
          li.setAttribute("class", "unfollow-item");
          user.setAttribute("class", "username roboto-font");
          copy.setAttribute("class", "copy roboto-font");
          span.setAttribute("class", "material-symbols-outlined copy-icon");
          li.appendChild(user);
          li.appendChild(copy);
          copy.textContent = "Copiar nombre de usuario";
          copy.appendChild(span);
          span.textContent = "content_copy";
          user.textContent = element;
          unfollowsList.appendChild(li);
        });
      }
      else {
        if(response.status == 429){
          error.classList.remove('hidden');
        }
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('finnaly')
      setTimeout(() => {
        compareIcon.textContent = "search";
        spinner.classList.add('hidden');
      }, 500);
      sessionStorage.setItem('seek', true);
    });
}

body.addEventListener("click", (e) => {
  if (e.target.matches('.compare')) {
    if (followers.value && followed.value) {
      compareIcon.textContent = "";
      const allFollweds = followed.value.split('\n');
      const allFollowers = followers.value.split('\n');
      const followersData = filterList(allFollowers);
      const followedData = filterList(allFollweds);
      if (allFollweds.length < 2000 || allFollowers.length < 2000) {
        spinner.classList.remove('hidden');
        const allItems = document.querySelectorAll('.unfollow-item');
        if(allItems){
          allItems.forEach(element => {
            unfollowsList.removeChild(element);
          });
        }
        generateList(followersData, followedData);
        clear.classList.remove('hidden');
      }
      else {
        alert("Tus informacion superan los 1000 usuarios");
      }
    }
  }
  else if (e.target.matches('.copy')) {
    navigator.clipboard.writeText(e.target.parentNode.childNodes[0].textContent);
    e.target.parentNode.childNodes[1].textContent = "Usuario copiado";
    e.target.parentNode.childNodes[1].appendChild(check)
  }
  else if (e.target.matches('.copy-icon')) {
    navigator.clipboard.writeText(e.target.parentNode.parentNode.childNodes[0].textContent);
    const span = e.target.parentNode;
    e.target.parentNode.textContent = "Usuario copiado";
    span.appendChild(check);
  }
  else if (e.target.matches('.clear')) {
    window.location.reload();
  }
  else if(e.target.matches('.close')){
    error.classList.add('hidden');
  }
});

window.addEventListener("load", () => {
  sessionStorage.clear();
  clear.classList.add('hidden');
});