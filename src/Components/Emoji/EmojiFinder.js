import { Input, Spin,Image} from 'antd';
import React, { useState, useEffect } from 'react';
import "./emojifinder.css"
function FindEmoji(){
    const [emojis, setEmojis] = useState([]);
    const[loading,setloading] = useState(false)
   const [searchTerm, setSearchTerm] = useState('');
useEffect(() => {
  setloading(true)
    fetch('https://api.github.com/emojis')
      .then(response => response.json())
      .then(data =>
         setEmojis(Object.keys(data),
         setloading(false)));

  }, []);
  const filteredEmojis = emojis.filter(emoji => {
    return emoji.includes(searchTerm);
  });
return(
    <div className='main-container'>
      <Spin spinning={loading}>
        <Input
    placeholder="Search for an emoji"
     onChange={event => setSearchTerm(event.target.value)
     }
/>
<div style={{
  display:"flex",
  flexDirection:'row',
  justifyContent:'space-around',
  flexWrap:'wrap',
  alignContent:'center',
  alignItems:'center'

}}>
  <div className='middle'>
  {filteredEmojis.map((item)=>{
    return(
      <div className='main'>
           <Image src={`https://github.githubassets.com/images/icons/emoji/${item}.png`}/>
      </div>
    )
  })}
  </div>
    </div>
    </Spin>
    </div>
)
}
export default FindEmoji;