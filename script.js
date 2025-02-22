const API_KEY = "68c792c2bc4248c89adf0f9de9b9eac7"; //my api key
const url = "https://newsapi.org/v2/everything?q=";  //base url , according to documentation

window.addEventListener("load", () => fetchNews("India"));  // when website loads , it simply fetch india news

function reload() {              // clicking on logo , making the page reload 
    
    window.location.reload();
}

async function fetchNews(query)   //async function to handle fetch api request 
{    
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);   //it returns a promise also copleting the url
    const data = await res.json(); //response comes in JSON format , to make it readble , json method is called
    bindData(data.articles);    // looking into the json , articles array has all the news related data, so binding it
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");   //news card ka space
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = ""; // empty , if not did , binding data will keep on overwriting again and again

    articles.forEach((article) => {// running for loop in each case of array of articles
        if (!article.urlToImage) return;   // checking if image is present in news , if not return 
        const cardClone = newsCardTemplate.content.cloneNode(true); 
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);// keep cloning the card , till you get the last news
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta", // to change the news in our standard
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {  //when clicking on any news , it reflect to full website
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {     // nav items any tab clciked 
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active"); 
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");  //input search button
const searchText = document.getElementById("search-text"); //inputting text 

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return; // if nothing pressed as searched text
    fetchNews(query);
    curSelectedNav?.classList.remove("active");  // if something selected , removing any tab active class
    curSelectedNav = null;
});



