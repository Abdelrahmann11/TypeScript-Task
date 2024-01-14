import './App.css';
import Input from './Input';
import Header from './Header';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {ValidName, ValidEmail, ValidNumber, ValidPass} from './Regex'
import Button from './Button';

function App() {

  const [name, SetName] = useState<string>("");
  const [email, SetEmail] = useState<string>("");
  const [number, SetNumber] = useState<number>(0);
  const [pass, SetPass] = useState<any>("");

  function NameChangeHandler(e:any){
    SetName(e.target.value)
    // console.log(e.target.value);  
  }

  function EmailChangeHandler(e:any){
    SetEmail(e.target.value)
    // console.log(e.target.value);
  }

  function NumberChangeHandler(e:any){
    SetNumber(e.target.value)
    // console.log(e.target.value);
  }

  function PassChangeHandler(e:any){
    SetPass(e.target.value)
    // console.log(e.target.value);
  }

  let userArray:any= [];
  if(localStorage.getItem("UserData") == null){
    userArray= []
  } else{
      userArray = JSON.parse(localStorage.getItem("UserData")!)
  }

  function EmptyChecker(){
    if(name === "" || email === "" || number === 0 || pass === ""){
      return false
    } else{
      return true
    }
  }

  let NameValid = document.getElementById("NameValid")
  let EmailValid = document.getElementById("EmailValid")
  let NumberValid = document.getElementById("NumberValid")
  let PassValid = document.getElementById("PassValid")

  function UserNameValidation(){
    var regex = /^[A-Z]{1,}|\s[a-zA-Z]{2,}$/

    if(regex.test(name)){
      document.getElementById("NameValid")?.classList.replace("d-block", "d-none")
        return true;
    } else{
      document.getElementById("NameValid")?.classList.replace("d-none", "d-block")
        return false;
    }
  }

  function UserEmailValidation(){
    var regex = /^[a-zA-Z]{2,}[0-9]{0,}(@)((gmail\.com)|(hotmail\.com))$/

    if(regex.test(email)){
      document.getElementById("EmailValid")?.classList.replace("d-block", "d-none")
        return true;
    } else{
      document.getElementById("EmailValid")?.classList.replace("d-none", "d-block")
        return false;
    }
  }

  // function UserNumberValidation(){
  //   var regex = /^(010)|(011)|(012)|(015)[0-9]{8}$/

  //   if(regex.test(number)){
  //     document.getElementById("NumberValid")!.classList.replace("d-block", "d-none")
  //       return true;
  //   } else{
  //     document.getElementById("NumberValid")!.classList.replace("d-none", "d-block")
  //       return false;
  //   }
  // }

  function UserPassValidation(){
    var regex = /^[a-zA-Z]{8,}[0-9]{0,}((@){0,}(%){0,})$/

    if(regex.test(pass)){
      document.getElementById("PassValid")?.classList.replace("d-block", "d-none")
        return true;
    } else{
      document.getElementById("PassValid")?.classList.replace("d-none", "d-block")
        return false;
    }
  }

  const [nameErr, setNameErr] = useState(false); 
  const [emailErr, setEmailErr] = useState(false); 
  const [numErr, setNumErr] = useState(false); 
  const [passErr, setPassErr] = useState(false);

  function valid(){
    if(!ValidName.test(name)){
      setNameErr(true)

    }
    
    if(!ValidEmail.test(email)){
      setEmailErr(true)
    }

    if(!ValidNumber.test(number)){
      setNumErr(true)
    }

    if(!ValidPass.test(pass)){
      setPassErr(true)
    }
    return true
  }

  function EmailExistChecker(){
    for(var i =0;i<userArray.length; i++){
        if(userArray[i].email.toLowerCase() === email.toLowerCase()){
            return false
        }
    }
}
  function SubmitHandler(e:any){
    e.preventDefault();
    if(EmptyChecker() === false){
      document.getElementById("Incorrect")!.innerHTML='<span class="text-danger m-3">All Input Fields Are Required</span>'
      return false
    }

    // if(UserNameValidation() && UserEmailValidation() && UserPassValidation()){
    //   let userdata = {
    //     name: name,
    //     email: email,
    //     number: number,
    //     Password: pass,
    //   }
  
    //   userArray.push(userdata)
    //   localStorage.setItem("UserData", JSON.stringify(userArray))

    //   SetName("")
    //   SetEmail("")
    //   SetNumber(0)
    //   SetPass("")
    //   return true
    // } 
      if(EmailExistChecker() === false){
        // EmailValid!.innerHTML = '<span class="text-danger m-3">Email Already Exist</span>'
        console.log("Email Already Exist");
        
      } else{
        // userArray.push(userdata)
        // localStorage.setItem("UserData", JSON.stringify(userArray))
        if(UserNameValidation() && UserEmailValidation() && UserPassValidation()){
          let userdata = {
            name: name,
            email: email,
            number: number,
            Password: pass,
          }
      
          userArray.push(userdata)
          localStorage.setItem("UserData", JSON.stringify(userArray))
    
          SetName("")
          SetEmail("")
          SetNumber(0)
          SetPass("")
          return true
        } 

        SetName("")
        SetEmail("")
        SetNumber(0)
        SetPass("")
      }

    // let userdata = {
    //   name: name,
    //   email: email,
    //   number: number,
    //   Password: pass,
    // }

    // userArray.push(userdata)
    // localStorage.setItem("UserData", JSON.stringify(userArray))

    // SetName("")
    // SetEmail("")
    // SetNumber(0)
    // SetPass("")
  }


  return (
    <div className="App">
      <Header title='Login Form' color='blue'/>
      
      <form onSubmit={SubmitHandler}>
        {/* <input type='text' placeholder='' id='' onChange={NameChangeHandler}/> */}
        <label>Name:</label>
        {nameErr && <div className="alert alert-danger" id="NameValid">Your name must start with capital letter</div>}
        {/* <div className="alert alert-danger d-none" id="NameValid">Your name must start with capital letter</div> */}
        <Input type='text' placeholder='Please enter your name' id='Name' value={name} onChange={NameChangeHandler}/>

        <label>Email:</label>
        {/* {emailErr && <p>NOOOOOOOOOOOOOOOOOO</p>} */}
        {emailErr && <div className="alert alert-danger" id="EmailValid">Your email must contain number and end with (@gmai.com) or (@hotmail.com)</div>}
        {/* <div className="alert alert-danger d-none" id="EmailValid">Your email must contain number and end with (@gmai.com) or (@hotmail.com)</div> */}
        <Input type='email' placeholder='Please enter your email' id='Email' value={email} onChange={EmailChangeHandler}/>
        
        <label>Number:</label>
        {numErr && <div className="alert alert-danger" id="NumberValid">Your number must be 11 Numbers and start with (012) or (011) or (015) or (010)</div>}
        {/* <div className="alert alert-danger d-none" id="NumberValid">Your number must be 11 Numbers and start with (012) or (011) or (015) or (010)</div> */}
        <Input type='number' placeholder='Please enter your Number' id='Number' value={number} onChange={NumberChangeHandler}/>
        
        <label>Password:</label>
        {passErr && <div className="alert alert-danger" id="PassValid">Your password must be more than 8 characters (A- Z) may contain (@ / %) and numbers</div>}
        {/* <div className="alert alert-danger d-none" id="PassValid">Your password must be more than 8 characters (A- Z) may contain (@ / %) and numbers</div> */}
        <Input type='Password' placeholder='Please enter your Password' id='Pass' value={pass} onChange={PassChangeHandler}/>
        <Input type='submit' placeholder='Submit' id='SubmitBtn' />
      </form>
      <span id='Incorrect'></span>
      {/* <Button title='Click' disabled={false}/> */}
      {/* <button onClick={valid}>Validate</button> */}
    </div>
  );
}

export default App;

// const App = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailErr, setEmailErr] = useState(false);
//   const [pwdError, setPwdError] = useState(false);
//   const validate = () => {
//      if (!ValidEmail.test(email)) {
//         setEmailErr(true);
//      }
//      if (!ValidPass.test(password)) {
//         setPwdError(true);
//      }
//   };
//   return (
//      <div>
//         <input
//            type="email"
//            placeholder="Email"
//            value={email}
//            onChange={(e) => SetEmail(e.target.value)}
//         />
//         <input
//            type="password"
//            placeholder="Password"
//            value={pass}
//            onChange={(e) => SetPass(e.target.value)}
//         />
//         <div>
//            <button onClick={valid}>Validate</button>
//         </div>
//         {emailErr && <p>Your email is invalid</p>}
//         {passErr && <p>Your password is invalid</p>}
//      </div>
//   );
// };
// export default App;