import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MangaDexCover = ({mangaId}:{mangaId:any}) => {
    const [cover_art,setCoverart] = useState<any>("");
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        getMangaCover();
    }, [mangaId]);

    const getMangaCover = async () => {
        setLoading(true);
        let photo_cover = await axios.get(`https://api.consumet.org/manga/mangadex/info/${mangaId}`);
        setCoverart(photo_cover.data.image);
        setLoading(false)
    }
    return (
        <div>
            {cover_art !== "" || undefined || null ? (<img src={cover_art} alt="" />): (<img src='https://fomantic-ui.com/images/wireframe/square-image.png'/>)}
        </div>
    )
}

export default MangaDexCover