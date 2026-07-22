//  Dom  Document object model  (OOR)  object orianted representation 

//   var x = document.getElementById("title1")

//   console.log(x.innerText)
//   console.log(x.textContent)
 
//   x.innerText = "ziad mohamed"

//   x.textContent = "eman ahmed"

// //      console.log(x.innerText)
// //      console.log(x.textContent)

//   x.style.color = "red"
//   x.style.backgroundColor = "blue"

// var x = document.getElementsByClassName("all")
 
//    console.log(x)

//   x[2].style.color = "red"

//   x[2].setAttribute("price" , "7000 LE")

//   console.log(x[2])

//   x[0].backgroundColor = "blue"

//   for (var a = 0 ; a <  x.length   ; a++  ){
//      x[a].style.backgroundColor = "blue"
//   }

//    0  1   2   3   4   5   6  7  8  

/////////////////////////////////////////////////////////////////////////////////////

//   var input1 = document.querySelector("input[type=text]")

// //   console.log(input1.parentNode)
 
//    input1.value = "alaa"

//    input1.parentElement.style.width = "200px"
//    input1.parentElement.style.height = "200px"
//    input1.parentElement.style.backgroundColor = "red"

// var form1 = document.querySelector(".form1")

//   console.log(form1.childNodes)
//   console.log(form1.children)

//   console.log(form1.firstChild)
//   console.log(form1.firstElementChild)

//   console.log(form1.nextSibling)
//   console.log(form1.nextElementSibling)

//////////////////////////////////////////////////////////////////////////////////////////
 
// to create 
   
//   var div50 = document.createElement("div")

// //    div50.id = "div50"
// //    div50.className = "div"

// //    div50.setAttribute ("id" , "div50")
// //    div50.setAttribute("class" , "div")

// //    console.log(div50)

//     var text = document.createTextNode("islam mohamed")

//     div50.appendChild(text)


//     var con = document.querySelector(".container")
//     var sp1 = document.querySelector(".class10")

//     con.insertBefore(div50 , sp1)

//     console.log(con)
////////////////////////////////////////////////////////////////////////////////////////////////////

// object 

 // literal 

//   var person1 = {
//     name : "islam",
//     age : "26"
//   }

//   console.log(person1.name)

//    console.log(person1["name"])

////////////////////////////////////////////////////////////////////////////////////////////////////

 // instant 

//   var person1 = new Object()

//   person1.name = "mohamed"
//   person1.age = "40"

// //   console.log(person1)

//   person1.city = "mansoura"

//   console.log(person1)

////////////////////////////////////////////////////////////////////////////////////////////////////
  
//   object.create

//    var person1 = { }


//    var person2 = Object.create(person1 , {
//        name : { value : "ismail"},
//        age : {value : "28"} ,
//        city : {value : "cairo"}
//    }  )

//    console.log(person2)
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////

 var x ;       // declaration  without  assignment 

 var x ;      //  Redeclaration  without  assignment 

 //////////////////////////////////////////////////////////////////////////////////////////////////////////

var x = 50         // declaration  with  assignment 

var x = 100        // redeclaration with assignment
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////
 
//  function  code(x,y){
//     console.log(x*y)
//  }

//  code(7,8)

  // arrow function 

//    var code = (x,y) => {
//     console.log(x*y)
//    }

//    code(8,9)

//    var code = (x,y) => console.log(x*y)

//    code(5,8)




  
  