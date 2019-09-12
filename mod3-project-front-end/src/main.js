document.addEventListener('DOMContentLoaded', function() {
//create variables
const enterYourName = document.querySelector('.enter-your-name')
const quizForm = document.querySelector('.quiz-form')
let nameSubmitBtn = document.querySelector('.submit-btn')
let closeBtn = document.querySelector(".close-btn")
let solveQuiz = document.querySelector('.solve-this-quiz')
let qSubmitButton = document.querySelector('.qsubmit-btn')
let appContainer = document.querySelector('main')
const likeBtn = document.querySelector('.like-btn')
const detailsDiv = document.querySelector('.details-div')

//Add EventListener
enterYourName.addEventListener('submit', displayQuizForm)
quizForm.addEventListener('submit', quizSubmitBtn)

//DOM Manipulation
function displayQuizForm(event){ 
  event.preventDefault()
  quizForm.innerHTML = `
  <h1>What paths in NYC do you want to take a walk? Take this quiz!</h1>
  <form class="solve-the-quiz">
    <h3>What would you like as far as difficulty?</h3>
    
  <select name="difficulty">
    <option value="None"> Select </option> 
    <option value="1"> Level 1 </option>
    <option value="2"> Level 2 </option>
    <option value="3"> Level 3 </option>
    <option value="4"> Level 4 </option>
  </select>


    <h3>What kind of surface type do you prefer walking on?</h3>
    <select name="surface_type">
    <option value="None"> Select </option> 
    <option value="Dirt"> Dirt </option>
    <option value="Paved"> Paved </option>
    <option value="Grass"> Grass </option>
    <option value="Boardwalk"> Boardwalk </option>
    <option value="Wood Chips"> Wood Chips </option>

    
  </select>

    <h3>What kind of landform are you looking for?</h3>
    <select name="topography">
    <option value="None"> Select </option> 
    <option value="Sloped"> Sloped </option>
    <option value="Wavy"> Wavy </option>
    <option value="Level"> Level </option>
   
   
    </select>
  <br>
  <br>
    <input type="submit" value="Submit" class="qsubmit-btn">
  </form>
  `
}

function quizSubmitBtn(event){
  event.preventDefault()
  // if(event.target.className === "qsubmit-btn"){
    // debugger
    let difficulty = event.target.difficulty.value
    let surfaceType = event.target.surface_type.value
    let landform = event.target.topography.value
    let dataset = {
      difficulty: difficulty,
      surface_type: surfaceType,
      topography: landform
    }
    getPaths(dataset) 
  // }
} 
    
function pathList(paths) {
  quizForm.innerHTML = ""
      paths.forEach((path, idx) => { 
        let pathDiv = document.createElement('div')
        // pathDetailsDiv.setAttribute('class', 'details-div')
        // pathCard.dataset.id = path.id
        pathDiv.innerHTML = `<data-id=${path.id}>
                              <h2> Path Name: ${path.name}</h2>
                              <h5>Difficulty Level: ${path.difficulty}</h5>
                              <h5> Surface Type: ${path.surface_type} </h5>
                              <h5> Does it have trail markers? ${path.trail_markers} </h5>
                              <h5> Landform: ${path.topography}</h5>
                    
                              <div id="map${idx}" style="width:400px;height:400px;">
                              </div>

                              <button class="like-btn"> Like </button>
                              <button class="delete-btn"> Delete </button> 
                              </div>`
        detailsDiv.append(pathDiv)
        displayMap(path, idx)
        // debugger
      })
}

//talk to a server using a fetch request
function getPaths(dataset) {
   
      fetch('http://localhost:3000/path', {
        method: "POST",
        headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
        body: JSON.stringify(dataset)
      
    }).then(res => res.json())
      .then(pathList)
}
     
//------------like button event listener and fetch---------------  
   
document.addEventListener('click', function() {
  if (event.target.className === "like-btn"){
    alert("You liked this path, glad it was a match 💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚 A few tips to help you on your way: 1. Get a good picture of the scenery 2. Take your dog for a walk, everyone loves dogs 3. Breathe in the fresh air 4. Be in the moment 5. In that moment, take a really good selfie !")

    console.log("")
  }
})


     
  //Slide Images------------------------------------------------------------------------------------------------------

  let slideIndex = 0;
  showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); 
}
 
  
}) //closing of DOMContentLoaded function

//-----------delete button event listener and fetch------------
let detailsDiv = document.querySelector('.details-div')
  detailsDiv.addEventListener('click', function(event) {
    if (event.target.className === "delete-btn") {
      const pathId = event.target.parentNode.dataset.id

      fetch(`http://localhost:3000/paths/${pathId}`, {
        method: 'DELETE'
      })
      event.target.parentNode.remove();

    }
})


//Creating a map for each recommended path
function displayMap(path, divId) {
    let uluru = {lat: parseFloat(path.latitude), lng: parseFloat(path.longitude)}; 
    let mapProp= {
      center: new google.maps.LatLng(parseFloat(path.latitude), parseFloat(path.longitude)),
      zoom: 10,
    };
    let map = new google.maps.Map(document.getElementById(`map${divId}`), mapProp);
    let marker = new google.maps.Marker({position: uluru, map: map})
}