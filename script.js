let searchbtn = document.querySelector(".search")
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".Card");


function getProfileData(username){
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {

        if(!raw.ok) throw new Error("User not found");
        return raw.json();
    })
}


function getRepos(username){

  return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw)=>{
    if(!raw.ok) throw new Error("Repos not found");
    return raw.json();
  })
}


function decorateProfiledata(details){

    console.log(details);
    
   let data = ` <div id="user-data" class="space-y-4">
                  <img src="${details.avatar_url}" alt="Profile" class="w-20 h-20 rounded-full border-2 border-indigo-600 shadow">
                   <div class="flex items-center space-x-4">
                   <div>
                        <h2 class="text-2xl font-bold text-white">${details.name}</h2>
                        <p class="text-indigo-300">${details.login}</p>
                        <p class="text-gray-400">${details.bio ? details.bio : ""}</p>
                        <a href="${details.html_url}" target="_blank" class="text-blue-400 hover:underline text-sm">${details.html_url.replace('https://','')}</a>
                    </div>
                </div>
                <div class="flex justify-between text-center gap-2">
                    <div class="bg-indigo-900 p-3 rounded-lg w-1/3">
                        <h3 class="font-medium text-indigo-300">Repos</h3>
                        <p class="text-indigo-400 font-bold">${details.public_repos}</p>
                    </div>
                    <div class="bg-indigo-900 p-3 rounded-lg w-1/3">
                        <h3 class="font-medium text-indigo-300">Followers</h3>
                        <p class="text-indigo-400 font-bold">${details.followers}</p>
                    </div>
                    <div class="bg-indigo-900 p-3 rounded-lg w-1/3">
                        <h3 class="font-medium text-indigo-300">Following</h3>
                        <p class="text-indigo-400 font-bold">${details.following}</p>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 mt-4">
                    <div class="flex flex-col items-start mr-6">
                        <span class="text-xs text-indigo-400 font-semibold uppercase tracking-wide mb-1">Location</span>
                        <div class="flex items-center gap-2 text-indigo-200 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1011.314-11.314l-4.243 4.243a4 4 0 00-5.657 5.657z" /></svg>
                            <span>${details.location || 'Not Available'}</span>
                        </div>
                    </div>
                    <div class="flex flex-col items-start mr-6">
                        <span class="text-xs text-indigo-400 font-semibold uppercase tracking-wide mb-1">Company</span>
                        <div class="flex items-center gap-2 text-indigo-200 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 01-8 0M12 14v7m0 0H9m3 0h3" /></svg>
                            <span>${details.company || 'Not Available'}</span>
                        </div>
                    </div>
                    <div class="flex flex-col items-start">
                        <span class="text-xs text-indigo-400 font-semibold uppercase tracking-wide mb-1">Blog</span>
                        <div class="flex items-center gap-2 text-indigo-200 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v7" /></svg>
                            <a href="${details.blog ? details.blog : '#'}" target="_blank" class="hover:underline">${details.blog ? details.blog.replace(/^https?:\/\//, '') : 'Not Available'}</a>
                        </div>
                    </div>
                </div>
            </div>`;

card.innerHTML = data;
}



searchbtn.addEventListener("click",function(){
   let  username  = usernameinp.value.trim();
   if(username.length > 0){
     getProfileData(username).then((data) =>{
        decorateProfiledata(data);
     })
   }else{
    alert(); 
   }
})