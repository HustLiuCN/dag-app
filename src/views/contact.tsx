import React from 'react'

const ContactView = () => {
  const infos = [
    {
      icon: 'user',
      desc: '呆呆啊普',
    }, {
      icon: 'home',
      desc: 'stillbold.com',
      link: 'https://www.stillbold.com',
    }, {
      icon: 'github',
      desc: 'HustLiuCN',
      link: 'https://github.com/HustLiuCN',
    }, {
      icon: 'wechat',
      desc: 'lam2991',
    }, {
      icon: 'gmail',
      desc: 'liupeidong1027@gmail.com',
    },
  ]
  return (
    <div className="contact-box">
      <div className="info-list">
        {
          infos.map((info, i) => (
            <div className="info-item" key={ i }>
              <i className={ `iconfont icon-${info.icon}` }></i>
              {
                info.link ?
                (<a href={ info.link } className="info-item-span" target="_blank" rel="noopener noreferrer">{ info.desc }</a>)
                :
                (<span className="info-item-span">{ info.desc }</span>)
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ContactView
