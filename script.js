const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Loading spinner
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Remove showLoadingSpinner spinner
function complete(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

//Get quotes from API
async function getQuotes() {
    showLoadingSpinner();
     const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
   
     try {
       const response = await fetch(apiURL);
       apiQuotes = await response.json();
       newQuote();
     } catch (error) {
       //Catch Error Here
     }
   }


//Show new quote
function newQuote() {
  //Pick random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if author field is null and replace it with Anonymous
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //Check quote length for style
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
 //Set Quote Hide Loader
  quoteText.textContent = quote.text;
  complete();
}


//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}(`;
  window.open(twitterUrl, '_blank');  
}

newQuoteBtn.addEventListener("click", newQuote)
twitterBtn.addEventListener('click',tweetQuote);

//On load
getQuotes(); 
