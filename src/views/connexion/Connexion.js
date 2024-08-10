import {  useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { app_token_Name, domaine_path } from "src/api/instanceAxios";

import { useMutation } from '@tanstack/react-query';
import { loginUser } from "src/api/users/users";
import login_svg from "src/assets/images/undraw_house_searching_re_stk8.svg"
import logo_myhot from "src/assets/images/Myhot/noBG/3_nobg.png"
import login_wave from "src/assets/images/salon1.jpg"
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

import "src/assets/css/connexion.css"
import { appUrl } from 'src/appUrl';
import { Message } from 'primereact/message';


const Connexion = () => {

  const navigate = useNavigate();
  const toastErrorMsg = useRef(null);

  const [email, setEmail] = useState('');
  const [password,setPassword] = useState("")

  const [showMessageError, setShowMessageError] = useState(false);
  const [messageError, setMessageError] = useState("");




  const showMessage = (ref,title,message) => {
    ref.current.show({
      severity: 'error',
      content: () => (
        <div className="d-flex flex-column align-items-start py-2" style={{ flex: '1' }}>
            <div className="d-flex align-items-start gap-2">
               <i className="pi pi-times-circle h1 me-2"></i>
                <span className="fw-bold text-uppercase"> {title} </span>
            </div>
            <div className="fw-bolder fs-5 px-3 my-3 text-900">{message}</div>
        </div>
    ),
      life: 7000
    });
};


  const loginMutation= useMutation({
    mutationKey:['login'],
    mutationFn: async(body)=>  {
      return await loginUser(body)
    }
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMotDePasseChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
          setShowMessageError(false);
    if(!!email && !!password){
      const requestBody = {
        email: email,
        password: password,
      };
      loginMutation?.mutate(requestBody, {
        onError: (error, variables, context) => {
          console.log("messge erreur ::", error);
          setMessageError(error?.message);
          setShowMessageError(true)
        },
        onSuccess: (response) => {
          const dataResponse = response?.data;
          localStorage.setItem(app_token_Name, dataResponse?.token);
          navigate(`${appUrl.compte.list}`);
        },
      });
    }else{
      showMessage(toastErrorMsg,"Oupss !!","Email et Mot de passe Obligatoires.")
    }

  };

  const signup = ()=>{
    navigate('/signup')
  }

  // useEffect(()=>{
  //   if(loginMutation?.isError) {
  //     showMessage(toastErrorMsg,"Erreur Connexion","Nom d'utilisateur ou mot de passe incorrect.")
  //     console.log("Login error:",loginMutation?.error)
  //   }

  // },[loginMutation?.isError])

  useEffect(() => {
    const inputs = document.querySelectorAll(".login-myhot-container .input");

    const addFocusClass = (e) => {
      let parent = e.target.parentNode.parentNode;
      parent.classList.add("focus");
    };

    const removeFocusClass = (e) => {
      let parent = e.target.parentNode.parentNode;
      if (e.target.value === "") {
        parent.classList.remove("focus");
      }
    };

    inputs.forEach(input => {
      input.addEventListener("focus", addFocusClass);
      input.addEventListener("blur", removeFocusClass);

      return () => {
        input.removeEventListener("focus", addFocusClass);
        input.removeEventListener("blur", removeFocusClass);
      };
    });
  }, [])


  return (
    <>
      <Toast ref={toastErrorMsg} position="top-center" />

      <div className="login-myhot-container">
        {/* <img className="wave img-fluid" src={login_wave} alt='login_bg' /> */}
        <div className="login-container">
          <div className="login-container-second shadow rounded mx-auto">
            <div className="img d-flex flex-column">
              <img src={login_svg} alt="login_svg" />
              <p>Administrer les activités de vos établissements</p>
              <Button onClick={signup} className='rounded p-button-outlined' label='Inscription Test'/>
            </div>
            <div className="login-content">
              <form onSubmit={handleSubmit}>
                <img src={logo_myhot} alt="logo myhot" />
                <h2 className="title">Connectez vous</h2>
                {showMessageError && (
                  <Message
                    className="w-100 mb-3"
                    severity="error"
                    text={loginMutation?.error?.message}
                  />
                )}
                <div className="input-div one">
                  <div className="i">
                    <i className="pi pi-user"></i>
                  </div>
                  <div className="div">
                    <h5>Email</h5>
                    <input
                      type="email"
                      className="input"
                      required
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="pi pi-lock"></i>
                  </div>
                  <div className="div">
                    <h5>Mot de passe</h5>
                    <input
                      type="password"
                      className="input"
                      required
                      value={password}
                      onChange={handleMotDePasseChange}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  loading={loginMutation?.isPending}
                  label="Connexion"
                  className="rounded-pill w-100 mt-5 login-button"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connexion;
