/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("cart-group").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("cart-group");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


const buttonS = document.querySelector('#size-S')
const buttonM = document.querySelector('#size-M')
const buttonL = document.querySelector('#size-L')

const displaySize = function(){
    document.querySelector('.size-selected').textContent = this.value;
}
buttonS.addEventListener('click', displaySize);
buttonM.addEventListener('click', displaySize);
buttonL.addEventListener('click', displaySize);



