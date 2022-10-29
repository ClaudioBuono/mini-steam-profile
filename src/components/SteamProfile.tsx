import axios from "axios";
import { useEffect, useState } from "react";
import "../style/steamprofile.css"

const cheerio = require("cheerio")

function SteamProfile() 
{

    const [recentlyPlayedGames,setRecentlyPlayedGames] = useState([])
    const [userInfos,setUserInfos] = useState([])
    const [gameCount,setGameCount] = useState("")
    const [profileLevel,setProfileLevel] = useState("")
    const [profileBackgroundURL,setProfileBackgroundURL] = useState("")
    const [flip,setFlip] = useState(false)

    useEffect(() => {

        axios.all([
            axios.get('/getRecentlyPlayed'), 
            axios.get('/getUserInfos'),
            axios.get('/getUserPage'),
            axios.get('/getUserCountGames'),
            axios.get('/getUserLevel'),
          ])
          .then(axios.spread((obj1, obj2, obj3, obj4, obj5) => {

            setRecentlyPlayedGames(obj1["data"]["response"]["games"])
            setUserInfos(obj2["data"]["response"]["players"][0])
            getProfileBackground(obj3["data"])
            setGameCount(obj4["data"]["response"]["game_count"])
            setProfileLevel(obj5["data"]["response"]["player_level"])
            
          }));
           
      });

    function getProfileBackground(obj: any)
    {
        const $ = cheerio.load(obj)
        const backgroundImage = $(".no_header.profile_page.has_profile_background").attr('style')
        
        if(backgroundImage=="")
        {
            const backgroundImageAnimated = $("video").attr("poster")
            setProfileBackgroundURL(backgroundImageAnimated)
        }
        else
        {
            const backgroundURL = backgroundImage.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
            setProfileBackgroundURL(backgroundURL)
        }   
    }
      
    return (
        <div className="sp-mainContainer" style={{backgroundImage: `url(${profileBackgroundURL})` }}>
            <div className="sp-imageContainer">
                <img alt="avatar" src={userInfos["avatarfull"]}></img>
            </div>
            <div className="sp-secondaryContainer">
                <div className="sp-infoContainer">
                    <div className="sp-nameAndLevelContainer">
                        <p><a rel="noreferrer" href={userInfos["profileurl"]} target="_blank">{userInfos["personaname"]}</a></p>
                        <div className="sp-levelContainer">
                            <span className="label">Level</span>
                            <div className="sp-levelContainerInner">
                                <span>{profileLevel}</span>
                            </div>
                        </div>
                    </div>
                    <p className="sp-gamesCount"><span>Games </span>{gameCount}</p>
                </div>
                <div className="sp-recentlyPlayedContainer">
                    <p>Recently played</p>
                    <div className="sp-recentlyPlayedGames">
                    {
                        recentlyPlayedGames.slice(0,3).map((game,i)=>(
                            
                            <div key={i}>
                                <div className={`card ${flip ? "flip" : ""}`}>
                                    <div className="front" onClick={()=>setFlip(!flip)}>
                                        <img alt="i" src={`https://steamcdn-a.akamaihd.net/steam/apps/${game["appid"]}/header.jpg`}/>
                                    </div>
                                    <div className="back" onClick={()=>setFlip(!flip)}>
                                        <span className="hoursPlayed">{Math.round(game["playtime_forever"]/60*10)/10} hours</span>
                                    </div>
                                </div>
                                <p>{game["name"]}</p>
                            </div>                        
                            
                        ))
                    }
                    </div>
                </div> 
            </div>
        </div>
        
    );
}

export default SteamProfile;