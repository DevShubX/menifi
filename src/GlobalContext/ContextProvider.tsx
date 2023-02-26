import { onAuthStateChanged } from 'firebase/auth';
import React,{Context, createContext,Dispatch,ReactNode,SetStateAction,useContext,useEffect,useState} from 'react'
import { auth } from '../Firebase/firebase';

interface type{
    openMenu : boolean,
    setOpenMenu : Dispatch<SetStateAction<boolean>>,
    currentUser : any,
    setCurrentUser : Dispatch<SetStateAction<object>>,
    isPlaying : boolean,
    setIsPlaying : Dispatch<SetStateAction<boolean>>,
    currentSongs : any,
    setCurrentSongs : Dispatch<SetStateAction<any>>,
    currentIndex:any,
    setCurrentIndex : Dispatch<SetStateAction<any>>,
    activeSong : any,
    setActiveSong: Dispatch<SetStateAction<object>>,
    isActive : boolean,
    setIsActive:Dispatch<SetStateAction<boolean>>,

}

export const StateContext = createContext<type>({} as any);

export const ContextProvider = ({children}:{children:ReactNode}) => {
    const [currentUser,setCurrentUser] = useState<any>({});
    const [openMenu,setOpenMenu] = useState<boolean>(false);
    const [isPlaying,setIsPlaying] = useState<boolean>(false);
    const [currentSongs,setCurrentSongs] = useState<any>([]);
    const [currentIndex,setCurrentIndex] = useState<any>(0);
    const [activeSong,setActiveSong] = useState<any>({});
    const [isActive,setIsActive] = useState<boolean>(false);
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
        });
        return()=>{
            unsub();
        }
    },[]);

    return(
        <StateContext.Provider value={{
        currentUser,
        setCurrentUser,
        openMenu,
        setOpenMenu,
        isPlaying,
        setIsPlaying,
        currentSongs,
        setCurrentSongs,
        currentIndex,
        setCurrentIndex,
        activeSong,
        setActiveSong,
        isActive,
        setIsActive,
        
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () =>useContext(StateContext);
