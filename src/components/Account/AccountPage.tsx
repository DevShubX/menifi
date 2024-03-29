import { updateProfile } from 'firebase/auth'
import { onValue } from 'firebase/database'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ref as refer } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiEditBoxFill, RiEditCircleFill } from 'react-icons/ri'
import styled from 'styled-components'
import { db, storage, database } from '../../Firebase/firebase'
import { useStateContext } from '../../GlobalContext/ContextProvider'
import useWindowDimension from '../../hooks/useWindowDimension'
import HomepageNav from '../NavBars/HomepageNav'
import { Link } from 'react-router-dom';

const AccountPage = () => {
  const { currentUser } = useStateContext();
  const [selectedPhoto, setSelectedPhoto] = useState<any>("");
  const [photoUrl, setPhotoUrl] = useState<any>(null);
  const { width } = useWindowDimension();
  const [loading, setLoading] = useState(true);
  const [recentlyWatched, setrecentlyWatched] = useState<any>([]);
  useEffect(() => {
    if (selectedPhoto) {
      setPhotoUrl(URL.createObjectURL(selectedPhoto));
    }
  }, [selectedPhoto]);


  useEffect(() => {
    getRecently();
  }, []);

  const newdbref = refer(database, `users/${currentUser.uid}/recentlyWatched/recently_watched_arr`)
  const getRecently = () => {
    setLoading(true);
    onValue(newdbref, (snapshot) => {
      if (snapshot.exists()) {
        let rec = snapshot.val();
        setrecentlyWatched(rec);
      }
    });
    setLoading(false);
  }


  const updateProfilePic = async (e: any) => {
    setSelectedPhoto(e.target.files[0]);
    const file = e.target.files[0];
    try {
      const storageref = ref(storage, currentUser.uid);
      const uploadTask = uploadBytesResumable(storageref, file);
      uploadTask.on('state_changed',
        (snapshot) => {
        },
        (error) => {
          toast.error(error.name);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              photoURL: downloadURL
            });
            await setDoc(doc(db, "users", currentUser.uid), {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: downloadURL,
              email: currentUser.email,
            });
          });

          toast.success('Profile Changed');
        })
    } catch (error) {
    }
  }
  return (
    <div>
      <MainDiv>
        <HomepageNav />
        <Content>
          {width < 900 && <h1>Account</h1>}
          <UserDetails>
            <ImageWrapper>
              <input type="file" id='file' style={{ display: "none" }} onChange={function (e: any) {
                toast.promise(updateProfilePic(e), {
                  loading: 'Changing...',
                  success: <b>Profile Photo Changed!</b>,
                  error: <b>Could not Changed.</b>,
                })
              }} />
              <label htmlFor="file">
                {(photoUrl && selectedPhoto) ? <img src={photoUrl} /> : <img src={currentUser.photoURL} alt="" />}
                <RiEditCircleFill className='edit' />
              </label>
              <p>{currentUser.displayName}</p>
            </ImageWrapper>
            <EditContent>
              <p>Display Name</p>
              <div>
                {currentUser.displayName}
              </div>
              <p>Email</p>
              <div>
                {currentUser.email}
              </div>
            </EditContent>
          </UserDetails>
          <WatchedWrapper>
            <h1>
              Recently Watched
            </h1>
            <Recently>
              {recentlyWatched.length > 0 ?
                (
                  <CardWrapper>
                    {recentlyWatched.map((item: any, index: any) => (
                      <Wrapper to={item?.StreamingLink?.includes("animes")?item.StreamingLink : item?.TvStreamingLink?.includes("tvshows")?item.TvStreamingLink:
                      item?.movieStreamingLink?.includes("movies")?item.movieStreamingLink:""}>
                        <img src={item.filmPoster ? item.filmPoster : item.anilistPoster.large} alt="" />
                      </Wrapper>
                    ))}
                  </CardWrapper>
                ) : <h4>Nothing to display.</h4>}
            </Recently>
          </WatchedWrapper>
        </Content>
      </MainDiv>
    </div>
  )
}

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,120px);
  grid-gap: 1rem;
  grid-row-gap: 2rem;
  justify-content: space-between;
  margin-right: 2rem;
  @media screen and (max-width:900px){
    grid-template-columns: repeat(auto-fill,160px);
    grid-gap: 0.3rem;
    grid-row-gap:1.5rem ;
    margin-right:0rem;
  }
  @media screen and (max-width:600px){
    grid-template-columns: repeat(auto-fill,140px);
    grid-gap: 0.3rem;
    grid-row-gap:1.5rem ;
    margin-right:0rem;
  }
  @media screen and (max-width:400px){
    grid-template-columns: repeat(auto-fill,120px);
    grid-gap: 0.3rem;
    grid-row-gap:1.5rem ;
    margin-right:0rem;
  }

