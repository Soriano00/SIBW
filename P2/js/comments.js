const USERID = {
    name: null,
    email: null,
    identity: null,
    image: null,
    message: null,
    date: null
}


const palabrasProhibidas = [
    'mierda', 'puta', 'tonto', 'estafa', 'bbbb', 'cccc', 'dddd' , 'eee', 'fff'
 ]


const userComment = document.querySelector(".usercomment");
const publishBtn = document.querySelector("#publish");
const comments = document.querySelector(".comments");
const userName = document.querySelector(".user");
const userEmail = document.querySelector(".email");
const notify = document.querySelector(".notifyinput");

    userComment.addEventListener("input", e => {
        if(!userComment.value) {
            publishBtn.setAttribute("disabled", "disabled");
            publishBtn.classList.remove("abled")
        }else {
            publishBtn.removeAttribute("disabled");
            publishBtn.classList.add("abled")
        }
    })

    function addPost() {
        if(!userComment.value) return;
        USERID.name = userName.value;
        if(USERID.name === "Anonymous") {
            USERID.identity = false;
            USERID.email =  "Email anónimo";
            USERID.image = "./images/anonymous.png"
        }else {
            USERID.identity = true;
            USERID.image = "./images/user.png"
        }

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (USERID.name != "Anonymous" && userEmail.value.match(mailformat)) {
            USERID.email = userEmail.value;
          
        }
        else if(USERID.name != "Anonymous" && !userEmail.value.match(mailformat)) {
            alert("You have entered an invalid email address!");
            document.form1.text1.focus();
            return false;
        }


        USERID.message = userComment.value;
       
        const validarComentario = () => {
            const comentario = userComment.value;
            const palabras = comentario.split(" ");
        
            const noValida = palabras.map(
                palabra => (palabrasProhibidas.includes(palabra))
                        ? palabra.replaceAll (/./g, '*')
                        : palabra
            )
        
            userComment.value = noValida.join(" ");
        
         }
        
        
         userComment.onchange = validarComentario;
         userComment.onkeyup = validarComentario;
        
        
        


        USERID.date = new Date().toLocaleString();
        let published = 
        `<div class="parents">
            <img src="${USERID.image}">
            <div>
                <h1>${USERID.name}</h1>
                <h3>${USERID.email}</h3>
                <p>${USERID.message}</p>
                <div class="engagements"><img src="./images/like.png" id="like"><img src="./images/share.png" alt=""></div>
                <span class="date">${USERID.date}</span>
            </div>    
        </div>`

        comments.innerHTML += published;
        userComment.value = "";
        publishBtn.classList.remove("abled")

        let commentsNum = document.querySelectorAll(".parents").length;
        document.getElementById("comment").textContent = commentsNum;

    }

    publishBtn.addEventListener("click", addPost);
