var  arra={};//THIS is storing  data in object
let name_input= document.getElementById('name_input').value

var input= document.getElementById('hr_file');
input.addEventListener('change', function(){ 
    readXlsxFile(input.files[0]).then(function(data){
      
        for(let i=0;i<data.length;i++){
          let tr=document.createElement('tr');
          let td=document.createElement('td');
          let td1=document.createElement('td');
          let td2=document.createElement('td');
          td2.id='edit';
        let x= getFirstName(data[i])
     //creating  object for sendind api
          td.textContent=capitalize(x[0].name);
          td1.textContent=x[0].email;
          td2.innerHTML="Update"
          tr.appendChild(td);
          tr.appendChild(td1);
          tr.appendChild(td2);
          arra[x[0].name]=x[0].email
                   td2.addEventListener('click',editing);
function editing(){
    td2.remove()
 let  input_field=document.createElement('input')
 input_field.type='text';
 input_field.id='input-field';
 input_field.value=capitalize(x[0].name);
 var old_key=x[0].name;
  td.innerHTML=`<input type="text" value="${capitalize(x[0].name)}" id="${capitalize(x[0].name)}">`
  document.getElementById('submit-btn').addEventListener('click',update_main);
  function update_main(){
    console.log(document.getElementById(input_field.value).value);
    x[0].name=document.getElementById(input_field.value).value;
  let xx=x[0].name
  let source={}
  source[xx]=x[0].email
  let updated_array=Object.assign(arra,source)
  delete updated_array[old_key];

//creating Preview
  document.getElementById('name_entered').innerHTML="Name: "+document.getElementById('name_input').value
  for (let [key, value] of Object.entries(updated_array)) {
let trElem=document.createElement('tr');
let tdElem=document.createElement('td');
let tdElem1=document.createElement('td');
tdElem.innerText=(key);
tdElem1.innerText=(value);

trElem.append(tdElem);
trElem.append(tdElem1);
   document.getElementById('hr_names').append(trElem);}
 //api generate
 
  function postData(){
    var url='http://127.0.0.1:3000/hr_data';
   var data=`${JSON.stringify(updated_array)}`;
  var params={
       method:"post",
       headers:{
           'Content-type':'application/json'

       },
       body:data
   }
   fetch(url,params).then(response=>response.json()).then(data=>console.log(data))
 }
 postData();

console.log("46",updated_array)
//  arra[xx] =document.getElementById(input_field.value).value;
  }
}
     document.getElementById('mail-list').appendChild(tr)
        }
        console.log("SK46",arra)
    });
});
function getFirstName(arr) {
    let nameArr = [];
    const filterlist = ["hr", "business", "jobs", "info", "resumes", "resume"];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0].match(/[0-9]/)) {
        nameArr.push({ name: "Team", email: arr[i] });
        continue;
      }
      let result = arr[i].match(/^[a-zA-Z]+/g)[0];
  
      if (filterlist.includes(result)) {
        nameArr.push({ name: "Team", email: arr[i] });
      } else {
        nameArr.push({ name: result, email: arr[i] });
      }
    }
    return nameArr;
  }
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("submit-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