`
const Wrapper = styled(Link)`
  text-decoration:none;
  img{
    width: 120px;
    object-fit: cover;
    border-radius: 1rem;
  }
  p{
    color: #ffffff;
    font-family: "Gilroy-Bold",sans-serif;
    font-weight: 600;
    font-size: 18px;
    max-width: 160px;
    @media screen and (max-width:900px){
      font-size:16px;
    }
  }
  @media screen and (max-width:600px){
    img{
        width:140px;
        height:200px;
    }
  }
  @media screen and (max-width:400px){
    img{
        width:120px;
        height:180px;
    }
  }
`
const Recently = styled.div`
    overflow-y:scroll;
    background-color: #2b2b2b;
    border-radius: 1rem;
    padding: 2rem;
    height : 700px;
    h4{
      font-family: "Gilroy-Bold",sans-serif;
    }
    @media screen and (max-width:900px){
      height:500px
    }
`

const EditContent = styled.div`
  background-color: #2e2e2e;
  padding: 1rem 10rem 2rem 2rem;
  border-radius: 1rem;
  p{
    font-size : 1.1rem;
    font-family: "Gilroy-Medium",sans-serif;
    color: #cfcdcd;
  }
  div{
    font-family: "Gilroy-Bold",sans-serif;
    font-size : 1.4rem;
    width:100%;
  }
  @media screen and (max-width:600px){
    overflow-x:scroll;
    p{
      font-size: 1rem;
    }
    div{
      font-size : 1rem;
    }
  }
`

const ImageWrapper = styled.div`
  text-align: center;
  padding : 2rem 1rem;
  display: flex;
  align-items: center;
  img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
    }
  p{
    font-size : 1.4rem;
    font-family: "Gilroy-Bold",sans-serif;
    margin: 0rem 0 0 1rem;
  }
  label{
    cursor: pointer;
    position: relative;
    .edit{
      position: absolute;
      right: 1%;
      font-size : 2rem;
      border: 1px solid black;
      background-color: black;
      border-radius: 50%;
      color: white;
    }
   
  }
  @media screen and (max-width:900px){
    padding: 1rem 1rem;
  }
`

const WatchedWrapper = styled.div`
  margin-left: 5rem;
  width: 100%;
  @media screen and (max-width:1200px){
    margin: 2rem 0 0 0;
    h1{
      font-size : 1.5rem;
    }
  }
`


const UserDetails = styled.div`
    

`
const Content = styled.div`
  display: flex;
  margin: 5rem 5rem 5rem 5rem;
  @media screen and (max-width:1200px){
    flex-direction:column;
    margin: 0rem 2rem 2rem 2rem;
  }
`
const MainDiv = styled.div`
  position: relative;
  margin:0 0 0 12rem;
  display: flex;
  flex-direction:column;
  color: white;
  width: 90vw;
  @media screen and (max-width:1850px) {
    width:86vw;
  }
  @media screen and (max-width:1450px){
    width :83vw;
  }
  @media screen and (max-width:1150px){
    width: 79vw;
  }
  @media screen and (max-width:900px){
    width: 99vw;
    margin: 0 0 0 0rem;
  }

`
export default AccountPage