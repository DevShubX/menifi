import React, { useEffect, useRef, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import "swiper/css";
import "swiper/css/effect-cards";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile} from 'firebase/auth';
import { auth, db, storage } from '../../Firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const SignupPage = () => {
    const navigate = useNavigate();
    const [selectedPhoto, setSelectedPhoto] = useState<any>("");
    const [photoUrl, setPhotoUrl] = useState<any>(null);
    
    useEffect(() => {
        if (selectedPhoto) {
            setPhotoUrl(URL.createObjectURL(selectedPhoto));
        }
    }, [selectedPhoto]);


    const googleSignIn = async (e: any) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth,provider).then((e)=>{
            navigate('/home');
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        if (password.length < 6) {
            toast.error("Password Should be atleast 6 characters long");
        } 
        if (email.length === 0) {
            toast.error("Email Is Empty");
        }
        if (displayName.length === 0) {
            toast.error("Display Name cannot be empty")
        } 
        if ((displayName.length>0) && (email.length>0) && (password.length>0) && (file !== undefined)) {
            try {

                const res=await createUserWithEmailAndPassword(auth, email, password);
                const storageref = ref(storage, email);
                const uploadTask = uploadBytesResumable(storageref, file);
                await updateProfile(res.user, {
                    displayName: displayName,
                });
                uploadTask.on('state_changed',
                    (snapshot) => {
                    },
                    (error) => {
                        toast.error("Something Wrong");
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateProfile(res.user, {
                                photoURL: downloadURL
                            });
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName: displayName,
                                photoURL: downloadURL,
                                email: email,
                            });
                            toast.success("Profile Pic uploaded. \nPlease refresh to update.");
                        });
                    }
                );
                toast.success("Uploading the profile pic");
                navigate('/home');
            } catch (err: any) {
                toast.error(err.code);
            }
        }else{
            toast.error("Please select a avatar");
        }

    }

    return (
        <div>
            <Container>
                <div className='signup'>
                    <ImageContainer>
                        <img src="/assets/animecharac.png" alt="" />
                    </ImageContainer>
                    <ContentWrapper>
                        <h1>
                            Signup To Menifi
                        </h1>
                        <div className='input-user'>
                            <form onSubmit={function (e: any) {
                                handleSubmit(e);
                            }}>
                                <p>
                                    Name
                                </p>
                                <input type="text" />
                                <p>
                                    Email
                                </p>
                                <input type="text" />
                                <p>
                                    Password
                                </p>
                                <input type="text" />
                                <input type="file" id='file' style={{ display: "none" }} onChange={(e: any) => setSelectedPhoto(e.target.files[0])} />
                                <label htmlFor="file">
                                    {(photoUrl && selectedPhoto) ? <img src={photoUrl} /> : <img src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png" alt="" />}
                                    <span>Choose An Avatar</span>
                                </label>
                                <button>
                                    Signup
                                </button>
                            </form>
                            <div className='or'>Or</div>
                            <button className='google' onClick={(e) => googleSignIn(e)}>
                                <FcGoogle className='icon' /> Sign up with Google
                            </button>
                            <div className='login'>
                                Already have an account? <Link to="/login">Login Now</Link>
                            </div>
                        </div>
                    </ContentWrapper>
                </div>
            </Container>
        </div>
    )
}
const ContentWrapper = styled.div`
    margin: 2rem 5rem 5rem 5rem;
    .input-user{
        display: flex;
        flex-direction: column;
        label{
            cursor: pointer;
            font-family: "Gilroy-Medium",sans-serif;
            margin-top: 2rem;
            display: flex;
            align-items: center;
            img{
                width: 50px;
                margin-right: 1rem;
            }
        }
        p{
            margin: 2rem 0 0 0 ;
            font-family: "Gilroy-Medium",sans-serif;
        }
        button{
            margin: 2rem 0 2rem 0;
            font-size : 1.1rem;
            border: none;
            background-color: #ff0000;
            color: white;
            font-family: 'Gilroy-Bold',sans-serif;
            padding: 0.6rem;
            border-radius:0.5rem;
            width: 100%;
            cursor : pointer;
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
        }
        .login{
            text-align: center;
            font-family: "Gilroy-Medium",sans-serif;
            a{
                color: red;
                text-decoration: none;
            }
        }
    }
    h1{
        font-family: "Gilroy-Bold",sans-serif;
        text-align: center;
    }
    
`

const ImageContainer = styled.div`
    text-align: center;
    background-color: #2c2c2c;
    padding-right: 3rem;
    max-width: 500px;
    img{
        width: 500px;
        height: 100%;
        object-fit: cover;
    }
    @media screen and (max-width:1600px) {
        img{
            width: 300px;
            height: auto;
        }
    }
    @media screen and (max-width:1000px){
        padding-right: 0rem ;
        img{
            width: 200px;
        }
    }
`

const Container = styled.div`
    border: 1px solid #2c2c2c;
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
    .signup{
        display: flex;
        margin: auto;
        border: 2px solid #2c2c2c;
        border-radius: 1rem;
        background-color: #2c2c2ca6;
        overflow: hidden;
         @media screen and (max-width:1000px){
            margin: auto;
            flex-direction: column;
        }
        @media screen and (max-width:400px){
            margin: auto;
        }

    }

`

export default SignupPage