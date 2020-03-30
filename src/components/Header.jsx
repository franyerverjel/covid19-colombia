import React, { useState, useEffect } from 'react';
import moment from 'moment';

moment.locale('es');

const Header = () => {
  const [updateOn, setUpdateOn] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://api.github.com/repos/franyerverjel/covid19/commits';

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setUpdateOn(moment(data[0].commit.author.date).fromNow());
      });
  }, []);

  return (
    <header>
      <div className='container'>
        <div className='item'>COVID-19 en Colombia</div>
        <div className='item'>
          Última actualización: <strong>{updateOn}</strong>
        </div>
      </div>
    </header>
  );
};

export default Header;
