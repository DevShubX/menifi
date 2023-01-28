import React from 'react';
import styled from 'styled-components';
import { FcGoogle } from "react-icons/fc";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import "swiper/css";
import "swiper/css/effect-cards";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const {currentUser} = useStateContext()


    const handleSignIn = async (e:any) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        await signInWithEmailAndPassword(auth,email,password).then(()=>{
            toast.success("Welcome!");
            navigate('/home');
        }).catch((err)=>{
            toast.error("Please enter a valid email or password");
        });
    }

    const googleSignIn=async(e:any)=>{
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth,provider).then((e)=>{
            navigate("/home");
        });
    }
    return (
        <div>
            <Container>
                <div className='login'>
                    <ImageContainer>
                        <h2>
                            Watch Your Favourite Movies, Animes & Manga and Much More
                        </h2>
                        <Swiper
                            effect={"cards"}
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img src="https://wallpapercave.com/dwp1x/wp7265581.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://wallpapercave.com/dwp1x/wp5130302.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://wallpapercave.com/wp/wp10493950.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://i.pinimg.com/736x/52/ae/78/52ae78fe0e6e7bb2adb3ba387cd3f718.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://wallpapercave.com/dwp1x/wp9339940.jpg" />
                            </SwiperSlide>
                        </Swiper>
                    </ImageContainer>
                    <ContentWrapper>
                        <h1>
                            Login
                        </h1>
                        <div className='input-user'>
                            <form onSubmit={handleSignIn}>
                                <p>
                                    Email
                                </p>
                                <input type="text" />
                                <p>
                                    Password
                                </p>
                                <input type="text" />
                                <button>
                                    Login
                                </button>
                            </form>
                            <div className='or'>Or</div>
                            <button className='google' onClick={(e)=>googleSignIn(e)}>
                                <FcGoogle className='icon' /> Sign up with Google
                            </button>
                            <div className='signup'>
                                Don't have an account? <Link to={"/register"}>Signup Now</Link>
                            </div>
                        </div>
                    </ContentWrapper>
                </div>
            </Container>
        </div>
    )
}

const ContentWrapper = styled.div`
    margin: 0 5rem 5rem 5rem;
    .input-user{
        form{
            display: flex;
            flex-direction: column;
        }
        display: flex;
        flex-direction: column;
        p{
            margin: 2rem 0 0 0 ;
            font-family: "Gilroy-Medium",sans-serif;
        }
        button{
            margin: 4rem 0 2rem 0;
            font-size : 1.1rem;
            border: none;
            background-color: #ff0000;
            color: white;
            font-family: 'Gilroy-Bold',sans-serif;
            padding: 0.6rem;
            border-radius:0.5rem;
            cursor:pointer;
        }
        input{
            padding: 0.5rem;
            font-size : 1rem;
            outline: none;
            border-radius:0.2rem;
            border: none;
        }
        .google{
            background-color: #302e2e;
            margin: 2rem 0 2rem 0;
            .icon{
                vertical-align: middle;
                margin: 0 0.5rem 0.1rem 0;
                font-size : 1.5rem;
            }
        }
        .or{
            text-align: center;
            font-family: "Gilroy-Medium",sans-serif;
        }
        .signup{
            font-family: "Gilroy-Medium",sans-serif;
            text-align: center;
            a{
                text-decoration: none;
                color: red;
            }
        }
    }
    h1{
        font-family: "Gilroy-Bold",sans-serif;
        text-align: center;
    }


    
`

const ImageContainer = styled.div`
    background-color: #2c2c2c;
    max-width: 500px;
    text-align: center;
    h2{
        font-family:'Gilroy-Bold',sans-serif;
    }
    .swiper {
        width: 300px;
        height: 300px;
        padding: 50px;
    }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 400px;
        height: 400px;
    }
    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem ;
    }
    @media screen and (max-width:1000px){
        padding-right: 0rem;
        .swiper{
            width: 200px;
            height: 200px;
        }
        .swiper-slide{
            width: 200px;
            height: 200px;
        }
        
    }
`

const Container = styled.div`
    color: white;
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("https://wallpaperfordesktop.com/wp-content/uploads/2021/05/Anime-Wallpaper-Laptop.jpg");
    @media screen and (max-width:1000px){
        height: 100%;
    }
    .login{
        display: flex;
        border: 2px solid #2c2c2c;
        border-radius: 1rem;
        overflow: hidden;
        background-color: #2c2c2ca6;
         @media screen and (max-width:1000px){
            margin: auto;
            flex-direction: column;
        }
        @media screen and (max-width:400px){
            margin: auto;
        }
    }
   

`

export default LoginPage