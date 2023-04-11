// adding a new bookmark row to the popup
import { getActiveTabURL } from './utils.js'

const addNewBookmark = (bookmark, bookmarksElement) => {
   const bookmarksTitleElement= document.createElement("div");
   const newBookmarkElement = document.createElement("div");

   bookmarksTitleElement.textContent = bookmark.desc;
   bookmarksTitleElement.className= "bookmark-title";

   newBookmarkElement.id="bookmark-"+bookmark.time;
   newBookmarkElement.className = "bookmark";
   newBookmarkElement.setAttribute("timestamp", bookmark.time)

   newBookmarkElement.appendChild(bookmarksTitleElement);

   bookmarksElement.appendChild(newBookmarkElement)
};

const viewBookmarks = (currentBookmarks=[]) => {
    const bookmarksElement = document.getElementById('bookmarks');
    bookmarksElement.innerHTML="";

    if(currentBookmarks.length>0){
        console.log(currentBookmarks)
        currentBookmarks.map(bookmark => {
            addNewBookmark(bookmark, bookmarksElement);
        })
    } else{
        bookmarksElement.innerHTML='<i class="row">No bookmarks to show</i>';
    }


};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {
    console.log("loaded")
    const activeTab= await getActiveTabURL();
    const queryParams = activeTab.url.split("?")[1];

    const urlParams = new URLSearchParams(queryParams);

    const currentVideo = urlParams.get("v");

    if(activeTab.url.includes("youtube.com/watch") && currentVideo){
        chrome.storage.sync.get([currentVideo], (data)=>{
            console.log([currentVideo],currentVideo,data,data[currentVideo])
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];
        
            viewBookmarks(currentVideoBookmarks)
        })
    }
    else{
        let container = document.getElementsByClassName('container')[0];
        container.innerHTML='<div class="title">This is not a youtube page.<\div>'
    }

});
