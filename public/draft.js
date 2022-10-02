var input= document.getElementById('hr_file');
var arra={};
input.addEventListener('change', () => {
  readXlsxFile(input.files[0]).then((data) => {
    for(let i=0;i<data.length;i++){
      let tr=document.createElement('tr');
      let td=document.createElement('td');
      let td1=document.createElement('td');
      let td2=document.createElement('td');
      td2.id='edit';
    let x= getFirstName(data[i])
 //creating  object for sendind api
      td.textContent=capitalize(x[0].name);
      td.id='name_hr';
      td1.textContent=x[0].email;
      td2.innerHTML="Update"
      tr.appendChild(td);
      tr.appendChild(td1);
      tr.appendChild(td2);
      arra[x[0].name]=x[0].email
      document.getElementById('mail-list').appendChild(tr)
      td2.addEventListener('click',editing);
      function editing(){
         
       let  input_field=document.createElement('input')
       input_field.type='text';
       input_field.id='input-field';
       input_field.value=capitalize(x[0].name);
       var old_key=x[0].name;
        td.innerHTML=`<input type="text" value="${capitalize(x[0].name)}" id="${capitalize(x[0].name)}">`
    }}
  })
})
document.getElementById('submit-btn').addEventListener('click',update_main);
function update_main(){
  
}
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

