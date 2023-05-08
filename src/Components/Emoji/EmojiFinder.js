import { Input, Spin, Image, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import "./emojifinder.css"
function FindEmoji() {
  const [emojis, setEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setloading] = useState(false)
  const [showmore, setshowmore] = useState(100)
  useEffect(() => {
    setloading(true);
    fetch(`https://api.github.com/emojis`)
      .then(response => response.json())
      .then(data => {
        setEmojis(Object.keys(data))
        setloading(false);
      })
      .catch(error => 
        console.error(error));
  }, []);
  const handleloadmore = () => {
    setshowmore(prev => prev += 100);
  }
  const filteredEmojis = emojis.filter(emoji => {
    return emoji.includes(searchTerm);
  });
  const searchfilter = (event)=>{
setSearchTerm(event.target.value)
  }
  return (
    <div className='main-container'>
      <Spin spinning={loading}>
        <Input
          placeholder="Search for an emoji"
          onChange={searchfilter}
        />
        <div className='set-row'>
          <div className='middle'>
            {filteredEmojis.map((item, i) => {
              if (i <= showmore + 1) {
                return (
                  <div className='main'>
                    <Image src={`https://github.githubassets.com/images/icons/emoji/${item}.png`} />
                  </div>
                )
              }
            })} 
          </div>
        </div>
        <div className='loadmore-button'>
        <Button onClick={handleloadmore} type='primary'>LoadMore</Button>
        </div>
      </Spin>
    </div>
  )
}
export default FindEmoji;