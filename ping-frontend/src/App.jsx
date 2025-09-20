import { useState } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>

    </div>
    <BrowserRouter>
    <Routes>
      <Route path='/' {<Layout />}/>
      <Route path='/Home' {<Home />}/>
      <Route path='/SignIn' {<SignIn />}/>
      <Route path='/SignUp' {<SignUp />}/>

    </Routes>

    </BrowserRouter>  

      
    </>
  )
}

function Layout() {
  return (
    <div>
      const navigate=useNavigate();
      function redirectUser(){
        navigate('/Home');
    </div>
    
  )
}

function SignIn() {
  return (
    
  )

}

function SignUp() {
  return (
    
  )

}

function Home() {
  return (
    
  )

}

export default App
