window.addEventListener("load", function(){

    var test = this.document.querySelector("#buttons");
    test.addEventListener("click",Log);

    

})

function Log(evt){
  
  evt.preventDefault();
  alert("test");
        
}