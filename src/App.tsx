import './App.css';
import Input from './Input';
import Header from './Header';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {ValidName, ValidEmail, ValidNumber, ValidPass} from './Regex'
import Button from './Button';
import {userSchema} from './Validations/UserValidation';
import  * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'

function App() {

  interface props{
    type: string
    placeholder?: string
    id: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string 
    label?: any
  }
  
  const Input = (props: props) => {
    
      return(
        <div>
          <input className='CC' type={props.type} placeholder={props.placeholder} id={props.id} value={props.value} onChange={props.onChange} /> 
        </div>
      )
  }

  const [name, SetName] = useState<string>("");
  const [email, SetEmail] = useState<string>("");
  const [number, SetNumber] = useState<string>("");
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
  

  // let userArray:any =[];
  // if(localStorage.getItem("UserData") == null){
  //   userArray= []
  // } else{
  //     userArray = JSON.parse(localStorage.getItem("UserData")!)
  // }

  let userArray:any[];
  if(localStorage.getItem("UserData") == null){
    userArray = []
  } else{
    userArray = JSON.parse(localStorage.getItem("UserData")!)
  }

  function EmptyChecker(){
    if(name === "" || email === "" || number === "" || pass === ""){
      return false
    } else{
      return true
    }
  }
  
  function EmailExistChecker(){
    for(var i =0;i<userArray.length; i++){
        if(userArray[i].email.toLowerCase() === email.toLowerCase()){
            return false
        }
    }
}
  async function SubmitHandler(e:any){
    e.preventDefault();
    if(EmptyChecker() === false){
      document.getElementById("Incorrect")!.innerHTML='<span class="text-danger m-3">All Input Fields Are Required</span>'
      return false
    }

      if(EmailExistChecker() === false){
        document.getElementById("Incorrect")!.innerHTML = '<span class="text-danger m-3">Email Already Exist</span>'
        // console.log("Email Already Exist");
        return false
      }
      // let userdata = {
      //   name: name,
      //   email: email,
      //   number: number,
      //   Password: pass,
      // }
      // const isValid:boolean =await userSchema.isValid(userdata)
      //   console.log(isValid);
      // if(isValid){
        
      //     userArray.push(userdata)
      //     localStorage.setItem("UserData", JSON.stringify(userArray))
    
      //     SetName("")
      //     SetEmail("")
      //     SetNumber(0)
      //     SetPass("")

      //     return true

      // } else{
      //   console.log("Validation Error");
        
      // }
  }

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(userSchema),
    defaultValues:{
      name: '',
      email: '',
      number: '',
      Password: '',
    }
  })
  // console.log("errors ", errors)
  // if(EmailExistChecker() === false){
  //   document.getElementById("Incorrect")!.innerHTML = '<span class="text-danger m-3">Email Already Exist</span>'
  //   // console.log("Email Already Exist");
  //   return false
  // }
  const onSubmit = (data: any) =>{

    if(EmailExistChecker() === false){
    document.getElementById("Incorrect")!.innerHTML = '<span class="text-danger m-3">Email Already Exist</span>'
    // console.log("Email Already Exist");
    return false
  }

    console.log("data ", data)
    userArray.push(data)
    // const storedData = JSON.parse(localStorage.getItem("FromDataForm")!) || [];
    // const  newData = [...storedData, data]
    localStorage.setItem("UserDaaataaa", JSON.stringify(userArray))
  }


  return (
    <div className="App">
      <Header title='Login Form' color='blue'/>
      
      {/* <form onSubmit={SubmitHandler}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input type='text' placeholder='' id='' onChange={NameChangeHandler} {...register}/> */}
        <label>Name:</label>
        {errors.name && <div className="alert alert-danger" id="NameValid">Your name must start with capital letter</div>}
        {/* <div className="alert alert-danger d-none" id="NameValid">Your name must start with capital letter</div> */}
        {/* <Input {...register('name')} type='text' placeholder='Please enter your name' id='Name' value={name} onChange={NameChangeHandler}/> */}
        <input className='CC' type="text" {...register('name')}/>

        <label>Email:</label>
        {/* {emailErr && <p>NOOOOOOOOOOOOOOOOOO</p>} */}
        {errors.email && <div className="alert alert-danger" id="EmailValid">Your email must contain number and end with (@gmai.com) or (@hotmail.com)</div>}
        {/* <div className="alert alert-danger d-none" id="EmailValid">Your email must contain number and end with (@gmai.com) or (@hotmail.com)</div> */}
        {/* <Input {...register('email')} type='email' placeholder='Please enter your email' id='Email' value={email} onChange={EmailChangeHandler}/> */}
        <input className='CC' type="text" {...register('email')}/>
        
        <label>Number:</label>
        {errors.number && <div className="alert alert-danger" id="NumberValid">Your number must be 11 Numbers and start with (012) or (011) or (015) or (010)</div>}
        {/* <div className="alert alert-danger d-none" id="NumberValid">Your number must be 11 Numbers and start with (012) or (011) or (015) or (010)</div> */}
        {/* <Input {...register('number')} type='number' placeholder='Please enter your Number' id='Number' value={number} onChange={NumberChangeHandler}/> */}
        <input className='CC' type="text" {...register('number')}/>

        <label>Password:</label>
        {errors.Password && <div className="alert alert-danger" id="PassValid">Your password must be more than 8 characters (A- Z) may contain (@ / %) and numbers</div>}
        {/* <div className="alert alert-danger d-none" id="PassValid">Your password must be more than 8 characters (A- Z) may contain (@ / %) and numbers</div> */}
        {/* <Input {...register('Password')} type='Password' placeholder='Please enter your Password' id='Pass' value={pass} onChange={PassChangeHandler}/> */}
        <input className='CC' type="text" {...register('Password')}/>
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