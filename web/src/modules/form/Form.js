import React, {useState, useEffect} from 'react'



function Form({ onSubmit }){
    const [github_username, setGithubUsername] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [changeButton, setChangeButton] = useState({class:'initial', text:'salvar'})

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
          (position) =>{
            const {latitude, longitude} = position.coords
            
            setLatitude(latitude)
            setLongitude(longitude)
    
          },
          (err)=>{
            console.log(err)
          },
          {
            timeout : 30000
          } 
        )
      }, [])

    async function handleSubmit(e){
        e.preventDefault()
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        })
        setGithubUsername('')
        setTechs('')
        setChangeButton({class:'initial', text:'salvar'})
    }

    return(
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_user" name="github_user" >Github username</label>
            <input id="github_user" required value={github_username} onChange={e => setGithubUsername(e.target.value)} />
          </div>
          
         <div className="input-block">
            <label htmlFor="techs" name="techs" >Tecnologias</label>
            <input id="techs" required value={techs} onChange={e => setTechs(e.target.value)} />
         </div>

          <div className="coords">
            
            <div className="input-block">
              <label htmlFor="latitude" name="latitude" >Latitude</label>
              <input type="number" id="latitude" required value={latitude} onChange={ e => setLatitude(e.target.value) } />
            </div>

            <div className="input-block">
              <label htmlFor="longitude" name="longitude" >Longitude</label>
              <input type="number" id="longitude" required value={longitude} onChange={ e => setLongitude(e.target.value) } />
            </div>

          </div>

          <div>
            <button className={changeButton.class} type="submit" onClick={()=>{ setChangeButton({class:'loading', text:'salvando...'}) } }>{changeButton.text}</button>
          </div>
        </form>
    )
}

export default Form