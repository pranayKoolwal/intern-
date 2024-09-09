import React from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const SignUp = () => {
    const [show,setShow] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('') 
    const [password,setPass] = useState('')
    const [ConfirmPass,setConfirmPass] = useState('')
    const [pict,setPic] = useState('')
    const [loading, setloading] = useState(false)
    const handler= async(e)=>{
      e.preventDefault();
        setloading(true)
        if(!name || !email || !password || !ConfirmPass){
          toast('complete all fields')
          return 0;
        }
        if(password!==ConfirmPass){
          toast('please Enter the Correct Password')
          return 0;
        }
       try {
          const config = {
            headers:{
              "Content-type":"application/json"
            }
          }
          const {data} = await axios.post("/api/user",{name,email,password,ConfirmPass,pict},config)
          toast('Registration-SuccessFull')
          localStorage.setItem('userInfo',JSON.stringify(data))
          setloading(false)
          
       } catch (err) {
        console.log(err.message)
       }
    }
    const postDetails =(pics)=>{
        setloading(true)
        if(pics===undefined){
            toast({
              title:'picture not found',
              status:"warning",
              duration:5000, 
              isClosable:true,
              position:"botton"
            })
            return 0;
        }
        if(pics.type==='image/jpeg' || pics.type==='image/png'){
            const data = new FormData()
            data.append('file',pics)
            data.append('upload_preset',"helloData")
            data.append("cloud_name","buddychat")
            fetch('https://api.cloudinary.com/v1_1/buddychat/image/upload',{
              method:'post',
              body:data
            })
            .then((res)=>res.json())
            .then((data)=>{
              setPic(data.url.toString())
              toast('image uploded')
              setloading(false)
            })
            .catch((err)=>{
              console.log(err)
              setloading(false)
            })
        }
        else{
          toast({
            title:'picture not found',
            status:"warning",
            duration:5000, 
            isClosable:true,
            position:"botton"
          })
        }
      
    }
  return (
    <Wrapper>
    <div>
        <>
        <div className="container">
  {/* code here */}
  <div className="card">
    <div className="card-image">
      <h2 className="card-heading">
        {'Create A New Account'}
        <small>{"Lets have Some Chat"}</small>
 	     </h2>
    </div>
    <form className="card-form" >
      <div className="input">
        <input
          type="text"
          value={name}
          className="input-field"
          onChange={(e)=>setName(e.target.value)}
          required=""
        />
        <label className="input-label">Full name</label>
      </div>
      <div className="input">
        <input
        onChange={(e)=>setEmail(e.target.value)}
          type="email"
          value={email}
          className="input-field"
          required=""
        />
        <label className="input-label">Email</label>
      </div>
      <div className="input">
        <input type="password" value={password} onChange={(e)=>setPass(e.target.value)} className="input-field" required="" />
        <label className="input-label">Password</label>
      </div>
	  
		<div className="input">
        <input type="password" className="input-field" value={ConfirmPass}  required="" onChange={(e)=>setConfirmPass(e.target.value)} />
        <label className="input-label">Confirm-Password</label>
      </div>
	  <div className="input">
        <input type="file" className="input-field" onChange={(e)=>postDetails(e.target.files[0])} required="" />
        <label className="input-label" >Upload Your Picture</label>
      </div>
	  
	  
      <div className="action">
        <button className="action-button" type='submit' onClick={handler} isLoading={loading} >Get started</button>
      </div>
    </form>
    <div className="card-info">
      <p>
        By signing up you are agreeing to our{" "}
        <a href="#">Terms and Conditions</a>
      </p>
	  
    </div>
	<div className='container w-75  d-flex text-center  '>
              <NavLink to='/login' className={'w-50'}><button type="button" class="btn btn-outline-success">Login</button></NavLink>
              <NavLink to='/SignUp'className={'w-50'}><button type="button" class="btn btn-outline-danger">SignUp</button></NavLink>
         </div>
		 
  </div>
  
</div>

        </>

    </div>
    </Wrapper>
  )
} 
const Wrapper = styled.section`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

*, *:after, *:before {
box-sizing: border-box;
}

body {
font-family: "DM Sans", sans-serif;
line-height: 1.5;
background-color: #f1f3fb;
padding: 0 2rem;
}

img {
max-width: 100%;
display: block;
}


// iOS Reset 
input {
appearance: none;
border-radius: 0;
}

.card {
margin: 2rem auto;
display: flex;
flex-direction: column;
width: 100%;
max-width: 425px;
background-color: #FFF;
border-radius: 10px;
box-shadow: 0 10px 20px 0 rgba(#999, .25);
padding: .75rem;
}

.card-image {
border-radius: 8px;
overflow: hidden;
padding-bottom: 65%;
background-image: url('https://assets.codepen.io/285131/coffee_1.jpg');
background-repeat: no-repeat;
background-size: 150%;
background-position: 0 5%;
position: relative;
}

.card-heading {
position: absolute;
left: 10%;
top: 15%;
right: 10%;
font-size: 1.75rem;
font-weight: 700;
color: #735400;
line-height: 1.222;
small {
    display: block;
    font-size: .75em;
    font-weight: 400;
    margin-top: .25em;
}
}

.card-form {
padding: 2rem 1rem 0;
}

.input {
display: flex;
flex-direction: column-reverse;
position: relative;
padding-top: 1.5rem;
&+.input {
    margin-top: 1.5rem;
}
}

.input-label {
color: #8597a3;
position: absolute;
top: 1.5rem;
transition: .25s ease;
}

.input-field {
border: 0;
z-index: 1;
background-color: transparent;
border-bottom: 2px solid #eee; 
font: inherit;
font-size: 1.125rem;
padding: .25rem 0;
&:focus, &:valid {
    outline: 0;
    border-bottom-color: #6658d3;
    &+.input-label {
        color: #6658d3;
        transform: translateY(-1.5rem);
    }
}
}

.action {
margin-top: 2rem;
}

.action-button {
font: inherit;
font-size: 1.25rem;
padding: 1em;
width: 100%;
font-weight: 500;
background-color: #6658d3;
border-radius: 6px;
color: #FFF;
border: 0;
&:focus {
    outline: 0;
}
}

.card-info {
padding: 1rem 1rem;
text-align: center;
font-size: .875rem;
color: #8597a3;
a {
    display: block;
    color: #6658d3;
    text-decoration: none;
}
}





`


export default SignUp