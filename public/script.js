
var input= document.getElementById('hr_file');
input.addEventListener('change', function(){
   
    readXlsxFile(input.files[0]).then(function(data){
       
        for(let i=0;i<data.length;i++){
          let tr=document.createElement('tr');
          let td=document.createElement('td');
          let td1=document.createElement('td');
   
        let x= getFirstName(data[i])
      //  console.log(x[0].name)
      //  console.log(x[0].email)
          td.textContent=x[0].name;
          td1.textContent=x[0].email;
          tr.appendChild(td);
          tr.appendChild(td1);
          document.getElementById('mail-list').appendChild(tr)
        }
      
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
  